import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core'
import { CheckboxComponent } from '../checkbox/checkbox.component'
import { ButtonComponent } from '../button/button.component'
import { EditableTodo, EditableTodoWithoutId, TodoTypeWithPriority } from '../../types/todo.types'
import { EditComponent } from '../icons/edit/edit.component'
import { TrashComponent } from '../icons/trash/trash.component'
import { TodoFormComponent } from '../todo-form/todo-form.component'

@Component({
  selector: 'app-todo',
  imports: [CheckboxComponent, ButtonComponent, EditComponent, TrashComponent, TodoFormComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input<TodoTypeWithPriority>()
  isEditTodo = signal<boolean>(false)
  editTodo = output<EditableTodo>()
  deleteTodo = output<number>()

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target)
    if (!clickedInside) {
      this.isEditTodo.set(false)
    }
  }

  onEditTodoMode() {
    this.isEditTodo.update(v => !v)
  }

  onEditTodo(data: EditableTodoWithoutId) {
    this.editTodo.emit({ id: this.todo()!.id, ...data })
    this.isEditTodo.set(false)
  }

  onDeleteTodo() {
    this.deleteTodo.emit(this.todo()!.id)
  }
}
