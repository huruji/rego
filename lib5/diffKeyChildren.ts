import { VdomInterface } from './types/vdom'
import { keyChanges } from './types/keyChanges'

export default function diffChildren(oldVdom: VdomInterface[], newVdom: VdomInterface[]):keyChanges[] {
	const changes = []
	let lastIndex = 0
	let lastPlacedNode = null
	const oldVdomKey = oldVdom.map(v => v.props.key)
	const newVdomKey = newVdom.map(v => v.props.key)

	newVdom.forEach((item, i) => {
		const index = oldVdomKey.indexOf(item.props.key)
		if (index === -1) {
			changes.push({
				type: 'insert',
				item: item,
				afterNode: lastPlacedNode
			})
			lastPlacedNode = item
		} else {
			if (index < lastIndex) {
				changes.push({
					type: 'move',
					item: oldVdom[index],
					afterNode: lastPlacedNode
				})
			}
			lastIndex = Math.max(index, lastIndex)
			lastPlacedNode = oldVdom[index]
		}
	})

	oldVdom.forEach((item, i) => {
		if (newVdomKey.indexOf(item.props.key) === -1) {
			changes.push({
				type: 'remove',
				index: i,
				item
			})
		}
	})

	return changes
}
