import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { EditableTodo, TodoType } from '../../types/todo.types'

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  httpClient = inject(HttpClient)

  getTodos(): Observable<TodoType[]> {
    return this.httpClient.get<TodoType[]>(`/todos`)
  }

  addTodos(title: string) {
    return this.httpClient.post(`/todos`, { title })
  }

  editTodos(todo: EditableTodo) {
    return this.httpClient.post(`/todos`, { todo })
  }

  deleteTodos(id: number) {
    return this.httpClient.delete(`/todos/${id}`)
  }
}
