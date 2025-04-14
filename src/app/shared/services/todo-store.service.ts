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
  allTodos = signal<TodoTypeWithPriority[] | null>(null)
  isLoadingTodos = signal<boolean>(false)

  loadAllTodos() {
    if (this.loadAllTodosSubscription) {
      this.loadAllTodosSubscription.unsubscribe()
    }

    this.isLoadingTodos.set(true)

    this.loadAllTodosSubscription = this.todosApiService.getTodos().subscribe({
      next: todos => {
        const todosWithPriority: TodoTypeWithPriority[] = todos.map(todo => ({
          ...todo,
          priority: 'low',
        }))

        this.allTodos.set(todosWithPriority)
      },

      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.isLoadingTodos.set(false)
      },

      complete: () => {
        this.loadAllTodosSubscription = null
        this.isLoadingTodos.set(false)
      },
    })
  }
}
