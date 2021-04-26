import React, { useState } 	from 'react';
import ReactDOM from 'react-dom';
import Home		from './pages/Home';
import Login	from './pages/Login';

import styles from './index.module.scss';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	document.cookie = 'language=english';

	return (
		<>
			{isLoggedIn && <Home />}
			{!isLoggedIn && <Login callback={setIsLoggedIn}/>}
		</>
	)
}

ReactDOM.render((
	<App />
), document.getElementById('root'));

module.hot.accept();