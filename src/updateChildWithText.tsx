// 测试将 node 替换 为string
import { createElement, Component } from '../lib5'

class A extends Component<any, any> {
	render() {
		return <div>CA</div>
	}
}

export default class App extends Component<any, any> {
	public state = {
		type: 'node'
	}
	constructor(props) {
		super(props)
	}

	update() {
		console.log('update')
		const { type } = this.state
		this.setState({
			type: type === 'node' ? 'string' : 'node'
		})
	}

	render() {
		const { type } = this.state
		console.log(type)
		return (
			<div className="container">
				<h1> Update node with text </h1>
				<div className="optcontainer">
					<div className="opt" onClick={this.update.bind(this)}>
						update
					</div>
				</div>
				{type === 'node' ? <A /> : 'string'}
			</div>
		)
	}
}
