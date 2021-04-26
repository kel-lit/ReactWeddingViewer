import React, { useState } from 'react'
import styles from './BurgerMenu.module.scss'

export default function BurgerMenu({callback}) {
	const [menuActive, setMenuActive] = useState(false);

	const toggleMenu = () => {
		callback(!menuActive); 
		setMenuActive(menuActive => !menuActive);
	}

	return (
		<div className={styles.menuDiv} onClick={toggleMenu}>
			<div className={styles.menuIcon}></div>
		</div>
	)
}