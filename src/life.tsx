import { createElement, Component } from '../lib5'

class List extends Component<any, any> {
	componentWillReceiveProps(nextProps) {
		console.log(nextProps)
		console.log(this.props)
		console.log('componentWillReceiveProps')
	}
	componentWillUpdate(nextProps, nextState) {
		console.log(nextProps)
		console.log(this.props)
		console.log('componentWillUpdate')
	}
	render() {
		const { name } = this.props
		return <div>test {name}</div>
	}
}

export default class App extends Component<any, any> {
	public state = {
		name: 'huruji'
	}

	update() {
		this.setState({
			name: this.state.name + '1'
		})
	}
	componentWillMount() {
		console.log('componentWillMount')
	}
	componentDidMount() {
		console.log('componentDidMount')
	}

	componentWillUpdate(nextProps, nextState) {
		console.log(nextProps)
		console.log(nextState)
		console.log(this.props)
		console.log(this.state)
		console.log('APP: componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('componentDidUpdate')
	}
	render() {
		console.log('render')
		const { name } = this.state
		return (
			<div className="container">
				<div className="optcontainer">
					<div className="opt" onClick={this.update.bind(this)}>
						update state
					</div>
				</div>
				<p>{name}</p>
				<List name={name} />
			</div>
		)
	}
}
