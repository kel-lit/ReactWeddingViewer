import React, {  } from 'react';
import Navigation, { NavigationItem } from './AddOns/Navigation';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

export default function PageHandler () {
	const NavItems = ['pages.info.title', 'pages.rsvp.title', 'pages.location.title', 'pages.images.title'];
	
	const createItems = () => {
		const items = [];
		
		for (const item in NavItems) {
			items.push(<NavigationItem key={item} text={NavItems[item]} />)
		}

		return items;
	}

	return (
		<Navigation isMobile={isMobile} >
			{createItems()}
		</Navigation>
	)
}