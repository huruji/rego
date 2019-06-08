import render from './render'
import enqueueRender from './queueRender'


export default class Component<P,S> {
  public props
  public _pendingStates
  public base
  public state: Readonly<S>

  constructor(props) {
    this.props = props || {}
  }

  setState(nextState) {
    // this.state = Object.assign({}, this.state, nextState);
    this._pendingStates = nextState
    enqueueRender(this)
  }
}