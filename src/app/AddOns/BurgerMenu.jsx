import React, { useState } from 'react'
import styles from './BurgerMenu.scss'

export default function BurgerMenu({ active, callback }) {

	const toggleMenu = () => {
		if (active)
			document.body.style.overflow = "auto"
		else
			document.body.style.overflow = "hidden"
		callback(!active);
	}

	return (
		<div className={styles.menuDiv} onClick={toggleMenu}>
			<div className={styles.menuIcon + ' ' + (active ? styles.menuActive : '')}></div>
		</div>
	)
}