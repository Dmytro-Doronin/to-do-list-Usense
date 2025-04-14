import { Component } from '@angular/core'
import { ControlComponent } from './components/control/control.component'

@Component({
  selector: 'app-root',
  imports: [ControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-app'
}
