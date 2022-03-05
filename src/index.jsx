import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Login from './app/pages/Login'
import PageHandler from './app/PageHandler'
import useJsonApi from 'utils/useJsonApi'
import Loader from 'utils/Loader'
import { isSafari } from 'react-device-detect'

const tokenCookie = 'ksweddingviewer_token';
const UserContext = React.createContext({});

function App() {
	const [session, checkLoading, checkError, checkSession] = useJsonApi('/api/login/checkForSession')

	const [guestInfo, setGuestInfo]		= useState(null);

	const [ready, setReady]				= useState(false);
	const [isLoggedIn, setIsLoggedIn] 	= useState(true);

	document.title = "Kelan and Sabrina"
	document.cookie = 'ksweddingviewer_language=' + (navigator.language || navigator.userLanguage)

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

	// if (isSafari) {
	// 	return (
	// 	<>
	// 		<h1>Safari Incompatability</h1>
	// 		<p>Sorry for the inconvinence, but this website isn't compatible with Safari browser. The website does work on Chrome, Firefox and Edge. If you're not able to use one of those, please contact Kelan or Sabrina.</p>
	// 		<p>Scusate per l'inconveniente, il sito non è compatibile con Safari. Il sito funziona su Chrome, Firefox e Edge. Se non hai accesso a uno di questi browser contatta Kelan o Sabrina.</p>
	// 	</> 
	// 	)
	// }
	// else {
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
	// }
}

ReactDOM.render((
	<App />
), document.getElementById('root'));

module.hot.accept();

export { UserContext };