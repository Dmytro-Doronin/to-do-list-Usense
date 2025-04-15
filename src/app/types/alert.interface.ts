export type AlertStatuses = 'error' | 'success'

export interface alertContent {
  message: string
  status: AlertStatuses
}
