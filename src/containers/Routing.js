import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Layout from './Layout';
import Welcome from '../components/Welcome';
import ItemsList from '../components/ItemsList';
import Editor from '../components/Editor';

class Routing extends Component {

	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Layout}>
					<IndexRoute component={Welcome} />
					<Route path=":type" component={ItemsList} />
					<Route path=":type/:id" component={Editor} />
				</Route>
			</Router>
		);
	}

};

export default Routing; 