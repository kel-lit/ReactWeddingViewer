import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Navigation from './AddOns/Navigation';
import { UserContext } from '../index';

import Home from './pages/Home';
import Info from './pages/Info'

export default function PageHandler () {
	const context = useContext(UserContext);

	return (
		<>
			<Router>
				<Navigation isMobile={isMobile} />
				<Switch>
					<Route path='/'>
						<Home />
					</Route>
					<Route path='/information'>
						<Home />
					</Route>
					<Route path='/rsvp'>
						<Home />
					</Route>
					<Route path='/location'>
						<Home />
					</Route>
					<Route path='/images'>
						<Home />
					</Route>
					<Route path='/logout'>
						<Home />
					</Route>
				</Switch>
			</Router>
		</>
	)	
}