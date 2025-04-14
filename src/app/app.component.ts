import { Component } from '@angular/core'
import { ControlComponent } from './components/control/control.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'

@Component({
  selector: 'app-root',
  imports: [ControlComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-app'
}
