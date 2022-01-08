import React, { useEffect, useState, useContext } from 'react';
import PageLayout, { PageHeading, PageSubHeading, PageContent, PageDivider } from '../AddOns/PageLayout';
import NameJoiner from 'utils/NameJoiner';
import { Button } from 'utils/Buttons'
import useJsonApi from 'utils/useJsonApi'

import { UserContext } from '../../index';

import styles from './Home.scss';

export default function Home () {
	const context = useContext(UserContext);

	const [response, loading, error, request] = useJsonApi('/api/gift')

	const gift = () => {
		window.location.assign('/giveagift')
	}

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

			<PageHeading value={t('pages.home.gifts')} />

			<PageDivider />

			<PageContent>
				{t('pages.home.giftsmessage1')}
				<br />
				{t('pages.home.giftsmessage2')}
			</PageContent>

			<Button className={styles.giftButton} text={t('pages.home.giveagift')} onClick={gift} />

		</PageLayout>
	)
}