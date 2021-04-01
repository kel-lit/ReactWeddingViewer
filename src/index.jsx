import React 	from 'react';
import ReactDOM from 'react-dom';
import Home		from './pages/Home';

import styles from './index.module.scss';

function App() {
	return (
		<>
			<Home />
		</>
	)
}

ReactDOM.render((
	<App />
), document.getElementById('root'));

module.hot.accept();