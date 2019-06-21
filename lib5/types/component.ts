import { Vdom } from './vdom'

export interface ClassComponent {
	props?: Record<string, any>
	render(): Vdom
	base: Vdom
	componentWillMount: Function
	componentDidMount: Function
	componentWillReceiveProps: Function
	shouldComponentUpdate: (nextProps?: Record<string, any>, nextState?:Record<string, any>) => boolean
	componentWillUpdate: Function
	componentDidUpdate: Function
	componentWillUnmount: Function
	state?: Record<string, any>
}

export type FunctionComponent = (props:any) => Vdom


