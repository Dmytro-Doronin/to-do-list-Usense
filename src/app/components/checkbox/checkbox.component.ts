import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-checkbox',
  imports: [NgClass],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  initialValue = input<boolean>()
  label = input<string>('title')
  isCheckboxChecked = output<{ completed: boolean }>()
  isChecked = computed(() => this.checked())
  checked = signal(this.initialValue())

  constructor() {
    effect(() => {
      this.checked.set(this.initialValue())
    })
  }

  toggle() {
    const newValue = !this.checked()
    this.checked.set(newValue)
    this.isCheckboxChecked.emit({ completed: newValue })
  }
}
