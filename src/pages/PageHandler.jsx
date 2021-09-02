import React, { useEffect, useState } from 'react';
import Navigation, { NavigationItem } from './AddOns/Navigation';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import NameJoiner from 'utils/NameJoiner';
import { PageHeading, PageContent } from './AddOns/PageLayout';
import {Translator as t} from 'utils/Translator';

export default function PageHandler () {
	const [currentPage, setCurrentPage] = useState('info');

	const names = NameJoiner(sessionStorage.getItem("names").split(';'));

	useEffect(() => {
		if (currentPage === 'logout') {
			// handle logout
		}		

	}, [currentPage])

	return (
		<>
			<Navigation isMobile={isMobile} currentPage={currentPage} setPage={setCurrentPage} />

			<PageHeading value={t('pages.'+ currentPage + '.title')} />
			{/* <PageHeading value={NameJoiner(sessionStorage.getItem("names").split(';')) } />	 */}
			<PageContent value={''} /> 
		</>
	)	
}