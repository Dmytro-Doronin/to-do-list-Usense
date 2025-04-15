import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core'
import { TextFieldComponent } from '../text-field/text-field.component'
import { SelectComponent } from '../select/select.component'
import { CheckOptions, PriorityOptions } from '../../mock-data/select-options/select-options'
import { SearchComponent } from '../icons/search/search.component'
import { FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FinishedSortedTypeType, PriorityFilterType } from '../../types/todo.types'

@Component({
  selector: 'app-control',
  imports: [TextFieldComponent, SelectComponent, SearchComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent {
  protected readonly CheckOptions = CheckOptions
  protected readonly PriorityOptions = PriorityOptions

  completeFinishedSelect = signal<FinishedSortedTypeType>('All')
  completePrioritySelect = signal<PriorityFilterType>('All')
  searchTerm = output<string>()
  finishedSelect = output<FinishedSortedTypeType>()
  prioritySelect = output<PriorityFilterType>()

  searchControl = new FormControl('')

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(value => {
        this.searchTerm.emit(value?.trim() ?? '')
      })
  }

  selectedFinishedSelect(title: string) {
    this.completeFinishedSelect.set(title as FinishedSortedTypeType)
    this.finishedSelect.emit(title as FinishedSortedTypeType)
  }

  selectedPrioritySelect(title: string) {
    this.completePrioritySelect.set(title as PriorityFilterType)
    this.prioritySelect.emit(title as PriorityFilterType)
  }
}
