import React, {  } from 'react';
import Navigation, { NavigationItem } from './AddOns/Navigation';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import NameJoiner from 'utils/NameJoiner';
import { PageHeading, PageContent } from './AddOns/PageLayout';
import {Translator as t} from 'utils/Translator';

export default function PageHandler () {
	const formatNames = () => {
		const 	names 		= sessionStorage.getItem("names").split(';');
		var 	nameString 	= '';

		names.forEach((name, index) => {
			nameString += name;

			if (index < names.length - 2) {
				nameString += ', '
			}
			else if (index < names.length - 1) {
				nameString += ' & '
			}
		})

		return nameString;
	}

	return (
		<>
			<Navigation isMobile={isMobile} />

			<h2>{formatNames()}</h2>
		</>
	)	
}