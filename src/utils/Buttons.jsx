import React from 'react';

import styles from './Buttons.module.scss';

function Button ({ text, onClick }) {
	return (
		<button onClick={onClick}>{text}</button>
	)
}

export { Button }