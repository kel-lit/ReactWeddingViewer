import React, { useEffect, useState } from "react";
import BurgerMenu from './BurgerMenu';
import {Translator as t} from 'utils/Translator';

import styles from './Navigation.module.scss';

export default function Navigation({ isMobile }) {
	const [items, setItems] = useState([]);
	const [menuOpen, setMenuOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState('info');
	
	const navItems = [
		{text: t('pages.info.title'), id: 'info'}, 
		{text: t('pages.rsvp.title'), id: 'rsvp'}, 
		{text: t('pages.location.title'), id:'loc'},
		{text: t('pages.images.title'), id: 'images'},
		{text: t('pages.login.logout'), id: 'logout'} 
	];

	const showMenu = () => {
		const items = [];
		
		navItems.forEach((item, key) => {
			items.push(<NavigationItem key={item.id} text={item.text} onClick={() => processMenuClick(item.id) } />);
		})

		return items;
	}
	
	const processMenuClick = (id) => {
		if (id === 'logout') {
			// Handle logout
		}
		else {
			setCurrentPage(id);
		}
	}

	const renderMobile = () => {
		return ( 
			<div className={styles.navDiv}>
				<div className={[styles.itemDiv, menuOpen ? styles.menuOpen : styles.menuClosed].join(' ')}>
					{showMenu()}
				</div>
				<BurgerMenu callback={setMenuOpen} />
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