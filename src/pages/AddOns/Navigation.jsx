import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import {Translator as t} from 'utils/Translator';

import styles from './Navigation.scss';

export default function Navigation({ isMobile, currentPage, setPage }) {
	const [menu, setMenu] 			= useState(null);
	const [menuOpen, setMenuOpen] 	= useState(false);
	
	const navItems = [
		{text: t('pages.home.title'),		url: '/'},
		{text: t('pages.info.title'), 		url: '/information'}, 
		{text: t('pages.rsvp.title'), 		url: '/rsvp'}, 
		{text: t('pages.location.title'), 	url: '/location'},
		{text: t('pages.images.title'), 	url: '/images'},
		{text: t('pages.login.logout'), 	url: '/logout'} 
	];

	const renderMobile = () => {
		return ( 
			<div className={styles.navDiv}>
				<div className={[styles.itemDiv, menuOpen ? styles.menuOpen : styles.menuClosed].join(' ')}>
					{ menu }
				</div>
				<BurgerMenu active={menuOpen} callback={setMenuOpen} />
			</div>
		)
	}

	const renderBrowser = () => {
		return (
			<h1>Browser view</h1> 
		)
	}

	const closeOnClick = () => {
		setMenuOpen(false);
	}

	useEffect(() => {
		setMenu(navItems.map((item, key) => <Link key={key} className={styles.navItem} to={item.url} onClick={closeOnClick}>{item.text}</Link>));
	}, [])

	if (isMobile)
		return renderMobile();
	else
		return renderBrowser();
}