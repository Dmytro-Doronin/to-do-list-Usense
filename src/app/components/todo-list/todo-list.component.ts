import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TodoComponent} from '../todo/todo.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {}
