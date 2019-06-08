import { createElement } from '../lib4/index'

const List = <div>List</div>
const content = (
	<div className="list" style={{ color: 'red' }} onClick={() => console.log('click')}>
		<p key="123" style={{ color: 'black' }}>
			name
		</p>
		huruji
		<List />
	</div>
)

export default content
