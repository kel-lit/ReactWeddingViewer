import React, { useEffect, useState } from 'react';

import styles from './MessageHandler.scss'

export default function({ message, close }) {
	const [thisTimeout, setThisTimeout] = useState(null)

	const [animateIn, setAnimateIn] = useState(false)

	useEffect(() => {
		if (thisTimeout)
			window.clearTimeout(thisTimeout)

		setAnimateIn(true)

		setThisTimeout(setTimeout(() => {
			setAnimateIn(false)
			
			setTimeout(() => {
				close()
			}, 500)

			setThisTimeout(null)
		}, 3000))

		return () => window.clearTimeout(thisTimeout)
	}, [message])

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