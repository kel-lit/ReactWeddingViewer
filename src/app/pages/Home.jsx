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

			<PageContent value={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum sapiente facere quis esse corporis libero eaque quo animi odio est aperiam omnis cumque consequatur hic saepe, id quisquam consectetur minus.'} />
		</PageLayout>
	)
}