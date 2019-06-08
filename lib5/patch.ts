import render from './render'
import { keyChanges } from './types/keyChanges'
import { Dom } from './types/dom'
import { VdomInterface, Vdom } from './types/vdom'

export default function patch(changes: keyChanges[], dom: Dom):void {
	changes.forEach(change => {
		switch (change.type) {
			case 'insert': {
				const node = change.afterNode.base
				const parent = node.parentNode as Node
				const child = render(change.item, parent)
				parent.insertBefore(child, node.nextSibling)
			}
				break;
			case 'remove':{
				const removedNode = change.item.base as Node
				removedNode.parentNode.removeChild(removedNode)
			}
				break;
			case 'move': {
				const node = change.item.base
				const afterNode = change.afterNode.base as Node
				node.parentNode.insertBefore(node,afterNode.nextSibling)
			}
			break;
			default:
		}
	})

	const vchildren = Array.from(dom.childNodes).map((e: Dom):Vdom => e._component as VdomInterface)
	const _component: VdomInterface = dom._component as VdomInterface
	_component.children = vchildren
}
