import React, { useEffect, useState } from "react";
import BurgerMenu from './BurgerMenu';

import styles from './Navigation.module.scss';

export default function Navigation({ isMobile, children }) {
	const [items, setItems] = useState([]);
	const [menuOpen, setMenuOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState('info');

	const showMenu = () => {
		const createChildren = () => {
			const items = [];

			for (const child in children) {
				items.push(<NavigationItem key={child.id} id={child.id} text={child.text} onClick={(e) => setCurrentPage(e.target.id)} />)
			}

			return items;
		}

		return (
			<>
				{/* <div className={styles.screenMask}></div> */}
				{createChildren()}
			</>
		)
	}

	const renderMobile = () => {
		return ( 
			<div className={styles.navDiv}>
				<div className={styles.itemDiv}>
					{menuOpen && showMenu()}
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

function NavigationItem({id, text }) {
	return (
		<div className={styles.navItem}>
			{text}
		</div>
	)
}

export { NavigationItem }