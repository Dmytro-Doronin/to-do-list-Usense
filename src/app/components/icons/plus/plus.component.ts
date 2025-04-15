import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-plus',
  imports: [],
  templateUrl: './plus.component.html',
  styleUrl: './plus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlusComponent {}
