import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import {Translator as t} from 'utils/Translator';
import Navigation from './AddOns/Navigation';
import { UserContext } from '../index';

import Home from './Home';

export default function PageHandler () {
	const [currentPage, setCurrentPage] = useState('info');

	const context = useContext(UserContext);

	useEffect(() => {
		if (currentPage === 'logout') {
			// handle logout
		}		

	}, [currentPage])

	return (
		<>
			<Router>
				
				<Navigation isMobile={isMobile} currentPage={currentPage} setPage={setCurrentPage} />

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