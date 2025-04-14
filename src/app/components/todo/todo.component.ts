import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CheckboxComponent} from '../checkbox/checkbox.component';

@Component({
  selector: 'app-todo',
  imports: [CheckboxComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {}
