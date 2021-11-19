import React from 'react'
import PageLayout, { PageHeading, PageContent, PageDivider, PageContentImage } from '../AddOns/PageLayout'

import styles from './Location.scss'

import imageCourtyard from 'images/location-courtyard.jpg'
import imageReceptionRoom from 'images/location-reception-room.jpg'

export default function(props) {
	return (
		<PageLayout>
			<PageHeading value={t('pages.location.title')} />

			<PageDivider />

			<PageContent>
				{t('pages.location.maincontent')}

				<PageContentImage src={imageCourtyard} />

				{t('pages.location.locationdescription')}

				<PageContentImage src={imageReceptionRoom} />

				<Map />
			</PageContent>
		</PageLayout>
	)
}

function Map() {
	return (
		<div className={styles.mapOuter}>
			<div className={styles.mapCanvas}>
				<iframe width={"100%"}
					height={"400px"}
					id={"mapCanvas"}
					src={"https://maps.google.com/maps?q=Dodford%20Manor&t=&z=11&ie=UTF8&iwloc=&output=embed"}
					frameBorder={"0"}
					scrolling={"no"}
					marginHeight={"0"}
					marginWidth={"0"}>
				</iframe>

				<a href={"https://www.whatismyip-address.com"} />
				<br/>
				<a href="https://www.embedgooglemap.net" />
			</div>
		</div>
	)
}