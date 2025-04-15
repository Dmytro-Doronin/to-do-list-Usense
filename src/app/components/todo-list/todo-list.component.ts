import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { TodoComponent } from '../todo/todo.component'
import { EditableTodo, TodoTypeWithPriority } from '../../types/todo.types'
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
  editTodoFromList = output<EditableTodo>()
  deleteTodoFromList = output<number>()


  editTodo (data: EditableTodo) {
    this.editTodoFromList.emit({...data})
  }

  deleteTodo(id: number) {
    this.deleteTodoFromList.emit(id)
  }
}
