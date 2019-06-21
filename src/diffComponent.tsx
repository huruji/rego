// 测试含有 key 的 component
import { createElement, Component } from '../lib5'

const Content = props => <li>{props.name}</li>

export default class App extends Component<any, any> {
	public state = {
		list: [1, 2, 3, 7, 4]
	}
	constructor(props) {
		super(props)
	}

	update() {
		const { list } = this.state
		this.setState({
			list: list.indexOf(4) > 2 ? [1, 4, 5, 3, 7, 6] : [1, 2, 3, 7, 4]
		})
	}
	render() {
		const { list } = this.state
		return (
			<div className="container">
				<h1> Update node with text </h1>
				<div className="optcontainer">
					<div className="opt" onClick={this.update.bind(this)}>
						update
					</div>
				</div>
			</div>
		)
	}
}
