import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loggedIn, loggedOut} from "../store/AuthSlice";
import {withRouter} from "react-router";

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {}
		this.login = this.login.bind(this);
		this.email = React.createRef();
		this.password = React.createRef();
	}

	render() {
		return (
			<div className="max-w-lg mx-auto pt-8">
				<div className="bg-gray-100 rounded p-8">
					<h1 className="text-xl text-center mb-4">Login</h1>
					<form onSubmit={this.login}>
						<div className="mb-4">
							<label className="block text-sm mb-1" htmlFor="email">Email</label>
							<input ref={this.email} className="block py-2 px-4 w-full border rounded focus:outline-none focus:shadow-outline" type="text" id="email"/>
						</div>
						<div className="mb-4">
							<label className="block text-sm mb-1" htmlFor="password">Password</label>
							<input ref={this.password} className="block py-2 px-4 w-full border rounded focus:outline-none focus:shadow-outline" type="password" id="password"/>
						</div>
						<div className="mb-4">
							<button type="submit" className="bg-indigo-700 text-white rounded py-2 px-4">Login</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	login(e) {
		const that = this;
		e.preventDefault();
		axios.post('/api/login', {
			email: this.email.current.value,
			password: this.password.current.value,
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
)(Login));
