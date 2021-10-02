import React from 'react';

import styles from './Loader.scss'

export default function Loader() {
	return (
		<div className={styles.loader}>
			<div className={styles.squares}>{'&'}</div>
		</div>
	)
}