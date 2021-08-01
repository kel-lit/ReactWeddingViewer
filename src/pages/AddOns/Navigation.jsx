import React, { useEffect, useState } from "react";
import BurgerMenu from './BurgerMenu';
import {Translator as t} from 'utils/Translator';

import styles from './Navigation.scss';

export default function Navigation({ isMobile, currentPage, setPage }) {
	const [items, setItems] = useState([]);
	const [menuOpen, setMenuOpen] = useState(false);
	
	const navItems = [
		{text: t('pages.info.title'), id: 'info'}, 
		{text: t('pages.rsvp.title'), id: 'rsvp'}, 
		{text: t('pages.location.title'), id:'loc'},
		{text: t('pages.images.title'), id: 'images'},
		{text: t('pages.login.logout'), id: 'logout'} 
	];

	const processMenuClick = (id) => {
		setPage(id);
		setMenuOpen(false);
	}

	const showMenu = () => {
		const items = [];
		
		navItems.forEach((item, key) => {
			items.push(<NavigationItem key={item.id} text={item.text} onClick={() => processMenuClick(item.id) } />);
		})

		return items;
	}

	const renderMobile = () => {
		return ( 
			<div className={styles.navDiv}>
				<div className={[styles.itemDiv, menuOpen ? styles.menuOpen : styles.menuClosed].join(' ')}>
					{showMenu()}
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

	return (
		<>
			{isMobile && renderMobile()}
			{!isMobile && renderBrowser()}
		</>
	)
}

function NavigationItem({id, text, onClick}) {
	return (
		<span onClick={onClick} className={styles.navItem}>
			{text}
		</span>
	)
}

export { NavigationItem }