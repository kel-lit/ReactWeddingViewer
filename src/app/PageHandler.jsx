import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Navigation from './AddOns/Navigation';
import { UserContext } from '../index';
import useJsonApi from 'utils/useJsonApi';
import Loader from 'utils/Loader';

import Home from './pages/Home';
import Info from './pages/Info';
import RSVP from './pages/RSVP';
import Location from './pages/Location';
import Images from './pages/Images';

export default function PageHandler () {
	const context = useContext(UserContext);

	if (!isMobile)
		document.getElementById('root').setAttribute('min-width', '600px')
	else
		document.getElementById('root').removeAttribute('min-width')

	return (
		<>
			<Router>
				<Navigation isMobile={isMobile} />
				<Switch>
					<Route path='/information'>
						<Info songRequests={context.guestInfo.songRequests} />
					</Route>
					<Route path='/rsvp'>
						<RSVP guestInfo={context.guestInfo} />
					</Route>
					<Route path='/location'>
						<Location />
					</Route>
					<Route path='/images'>
						<Images />
					</Route>
					<Route path='/logout'>
						<Logout logout={context.logout}/>
					</Route>
					<Route path='/'>
						<Home />
					</Route>
				</Switch>
			</Router>
		</>
	)	
}

function Logout({ logout }) {
	const [res, loading, error, req] = useJsonApi('/api/login/logout')

	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		if (!res)
			req()
		else if (res.isLoaded) {
			logout()
			setRedirect(true)
		}
	}, [res])

	if (redirect)
		return <Redirect to='/' />

	else
		return <Loader />
}