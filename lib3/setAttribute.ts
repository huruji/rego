export default function setAttribute(node: HTMLElement & { __key?: any }, key: string, value: string | {} | Function) {
	if (key === 'className') {
		node['className'] = value as string
	} else if (key.startsWith('on') && typeof value === 'function') {
		node.addEventListener(key.slice(2).toLowerCase(), value as () => {})
	} else if (key === 'style') {
		if (typeof value === 'object') {
			for (const [key, val] of Object.entries(value)) {
				node.style[key] = val
			}
		}
	} else if (key === 'key') {
		node.__key = value
	} else {
		node.setAttribute(key, value as string)
	}
}
