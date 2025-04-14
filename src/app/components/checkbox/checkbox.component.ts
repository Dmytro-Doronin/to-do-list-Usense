import { ChangeDetectionStrategy, Component, computed, Input, signal } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-checkbox',
  imports: [NgClass],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input({ required: true }) label!: string
  @Input() initialValue = false

  checked = signal(this.initialValue)

  toggle() {
    this.checked.update(value => !value)
  }
  isChecked = computed(() => this.checked())
}
