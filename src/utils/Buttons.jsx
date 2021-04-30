import React from 'react';

import styles from './Buttons.module.scss';

function Button ({ text, onClick, className }) {
	return (
		<button className={className} onClick={onClick}>{text}</button>
	)
}

export { Button }