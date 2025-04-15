import { inject, Injectable, signal } from '@angular/core'
import { Subscription } from 'rxjs'
import { EditableTodo, TodoTypeWithPriority } from '../../types/todo.types'
import { TodoApiService } from './todo-api.service'
import { HttpErrorResponse } from '@angular/common/http'
import { TodoStorageService } from './todo-storage.service'
import { AlertService } from './alert.service'
import { ModalService } from './modal.service'

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  todosApiService = inject(TodoApiService)
  todosLocalService = inject(TodoStorageService)
  alertService = inject(AlertService)
  modalService = inject(ModalService)

  loadAllTodosSubscription: Subscription | null = null
  addTodoSubscription: Subscription | null = null
  editTodoSubscription: Subscription | null = null
  deleteTodoSubscription: Subscription | null = null
  allTodos = signal<TodoTypeWithPriority[]>([])
  isLoadingAllTodos = signal<boolean>(false)
  isLoadingTodos = signal<boolean>(false)
  editLoadingTodos = signal<boolean>(false)

  loadAllTodos() {
    if (this.loadAllTodosSubscription) {
      this.loadAllTodosSubscription.unsubscribe()
    }

    this.isLoadingAllTodos.set(true)

    this.loadAllTodosSubscription = this.todosApiService.getTodos().subscribe({
      next: () => {
        const storedTodos = this.todosLocalService.load()
        if (storedTodos) {
          const todosWithPriority: TodoTypeWithPriority[] = storedTodos.map(todo => ({
            ...todo,
            priority: todo.priority ?? 'low',
            completed: todo.completed ?? false,
          }))
          this.todosLocalService.save(todosWithPriority)
          this.allTodos.set(todosWithPriority)
        }
      },

      error: (error: HttpErrorResponse) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        this.isLoadingAllTodos.set(false)
      },

      complete: () => {
        this.loadAllTodosSubscription = null
        this.isLoadingAllTodos.set(false)
      },
    })
  }

  addTodo(title: string) {
    if (!title.trim()) return
    if (this.addTodoSubscription) {
      this.addTodoSubscription.unsubscribe()
    }
    this.isLoadingTodos.set(true)

    this.addTodoSubscription = this.todosApiService.addTodos(title).subscribe({
      next: () => {
        const newTodo: TodoTypeWithPriority = {
          id: Date.now(),
          userId: 1,
          title,
          completed: false,
          priority: 'low',
        }

        this.allTodos.update(prev => {
          const updated = [newTodo, ...prev]
          this.todosLocalService.save(updated)
          return updated
        })

        this.alertService.onOpenAlert({ message: 'Todo was added', status: 'success' })
        this.modalService.closeModal()
      },

      error: (error: HttpErrorResponse) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        this.isLoadingTodos.set(false)
      },

      complete: () => {
        this.addTodoSubscription = null
        this.isLoadingTodos.set(false)
      },
    })
  }

  editTodo(data: EditableTodo) {
    if (this.editTodoSubscription) {
      this.editTodoSubscription.unsubscribe()
    }
    this.editLoadingTodos.set(true)

    this.editTodoSubscription = this.todosApiService.editTodos(data).subscribe({
      next: () => {
        this.allTodos.update(prev => {
          const updated = prev.map(todo => (todo.id === data.id ? { ...todo, ...data } : todo))
          this.todosLocalService.updateTodo(data)
          return updated
        })

        this.alertService.onOpenAlert({ message: 'Todo was updated', status: 'success' })
      },

      error: (error: HttpErrorResponse) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        this.editLoadingTodos.set(false)
      },

      complete: () => {
        this.addTodoSubscription = null
        this.editLoadingTodos.set(false)
      },
    })
  }

  deleteTodo(id: number) {
    if (this.deleteTodoSubscription) {
      this.deleteTodoSubscription.unsubscribe()
    }
    this.editLoadingTodos.set(true)

    this.editTodoSubscription = this.todosApiService.deleteTodos(id).subscribe({
      next: () => {
        this.allTodos.update(prev => {
          const updated = prev.filter(todo => todo.id !== id)
          this.todosLocalService.save(updated)
          return updated
        })

        this.alertService.onOpenAlert({ message: 'Todo was deleted', status: 'success' })
      },

      error: (error: HttpErrorResponse) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        this.editLoadingTodos.set(false)
      },

      complete: () => {
        this.addTodoSubscription = null
        this.editLoadingTodos.set(false)
      },
    })
  }
}
