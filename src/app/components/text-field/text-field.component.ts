import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-text-field',
  imports: [ReactiveFormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent {
  type = input<string>('text')
  id = input<string>('text')
  placeholder = input<string | null>('')
  isError = input<false | undefined | boolean>(false)
  @Input() control: FormControl = new FormControl('')
}
