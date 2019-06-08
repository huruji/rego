import { createElement, Component } from '../lib5'

class ContentA extends Component<any, any> {
	constructor(props) {
		super(props)
	}

	render() {
		const { name } = this.props
		return (
			<div>
				<p>{name}</p>
				<p>ContentA</p>
			</div>
		)
	}
}

const ContentB = function(props) {
	return (
		<div>
			<p>{name}</p>
			<p>ContentB</p>
		</div>
	)
}

class App extends Component<any, any> {
	public state = { name: 'app', list: [], nodeType: 'div', className: 'name', componentType: 'A' }

	constructor(props) {
		super(props)
	}

	update() {
		this.setState({
			name: this.state.name + '1'
		})
	}

	add() {
		const { list } = this.state
		// for (let i = 0; i < 1000; i++) {
		list.push((Math.random() + '').slice(2, 8))
		// }
		this.setState({
			list: [].concat(list)
		})
	}

	sort() {
		const { list } = this.state
		list.sort((a, b) => a - b)
		this.setState({
			list: [].concat(list)
		})
	}
	delete() {
		const { list } = this.state
		list.pop()
		this.setState({
			list: [].concat(list)
		})
	}
	changeType() {
		const { nodeType } = this.state
		this.setState({
			nodeType: nodeType === 'div' ? 'p' : 'div'
		})
	}
	changeProps() {
		const { className } = this.state
		this.setState({
			className: className + 'a'
		})
	}
	changeComponentType() {
		const { componentType } = this.state

		this.setState({
			componentType: componentType === 'A' ? 'B' : 'A'
		})
	}

	render() {
		const { name, list, nodeType, className, componentType } = this.state
		return (
			<div className="container">
				<div className="optcontainer">
					<div className="opt" onClick={this.update.bind(this)}>
						update text
					</div>
					<div className="opt" onClick={this.add.bind(this)}>
						add
					</div>
					<div className="opt" onClick={this.delete.bind(this)}>
						delete
					</div>
					<div className="opt" onClick={this.sort.bind(this)}>
						sort
					</div>
				</div>
				<div className="optcontainer">
					<div className="opt" onClick={this.changeType.bind(this)}>
						changeNodeType
					</div>
					<div className="opt" onClick={this.changeProps.bind(this)}>
						changeNodeProps
					</div>
				</div>
				<div className="optcontainer">
					<div className="opt" onClick={this.changeComponentType.bind(this)}>
						changeComponentType
					</div>
				</div>
				{nodeType === 'div' ? (
					<div className={className}>{name + 'div'}</div>
				) : (
					<p className={className}>{name + 'p'}</p>
				)}

				{componentType === 'A' ? <ContentA /> : <ContentB />}
				<ul>{list.map(l => <li key={l}>{l}</li>)}</ul>
			</div>
		)
	}
}

export default App
