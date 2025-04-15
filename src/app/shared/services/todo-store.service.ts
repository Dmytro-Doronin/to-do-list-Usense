import { inject, Injectable, signal } from '@angular/core'
import { Subscription } from 'rxjs'
import { TodoTypeWithPriority } from '../../types/todo.types'
import { TodoApiService } from './todo-api.service'
import { HttpErrorResponse } from '@angular/common/http'
import { TodoStorageService } from './todo-storage.service'

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  todosApiService = inject(TodoApiService)
  todosLocalService = inject(TodoStorageService)

  loadAllTodosSubscription: Subscription | null = null
  addTodoSubscription: Subscription | null = null
  allTodos = signal<TodoTypeWithPriority[]>([])
  isLoadingAllTodos = signal<boolean>(false)
  isLoadingTodos = signal<boolean>(false)

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
            priority: 'low',
          }))
          this.todosLocalService.save(todosWithPriority)
          this.allTodos.set(todosWithPriority)
        }

        // const todosWithPriority: TodoTypeWithPriority[] = todos.map(todo => ({
        //   ...todo,
        //   priority: 'low',
        // }))
        // this.todosLocalService.save(todosWithPriority)
        // this.allTodos.set(todosWithPriority)
      },

      error: (error: HttpErrorResponse) => {
        console.log(error)
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
      },

      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.isLoadingTodos.set(false)
      },

      complete: () => {
        this.addTodoSubscription = null
        this.isLoadingTodos.set(false)
      },
    })
  }
}
