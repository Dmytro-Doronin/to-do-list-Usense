import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-text-area',
  imports: [ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
  id = input<string>('text')
  placeholder = input<string | null>('')
  isError = input<false | undefined | boolean>(false)
  @Input() control: FormControl = new FormControl('')
}
