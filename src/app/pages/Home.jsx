import React, { useEffect, useState, useContext } from 'react';
import { PageHeading, PageContent } from '../AddOns/PageLayout';
import NameJoiner from 'utils/NameJoiner';

import { UserContext } from '../../index';

import styles from './Home.scss';

export default function Home () {
	const context = useContext(UserContext);

	return (
		<>
			<PageHeading value={NameJoiner(context.guests)} />
			
			<PageContent value={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum sapiente facere quis esse corporis libero eaque quo animi odio est aperiam omnis cumque consequatur hic saepe, id quisquam consectetur minus.'} />
		</>
	)
}