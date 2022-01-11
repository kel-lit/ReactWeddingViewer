import React, { useEffect, useState, useContext } from 'react';
import PageLayout, { PageHeading, PageSubHeading, PageContent, PageDivider } from '../AddOns/PageLayout';
import NameJoiner from 'utils/NameJoiner';
import { Button } from 'utils/Buttons'
import { Link } from 'react-router-dom';

import { UserContext } from '../../index';

import styles from './Home.scss';

export default function Home () {
	const context = useContext(UserContext);

	const currentLanguage = document.cookie.split('; ').find(row => row.startsWith('ksweddingviewer_language=')).split('=')[1] || "english"

	return (
		<PageLayout>
			<PageHeading value={NameJoiner(context.guestInfo.guests.map(guest => guest.name))} />
			
			<PageDivider />

			<PageSubHeading>
				{t('pages.home.subheading')}
			</PageSubHeading>

			<PageContent>
				{t('pages.home.maincontent1')}
				<br />
				{t('pages.home.maincontent2')}
				<br />
				{t('pages.home.maincontent3')}
				<br />
				{t('pages.home.maincontent4')}
			</PageContent>

			{ currentLanguage !== "it" &&
			<>
				<PageHeading value={t('pages.home.gifts')} />

				<PageDivider />

				<PageContent>
					{t('pages.home.giftsmessage1')}
					<br />
					{t('pages.home.giftsmessage2')}
					<br />
					{t('pages.home.giftsmessage3')}
				</PageContent>
			</> }

		</PageLayout>
	)
}