import React, { useEffect, useState, useContext } from 'react';
import { PageHeading, PageContent } from './AddOns/PageLayout';
import {Translator as t} from 'utils/Translator';
import NameJoiner from 'utils/NameJoiner';

import { UserContext } from '../index';

import styles from './Home.scss';

export default function Home () {
	const context = useContext(UserContext);

	return (
		<>
			<PageHeading value={NameJoiner(context.guests)} />
			
			<PageContent value={''} />
		</>
	)
}
