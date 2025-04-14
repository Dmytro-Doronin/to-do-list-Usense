import { Component, computed, ElementRef, HostListener, Input, output, signal } from '@angular/core'
import { OptionsType } from '../../types/options.types'
import { ArrowDownComponent } from '../icons/arrow-down/arrow-down.component'
import { ArrowUpComponent } from '../icons/arrow-up/arrow-up.component'

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [ArrowDownComponent, ArrowUpComponent],
})
export class SelectComponent {
  @Input() options: OptionsType[] = []

  private selectedName = signal<string>('All')
  private isOpen = signal<boolean>(false)
  selectedChange = output<string>()

  isDropdownOpen = computed(() => this.isOpen())
  selectedLabel = computed(() => this.selectedName())

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target)
    if (!clickedInside) {
      this.isOpen.set(false)
    }
  }

  toggleDropdown() {
    this.isOpen.update(v => !v)
  }

  select(name: string) {
    this.selectedName.set(name)
    this.selectedChange.emit(name)
  }

  onKeyDown(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.select(value)
    }
  }
  onKeyDownSelect(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.toggleDropdown()
    }
  }
}
