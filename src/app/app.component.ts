import { Component, inject, TemplateRef } from '@angular/core'
import { ControlComponent } from './components/control/control.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoStoreService } from './shared/services/todo-store.service'
import { ButtonComponent } from './components/button/button.component'
import { PlusComponent } from './components/icons/plus/plus.component'
import { ModalService } from './shared/services/modal.service'
import { ModalComponent } from './components/modal/modal.component'

@Component({
  selector: 'app-root',
  imports: [ControlComponent, TodoListComponent, ButtonComponent, PlusComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todoStoreService = inject(TodoStoreService)
  readonly todos = this.todoStoreService.allTodos
  private readonly modalService = inject(ModalService)

  constructor() {
    this.todoStoreService.loadAllTodos()
  }

  openModal(template: TemplateRef<{ $implicit: null }>) {
    if (this.modalService.getModalOptions()) {
      this.modalService.closeModal()
    } else {
      this.modalService.openModal({
        template,
        context: { $implicit: null },
      })
    }
  }
}
