import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<'transparent' | 'low' | 'mid' | 'high'>()

  buttonClassMap = computed(() => ({
    'button--transparent': this.variant() === 'transparent',
    'button--low-priority': this.variant() === 'low',
    'button--mid-priority': this.variant() === 'mid',
    'button--high-priority': this.variant() === 'high',
  }))
}
