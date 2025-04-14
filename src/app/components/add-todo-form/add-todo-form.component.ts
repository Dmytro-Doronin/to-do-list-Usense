import { ChangeDetectionStrategy, Component, output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TextFieldComponent } from '../text-field/text-field.component'
import { ButtonComponent } from '../button/button.component'

@Component({
  selector: 'app-add-todo-form',
  imports: [ReactiveFormsModule, TextFieldComponent, ButtonComponent],
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoFormComponent {
  formSubmitted = output<{ title: string }>()

  cartForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
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
