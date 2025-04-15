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

export type EditableTodo = Partial<Omit<TodoTypeWithPriority, 'id'>> & Pick<TodoType, 'id'>;
export type EditableTodoWithoutId = Partial<Omit<TodoTypeWithPriority, 'id'>>;

