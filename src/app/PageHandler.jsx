import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Navigation from './AddOns/Navigation';
import { UserContext } from '../index';

import Home from './pages/Home';
import Info from './pages/Info';
import RSVP from './pages/RSVP';
import Location from './pages/Location';
import Images from './pages/Images';

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
						<Info />
					</Route>
					<Route path='/rsvp'>
						<RSVP />
					</Route>
					<Route path='/location'>
						<Location />
					</Route>
					<Route path='/images'>
						<Images />
					</Route>
					<Route path='/logout'>
						<Home />
					</Route>
				</Switch>
			</Router>
		</>
	)	
}