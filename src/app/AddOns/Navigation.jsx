import React, { useState } from "react";
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';

import styles from './Navigation.scss';

import imageLogo from 'images/logo.png';

export default function Navigation({ isMobile }) {
	const [menuOpen, setMenuOpen] 	= useState(false);
	
	const navItems = [
		{text: t('pages.home.title'),		url: '/'},
		{text: t('pages.info.title'), 		url: '/information'}, 
		{text: t('pages.rsvp.title'), 		url: '/rsvp'}, 
		{text: t('pages.location.title'), 	url: '/location'},
		{text: t('pages.images.title'), 	url: '/images'},
		{text: t('pages.login.logout'), 	url: '/logout'} 
	];
	
	const menu = [
		<img key={'nav-logo'} src={imageLogo} className={styles.logo} />,
		...(navItems.map((item, key) => <Link key={key} className={styles.navItem} to={item.url} onClick={() => closeOnClick()}>{item.text}</Link>)),
	]

	const doSetMenuOpen = (value) => {
		if (value)
			document.body.style.overflow = "hidden"
		else
			document.body.style.overflow = "auto"

		setMenuOpen(value)
	}

	const renderMobile = () => {
		return ( 
			<div className={styles.navDiv}>
				<div className={[styles.itemDiv, menuOpen ? styles.menuOpen : styles.menuClosed].join(' ')}>
					{ menu }
				</div>
				{ menuOpen && <div className={styles.navMask} />}
				<BurgerMenu active={menuOpen} callback={doSetMenuOpen} />
			</div>
		)
	}

	const renderBrowser = () => {
		return (
			<h1>Browser view</h1> 
		)
	}

	const closeOnClick = () => {
		doSetMenuOpen(false)
	}

	if (isMobile)
		return renderMobile();
	else
		return renderBrowser();
}