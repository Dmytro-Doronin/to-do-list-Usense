import { Component, inject } from '@angular/core'
import { ControlComponent } from './components/control/control.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoStoreService } from './shared/services/todo-store.service'

@Component({
  selector: 'app-root',
  imports: [ControlComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todoStoreService = inject(TodoStoreService)
  readonly todos = this.todoStoreService.allTodos

  constructor() {
    this.todoStoreService.loadAllTodos()
  }
}
