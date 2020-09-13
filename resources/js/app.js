import Todos from "./views/Todos";

require('./bootstrap');

import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import store from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import Header from "./components/Header";
import Login from "./views/Login";
import Register from "./views/Register";

class App extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	auth: false
		// }
	}


	componentDidMount() {
		const token = localStorage.getItem('token');
		console.log({token})
		if (token) {
			// axios.interceptors.request.use(function(config){
			// 	let cnf = config.headers[]
			// 	return config
			// }, function(error) {
			// 	return Promise.reject(error)
			// })
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			// this.props.loggedIn();
		}
	}

	render() {
		// if (!this.state.authenticated) {
		// 	return <Login/>
		// }
		return (
			<Fragment>
				<Header/>
				<div>
					<Switch>
						<Route path="/login" exact={true} component={Login}/>
						<Route path="/register" exact={true} component={Register}/>
						<Route path="/todos" exact={true} component={Todos}/>
					</Switch>
				</div>
			</Fragment>

		);
	}
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('app'));
