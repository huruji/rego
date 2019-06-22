import diff from './diff'

function defer(fn) {
	return Promise.resolve().then(fn)
}


function flush(component) {
  component.prevState = Object.assign({}, component.state)
  if(component.shouldComponentUpdate(component.props, component._pendingStates)) {
    component.componentWillUpdate && component.componentWillUpdate(component.props ,component._pendingStates )

    Object.assign(component.state, component._pendingStates)

    diff(component.base, component.render())

    component.componentDidUpdate && component.componentDidUpdate(component.props, component.prevState)
  }
}

export default function queueRender(component) {
	defer(() => flush(component))
}
