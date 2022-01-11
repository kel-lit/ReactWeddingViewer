import React, { useEffect, useState } from 'react';

import styles from './MessageHandler.scss'

export default function({ message, close }) {
	const [thisTimeout, setThisTimeout] = useState(null)

	const [animateIn, setAnimateIn] = useState(false)

	useEffect(() => {
		if (JSON.stringify(message) === '{}') return 
		
		if (thisTimeout)
			window.clearTimeout(thisTimeout)
		
		setAnimateIn(true)

		setThisTimeout(setTimeout(() => {
			setAnimateIn(false)
		}, 3000))
		
		return () => window.clearTimeout(thisTimeout)
	}, [message])

	useEffect(() =>{
		if (!animateIn) {
			setThisTimeout(setTimeout(() => {
				close()
			}, 500))
		}

		return () => window.clearTimeout(thisTimeout)
	}, [animateIn])

	const getHandler = () => {
		if (JSON.stringify(message) !== "{}" && (message.title || message.message)) {
			const outerStyles = styles.handlerOuter + ' ' + (animateIn ? styles.incoming : styles.outgoing)
			const strapStyles = styles.handlerStrap + ' ' + (message.type === 'error' ? styles.error : styles.info)

			return (
				<div className={outerStyles}>
					<div className={strapStyles} />
					<div className={styles.textContainer}>
						{ message.title && <div className={styles.handlerTitle}>{message.title}</div> }
						{ message.message && <div className={styles.handlerMessage}>{message.message}</div> }
					</div>
				</div>
			)
		}
		else
			return null
	}

	return getHandler()
}