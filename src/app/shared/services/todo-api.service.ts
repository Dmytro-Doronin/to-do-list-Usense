import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TodoType } from '../../types/todo.types'

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  httpClient = inject(HttpClient)

  getTodos(): Observable<TodoType[]> {
    return this.httpClient.get<TodoType[]>(`/todos`)
  }
}
