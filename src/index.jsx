import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Login from './app/pages/Login';
import PageHandler from './app/PageHandler';
import useJsonApi from 'utils/useJsonApi';
import Loader from 'utils/Loader';

import styles from './index.scss';

const tokenCookie = 'ksweddingviewer_token';
const UserContext = React.createContext({});

function App() {
	const [session, checkLoading, checkError, checkSession] = useJsonApi('/api/login/checkForSession')

	const [ready, setReady]				= useState(false);
	const [guests, setGuests]			= useState(null);
	const [isLoggedIn, setIsLoggedIn] 	= useState(true);

	document.cookie = 'ksweddingviewer_language=english';

	const login = () => {
		setIsLoggedIn(true);
	}

	const logout = () => {
		setIsLoggedIn(false);
	}

	useEffect(() => {
		if (!session) {
			checkSession();
		}
		else if (session.isLoaded) {
			setReady(true);
			
			if (session.result.success) {
				setIsLoggedIn(true);
				setGuests(session.result.guests.map(obj => obj.name));
			}
			else
				setIsLoggedIn(false);
		}
	}, [session])

	if (ready && isLoggedIn) {
		return (
			<UserContext.Provider value={{logout: logout, guests: guests}}>
				<PageHandler />
			</UserContext.Provider>
		)
	}
	else if (ready) {
		return (
			<UserContext.Provider value={{ login: login, setGuests: setGuests }}>
				<Login />
			</UserContext.Provider>
		)
	}
	else {
		return <Loader />
	}
}

ReactDOM.render((
	<App />
), document.getElementById('root'));

module.hot.accept();

export { UserContext };