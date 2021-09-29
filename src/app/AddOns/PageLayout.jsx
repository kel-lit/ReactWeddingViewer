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

function PageDivider() {
	return <div className={styles.divider}/>
}

export default function PageLayout({ children }) {
	return <div className={styles.layout}>
		{ children }
	</div>
}

export { PageHeading, PageContent, PageDivider } 