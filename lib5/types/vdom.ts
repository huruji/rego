import { FunctionComponent, ClassComponent } from './component'

export type nodeType = 'node' | 'classComponent' | 'functionalComponent'
export type VdomType = FunctionComponent | string | {
    new (props: any): ClassComponent
  }
export interface VdomInterface {
	type: VdomType
	props: Record<string, string | Function>
  children: Vdom[]
  nodeType: nodeType,
  base?: Node
}

export type Vdom = VdomInterface | string
