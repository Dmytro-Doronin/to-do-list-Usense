import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { TextFieldComponent } from '../text-field/text-field.component'
import { SelectComponent } from '../select/select.component'
import { CheckOptions } from '../../mock-data/select-options/select-options'

@Component({
  selector: 'app-control',
  imports: [TextFieldComponent, SelectComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent {
  protected readonly CheckOptions = CheckOptions
  completeOptionSelected = signal<string>('All')

  selectedOptionSelected(id: string) {
    this.completeOptionSelected.set(id)
    console.log(id)
  }
}
