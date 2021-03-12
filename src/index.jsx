import React 	from 'react';
import ReactDOM from 'react-dom'

import styles from './index.module.scss';

const title = "Hello, World!"

ReactDOM.render((
	<div className={ styles.hello }>{ title }</div>
), document.getElementById('root'));

module.hot.accept();