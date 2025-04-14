import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CheckboxComponent } from '../checkbox/checkbox.component'
import { ButtonComponent } from '../button/button.component'
import { TodoTypeWithPriority } from '../../types/todo.types'

@Component({
  selector: 'app-todo',
  imports: [CheckboxComponent, ButtonComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input<TodoTypeWithPriority>()
}
