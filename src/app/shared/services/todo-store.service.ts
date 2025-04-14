import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  loadAllCategoriesSubscription: Subscription | null = null
}
