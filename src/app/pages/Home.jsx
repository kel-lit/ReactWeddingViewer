import React, { useEffect, useState, useContext } from 'react';
import PageLayout, { PageHeading, PageContent, PageDivider } from '../AddOns/PageLayout';
import NameJoiner from 'utils/NameJoiner';

import { UserContext } from '../../index';

import styles from './Home.scss';

export default function Home () {
	const context = useContext(UserContext);

	return (
		<PageLayout>
			<PageHeading value={NameJoiner(context.guestInfo.guests.map(guest => guest.name))} />
			
			<PageDivider />

			<PageContent>
				{t('pages.home.maincontent')}
			</PageContent>
		</PageLayout>
	)
}