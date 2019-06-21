import enqueueRender from './queueRender'


export default class Component<P,S> {
  static defaultProps
  public props:P
  public _pendingStates
  public base
  public state: Readonly<S>

  constructor(props) {
    this.props = props || Component.defaultProps ||  {}
  }

  setState(nextState) {
    // this.state = Object.assign({}, this.state, nextState);
    this._pendingStates = nextState
    enqueueRender(this)
  }

  public componentWillMount() {
    return undefined
  }

  public shouldComponentUpdate() {
    return true
  }


}