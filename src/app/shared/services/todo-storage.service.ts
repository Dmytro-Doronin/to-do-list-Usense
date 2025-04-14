import { TodoTypeWithPriority } from '../../types/todo.types'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class TodoStorageService {
  private key = 'todos'

  save(todos: TodoTypeWithPriority[]) {
    localStorage.setItem(this.key, JSON.stringify(todos))
  }

  load(): TodoTypeWithPriority[] | null {
    const raw = localStorage.getItem(this.key)
    return raw ? JSON.parse(raw) : null
  }

  clear() {
    localStorage.removeItem(this.key)
  }
}
