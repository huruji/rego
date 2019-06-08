import render from './render';
import diff from './diff'

function defer(fn) {
	return Promise.resolve().then(fn)
}

const stateQueue = []
const renderQueue = []

function flush(component) {
  component.prevState = Object.assign({}, component.state)
  Object.assign(component.state, component._pendingStates)
  diff(component.base, component.render())
}

export default function queueRender(component) {
	defer(flush(component))
}
