import React, { useState } 	from 'react';
import ReactDOM from 'react-dom';
import Home		from './pages/Home';
import Login	from './pages/Login';

import styles from './index.scss';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	document.cookie = 'language=english';

	return (
		<>
			{isLoggedIn && <Home loginCallback={setIsLoggedIn} />}
			{!isLoggedIn && <Login loginCallback={setIsLoggedIn} />}
		</>
	)
}

ReactDOM.render((
	<App />
), document.getElementById('root'));

module.hot.accept();