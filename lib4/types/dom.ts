import { ClassComponent } from './component'

export type Dom = Node & {
	_component?: ClassComponent
}
