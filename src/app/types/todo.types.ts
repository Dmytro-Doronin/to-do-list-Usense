export type PriorityType = 'low' | 'mid' | 'high'
export type FinishedSortedTypeType = 'All' | 'Complete' | 'Incomplete'
export type PriorityFilterType = 'Low' | 'Mid' | 'High' | 'All'

export interface TodoType {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodoTypeWithPriority extends TodoType {
  priority: PriorityType
}

export type EditableTodo = Partial<Omit<TodoTypeWithPriority, 'id'>> & Pick<TodoType, 'id'>
export type EditableTodoWithoutId = Partial<Omit<TodoTypeWithPriority, 'id'>>
