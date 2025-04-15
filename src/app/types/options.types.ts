import { FinishedSortedTypeType, PriorityFilterType } from './todo.types'

export interface OptionsFinishedType {
  id: string
  name: FinishedSortedTypeType
}

export interface OptionsPriorityType {
  id: string
  name: PriorityFilterType
}

export type optionsType = OptionsFinishedType | OptionsPriorityType
