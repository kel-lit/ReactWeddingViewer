import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Login from './app/pages/Login';
import PageHandler from './app/PageHandler';
import useJsonApi from 'utils/useJsonApi';
import Loader from 'utils/Loader'; 
import GetLocale from 'utils/GetLocale';

const tokenCookie = 'ksweddingviewer_token';
const UserContext = React.createContext({});

function App() {
	const [session, checkLoading, checkError, checkSession] = useJsonApi('/api/login/checkForSession')

	const [guestInfo, setGuestInfo]		= useState(null);

	const [ready, setReady]				= useState(false);
	const [isLoggedIn, setIsLoggedIn] 	= useState(true);

	document.title = "Kelan and Sabrina"
	document.cookie = 'ksweddingviewer_language=' + GetLocale();

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
				setGuestInfo(session.result);
			}
			else
				setIsLoggedIn(false);
		}
	}, [session])

	if (ready && isLoggedIn) {
		return (
			<UserContext.Provider value={{logout: logout, guestInfo: guestInfo, setGuestInfo: setGuestInfo}}>
				<PageHandler />
			</UserContext.Provider>
		)
	}
	else if (ready) {
		return (
			<UserContext.Provider value={{ login: login, setGuestInfo: setGuestInfo }}>
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