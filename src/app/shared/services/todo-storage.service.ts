import { EditableTodo, TodoTypeWithPriority } from '../../types/todo.types'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class TodoStorageService {
  private key = 'todos'

  save(todos: TodoTypeWithPriority[]) {
    localStorage.setItem(this.key, JSON.stringify(todos))
  }

  updateTodo(updated: EditableTodo) {
    const todos = this.load() ?? []

    const newTodos = todos.map(todo =>
      todo.id === updated.id ? { ...todo, ...updated } : todo
    )

    this.save(newTodos)
  }

  load(): TodoTypeWithPriority[] | null {
    const raw = localStorage.getItem(this.key)
    return raw ? JSON.parse(raw) : null
  }

  clear() {
    localStorage.removeItem(this.key)
  }
}
