import { ClassComponent } from './component'
import { VdomInterface } from './vdom'

export type Dom = (Node | HTMLElement) & {
	_component?: ClassComponent | VdomInterface
}
