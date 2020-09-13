import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

import {connect} from 'react-redux';
import {loggedIn, loggedOut} from "../store/AuthSlice";
import {withRouter} from "react-router";

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

class Header extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		const that = this;
		axios.interceptors.response.use(function (response) {
			return response
		}, function (error) {
			if (error.response.status === 401) that.props.history.push('/login')
			return Promise.reject(error)
		})
	}

	render() {
		return (
			<div className="p-6 bg-gray-200 flex justify-between">
				<div>Logo here</div>
				<div>
					{
						!this.props.auth ? <Fragment>
							<Link to="/login" className="ml-2">Login</Link>
							<Link to="/register" className="ml-2">Register</Link>
						</Fragment> : <Fragment>
							<Link to="/todos" className="ml-2">Todos</Link>
							<span className="ml-2" onClick={this.logout}>Logout</span>
						</Fragment>
					}
					<Redirect to="/"/>
				</div>
			</div>
		);
	}

	logout() {
		const that = this;
		e.preventDefault();
		axios.get('/api/logout',).then(res => {
			console.log(res)
			if (res.data.token) {
				axios.defaults.headers.common["Authorization"] = "";
				that.props.loggedOut()
				that.props.history.push('/login')
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
)(Header));
