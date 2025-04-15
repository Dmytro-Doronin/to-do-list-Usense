import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core'
import { TextFieldComponent } from '../text-field/text-field.component'
import { SelectComponent } from '../select/select.component'
import { CheckOptions, PriorityOptions } from '../../mock-data/select-options/select-options'
import { SearchComponent } from '../icons/search/search.component'
import { FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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

  completeOptionSelected = signal<string>('All')
  searchTerm = output<string>()

  searchControl = new FormControl('')

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(value => {
        this.searchTerm.emit(value?.trim() ?? '')
      })
  }

  selectedOptionSelected(id: string) {
    this.completeOptionSelected.set(id)
    console.log(id)
  }
}
