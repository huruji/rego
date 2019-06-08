import { VdomInterface } from './vdom'

export interface keyChanges {
  type: 'insert' | 'remove' | 'move',
  item: VdomInterface,
  afterNode?: VdomInterface,
  index: number
}