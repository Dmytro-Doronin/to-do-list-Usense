import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CheckboxComponent } from '../checkbox/checkbox.component'
import { ButtonComponent } from '../button/button.component'
import { TodoTypeWithPriority } from '../../types/todo.types'
import { EditComponent } from '../icons/edit/edit.component'
import { TrashComponent } from '../icons/trash/trash.component'

@Component({
  selector: 'app-todo',
  imports: [CheckboxComponent, ButtonComponent, EditComponent, TrashComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input<TodoTypeWithPriority>()
}
