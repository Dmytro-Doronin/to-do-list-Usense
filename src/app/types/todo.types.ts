export type PriorityType = 'low' | 'mid' | 'high'

export interface TodoType {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodoTypeWithPriority extends TodoType {
  priority: PriorityType
}
