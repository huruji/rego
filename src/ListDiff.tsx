import { createElement, Component } from '../lib5'

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
				<h1> list diff</h1>
				<div className="optcontainer">
					<div className="opt" onClick={this.update.bind(this)}>
						update
					</div>
				</div>
				<ul>{list.map(l => <li key={l}>{l}</li>)}</ul>
			</div>
		)
	}
}
