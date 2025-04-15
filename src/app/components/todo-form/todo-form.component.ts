import { ChangeDetectionStrategy, Component, effect, input, output, Signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TextFieldComponent } from '../text-field/text-field.component'
import { ButtonComponent } from '../button/button.component'
import { LoaderComponent } from '../loader/loader.component'
import { TextAreaComponent } from '../text-area/text-area.component'

@Component({
  selector: 'app-todo-form',
  imports: [
    ReactiveFormsModule,
    TextFieldComponent,
    ButtonComponent,
    LoaderComponent,
    TextAreaComponent,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  isLoading = input<boolean>(false)
  formTitle = input<string>('Title')
  buttonTitle = input<string>('Submit')
  isEditMode = input<boolean>(false)
  initialValue = input<string | null>(null)
  formSubmitted = output<{ title: string }>()

  constructor() {
    effect(() => {
      const value = this.initialValue();
      if (value) {
        this.cartForm.patchValue({ title: value });
      }
    });
  }

  cartForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  })

  get title() {
    return this.cartForm.get('title')
  }

  isTitleInvalid() {
    return this.title?.invalid && (this.title?.dirty || this.title?.touched)
  }

  onSubmit() {
    if (this.cartForm.valid) {
      this.formSubmitted.emit({
        title: this.cartForm.value.title!,
      })
      this.cartForm.reset()
    }
  }
}
