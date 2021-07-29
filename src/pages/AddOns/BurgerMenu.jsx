import React, { useState } from 'react'
import styles from './BurgerMenu.module.scss'

export default function BurgerMenu({ active, callback }) {

	const toggleMenu = () => {
		callback(!active);
	}

	return (
		<div className={styles.menuDiv} onClick={toggleMenu}>
			<div className={styles.menuIcon + ' ' + (active ? styles.menuActive : '')}></div>
		</div>
	)
}