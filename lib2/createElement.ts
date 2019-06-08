import { ComponentType, ClassComponentType } from './component'

export type FunctionComponent = (props:any) => VdomType

export interface VdomInterface {
	type: FunctionComponent | string  | {
		new(props:any): ClassComponentType
	}
	props: Record<string, string | Function>
	children: VdomType[]
}

export type VdomType = VdomInterface | string

export default function createElement(
	type: string | VdomType,
	props: Record<string, string | Function>,
	...children: VdomType[]
): VdomType {
	if (props === null) props = {}
	if (typeof type === 'object' && type.type) {
		return type
	}
	return {
		type: type as string,
		props,
		children,
	}
}
