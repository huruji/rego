
import { Vdom, nodeType, VdomType } from './types/vdom'
import Component from './component'

export default function createElement(
	type: VdomType | Vdom,
	props: Record<string, string | Function>,
	...children: Vdom[]
): Vdom {
	let nodeType:nodeType = 'node'
	if (props === null) props = {}

	if (typeof type === 'object' && type.type) {
		return type
	}

	if (typeof type === 'function') {
		if (Component.isPrototypeOf(type)) {
			nodeType = 'classComponent'
		} else {
			nodeType = 'functionalComponent'
		}
	}


	return {
		type: type as VdomType,
		props,
		children: children.flat(Infinity),
		nodeType
	}
}
