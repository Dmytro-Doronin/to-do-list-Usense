import { Component, computed, inject, signal, Signal, TemplateRef } from '@angular/core'
import { ControlComponent } from './components/control/control.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoStoreService } from './shared/services/todo-store.service'
import { ButtonComponent } from './components/button/button.component'
import { PlusComponent } from './components/icons/plus/plus.component'
import { ModalService } from './shared/services/modal.service'
import { ModalComponent } from './components/modal/modal.component'
import { TodoFormComponent } from './components/todo-form/todo-form.component'
import { AlertComponent } from './components/alert/alert.component'
import {
  EditableTodo,
  FinishedSortedTypeType,
  PriorityFilterType,
  PriorityType,
  TodoTypeWithPriority,
} from './types/todo.types'
import { AppLoaderComponent } from './components/app-loader/app-loader.component'

@Component({
  selector: 'app-root',
  imports: [
    ControlComponent,
    TodoListComponent,
    ButtonComponent,
    PlusComponent,
    ModalComponent,
    TodoFormComponent,
    AlertComponent,
    AppLoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly todoStoreService = inject(TodoStoreService)
  private readonly modalService = inject(ModalService)
  readonly todos = this.todoStoreService.allTodos
  readonly todoLoading = this.todoStoreService.isLoadingTodos
  readonly allTodosLoading = this.todoStoreService.isLoadingAllTodos
  readonly todoEditLoading = this.todoStoreService.editLoadingTodos
  searchTerm = signal<string>('')
  finishedSorted = signal<FinishedSortedTypeType>('All')
  prioritySorted = signal<PriorityFilterType>('All')

  readonly filteredTodos = computed(() => {
    const keyword = this.searchTerm().toLowerCase().trim()
    const finished = this.finishedSorted()
    const priority = this.prioritySorted()
    const all = this.todos()

    const matchesFinished = (todo: TodoTypeWithPriority) =>
      finished === 'All' ||
      (finished === 'Complete' && todo.completed) ||
      (finished === 'Incomplete' && !todo.completed)

    const matchesPriority = (todo: TodoTypeWithPriority) =>
      priority === 'All' || todo.priority.toLowerCase() === priority.toLowerCase()

    const matchesKeyword = (todo: TodoTypeWithPriority) =>
      todo.title.toLowerCase().includes(keyword)

    return all.filter(
      todo => matchesKeyword(todo) && matchesFinished(todo) && matchesPriority(todo)
    )
  })

  constructor() {
    this.todoStoreService.loadAllTodos()
  }

  onAddTodo(data: { title: string }) {
    this.todoStoreService.addTodo(data.title)
  }

  onEditTodo(data: EditableTodo) {
    this.todoStoreService.editTodo(data)
  }

  deleteTodo(id: number) {
    this.todoStoreService.deleteTodo(id)
  }

  onSearchTitle(title: string) {
    this.searchTerm.set(title)
  }

  onSetFinishedValue(title: FinishedSortedTypeType) {
    this.finishedSorted.set(title)
  }

  onSetPriorityValue(title: PriorityFilterType) {
    this.prioritySorted.set(title)
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
