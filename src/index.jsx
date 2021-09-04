import React, { useState } 	from 'react';
import ReactDOM from 'react-dom';
import Home		from './pages/Home';
import Login	from './pages/Login';

import styles from './index.scss';
import PageHandler from './pages/PageHandler';

const UserContext = React.createContext(null);

function App() {
	const [isLoggedIn, setIsLoggedIn] 	= useState(false);
	const [guests, setGuests]			= useState(null);

	document.cookie = 'language=english';

	const login = () => {
		setIsLoggedIn(true);
	}

	const logout = () => {
		setIsLoggedIn(false);
	}

	if (isLoggedIn) {
		return (
			<UserContext.Provider value={{logout: logout, guests: guests}}>
				<PageHandler />
			</UserContext.Provider>
		)
	}
	else {
		return (
			<UserContext.Provider value={{ login: login, setGuests: setGuests }}>
				<Login />
			</UserContext.Provider>
		)
	}
}

ReactDOM.render((
	<App />
), document.getElementById('root'));

module.hot.accept();

export { UserContext };