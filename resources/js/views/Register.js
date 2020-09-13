import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loggedIn, loggedOut} from "../store/AuthSlice";
import {withRouter} from "react-router";

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {}
		this.register = this.register.bind(this);
		this.name = React.createRef();
		this.email = React.createRef();
		this.password = React.createRef();
		this.password_confirm = React.createRef();
	}

	render() {
		return (
			<div className="max-w-lg mx-auto pt-8">
				<div className="bg-gray-100 rounded p-8">
					<h1 className="text-xl text-center mb-4">Register</h1>
					<form onSubmit={this.register}>
						<div className="mb-4">
							<label className="block text-sm mb-1" htmlFor="name">Name</label>
							<input ref={this.name} className="block py-2 px-4 w-full border rounded focus:outline-none focus:shadow-outline" type="text" id="name"/>
						</div>
						<div className="mb-4">
							<label className="block text-sm mb-1" htmlFor="email">Email</label>
							<input ref={this.email} className="block py-2 px-4 w-full border rounded focus:outline-none focus:shadow-outline" type="text" id="email"/>
						</div>
						<div className="mb-4">
							<label className="block text-sm mb-1" htmlFor="password">Password</label>
							<input ref={this.password} className="block py-2 px-4 w-full border rounded focus:outline-none focus:shadow-outline" type="password" id="password"/>
						</div>
						<div className="mb-4">
							<label className="block text-sm mb-1" htmlFor="password_confirm">Confirm Password</label>
							<input ref={this.password_confirm} className="block py-2 px-4 w-full border rounded focus:outline-none focus:shadow-outline" type="password" id="password_confirm"/>
						</div>
						<div className="mb-4">
							<button type="submit" className="bg-indigo-700 text-white rounded py-2 px-4">Register</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	register(e) {
		e.preventDefault();
		const that = this;
		axios.post('/api/register', {
			name: this.name.current.value,
			email: this.email.current.value,
			password: this.password.current.value,
			password_confirm: this.password_confirm.current.value,
		}).then(res => {
			console.log(res)
			if (res.data.token) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
				window.localStorage.setItem('token', res.data.token);
				that.props.loggedIn()
				that.props.history.push('/todos')
			}
		}).catch(err => {
			console.error(err)
		})
	}
}


export default withRouter(connect(
	mapStateToProps,
	{
		loggedIn,
		loggedOut
	}
)(Register));
