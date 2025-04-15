import { Component, inject, Signal, TemplateRef } from '@angular/core'
import { ControlComponent } from './components/control/control.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoStoreService } from './shared/services/todo-store.service'
import { ButtonComponent } from './components/button/button.component'
import { PlusComponent } from './components/icons/plus/plus.component'
import { ModalService } from './shared/services/modal.service'
import { ModalComponent } from './components/modal/modal.component'
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component'
import { AlertComponent } from './components/alert/alert.component'

@Component({
  selector: 'app-root',
  imports: [
    ControlComponent,
    TodoListComponent,
    ButtonComponent,
    PlusComponent,
    ModalComponent,
    AddTodoFormComponent,
    AlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todoStoreService = inject(TodoStoreService)
  readonly todos = this.todoStoreService.allTodos
  readonly todoLoading = this.todoStoreService.isLoadingTodos
  readonly allTodosLoading = this.todoStoreService.isLoadingAllTodos
  private readonly modalService = inject(ModalService)

  constructor() {
    this.todoStoreService.loadAllTodos()
  }

  onAddTodo(data: { title: string }) {
    this.todoStoreService.addTodo(data.title)
  }

  openModal(template: TemplateRef<{ $implicit: Signal<boolean> }>) {
    if (this.modalService.getModalOptions()) {
      this.modalService.closeModal()
    } else {
      this.modalService.openModal({
        template,
        context: { $implicit: this.todoLoading },
      })
    }
  }
}
