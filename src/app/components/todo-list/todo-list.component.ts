import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { TodoComponent } from '../todo/todo.component'
import { TodoTypeWithPriority } from '../../types/todo.types'
import { LoaderComponent } from '../loader/loader.component'

@Component({
  selector: 'app-todo-list',
  imports: [TodoComponent, LoaderComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  todos = input<TodoTypeWithPriority[]>()
  todosLoading = input<boolean>(false)
}
