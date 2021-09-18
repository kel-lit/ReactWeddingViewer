import React from 'react';

import styles from './PageLayout.scss'

function PageHeading({ value, className }) {
	return (
		<div className={styles.pageHeading + ' ' + className}>{value}</div>
	)
}

function PageContent({ value, className }){
	return (
		<div className={styles.contentContainer}>
			<div className={styles.contentInner}>{value}</div>
		</div>
	)
}

export { PageHeading, PageContent }