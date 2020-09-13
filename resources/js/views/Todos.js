import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {addTodo, editTodo, refreshTodo, removeTodo} from "../store/TodosSlice";
import {refreshTodo} from "../store/TodosSlice";

function mapStateToProps(state) {
	return {todos: state.todos};
}

class Todos extends Component {
	constructor(props) {
		super(props);
		this.add = this.add.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			axios.get('/api/todos').then(res => {
				console.log(res)
				this.props.refreshTodo(res.data.list);
			}).catch(err => {
				console.error(err)
			})
		}, 1000)
	}

	render() {

		return (
			<div className="max-w-lg mx-auto pt-8">
				<div className="bg-gray-100 rounded p-8">

					<ul className="bg-gray-200 p-4 rounded">
						{this.props.todos.map((todo, key) => {
							return <li key={key} className="mb-2 bg-white rounded p-2">{todo}</li>
						})}
					</ul>

					<div className="p-4 w-full">
						<div className="mb-4">
							<label className="block text-sm mb-1" htmlFor="email">Add Todo Item</label>
							<input id="addTodo" onKeyPress={this.add} className="block py-2 px-4 w-full border rounded focus:outline-none focus:shadow-outline" type="text"/>
						</div>
					</div>

				</div>
			</div>
		);
	}

	add(e) {
		if (e.key !== 'Enter') return;
		axios.post('/api/todos', {
			text: document.getElementById('addTodo').value
		})
			.then(res => {
				console.log(res)
				axios.get('/api/todos').then(res => {
					console.log(res)
					this.props.refreshTodo(res.data.list);
				}).catch(err => {
					console.error(err)
				})
			})
			.catch(err => {
				console.error(err)
			})
	}
}

export default connect(
	mapStateToProps, {
		refreshTodo
		// addTodo, removeTodo, editTodo, refreshTodo
	}
)(Todos);
