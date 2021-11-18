import React, { useState } from 'react';

import styles from './PageLayout.scss'

function PageHeading({ value, className }) {
	return (
		<div className={styles.pageHeading + ' ' + className}>{value}</div>
	)
}

function PageContent({ className, children }){
	return (
		<div className={styles.contentContainer}>
			{ React.Children.map(children, child => {
				if (child.type == PageContentImage)
					return <ExpandableImage className={styles.contentInnerImage} {...child.props} />
				else 
					return <div className={styles.contentInner}>{child}</div>
			}) }
		</div>
	)
}

function PageContentImage({ src }) {
	return <img src={src} />
} 

function PageDivider() {
	return <div className={styles.divider}/>
}

export default function PageLayout({ children }) {
	return <div className={styles.layout}>
		{ children }
	</div>
}

function ExpandableImage({ src, className }) {
	const [expanded, setExpanded] = useState(false)

	const visibility = expanded ? styles.visible : styles.hidden
	const outerClasses = styles.expandedOuter + ' ' + visibility 
	const innerClasses = styles.expandedImage + ' ' + visibility

	const toggle = () => {
		if (expanded)
			document.body.style.overflow = "auto"
		else
			document.body.style.overflow = "hidden"

		setExpanded(!expanded)
	}

	return (
		<div className={styles.imageContainer}>
			<img className={styles.expandableImage} src={src} onClick={() => toggle()} />
			<div className={outerClasses} onClick={toggle}>
				<img className={innerClasses} src={src}/>
			</div>
		</div>
	)
}

export { PageHeading, PageContent, PageDivider, PageContentImage } 