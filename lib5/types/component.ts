import { Vdom } from './vdom'

export interface ClassComponent {
	props?: Record<string, any>
	render(): Vdom
	base: Vdom
}

export type FunctionComponent = (props:any) => Vdom


