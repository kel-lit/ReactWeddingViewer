import React, { useEffect, useState, useContext } from 'react'
import TextArea from '../AddOns/TextArea'
import PageLayout, { PageHeading, PageContent, PageDivider, PageContentImage } from '../AddOns/PageLayout'
import useJsonApi from 'utils/useJsonApi'
import { UserContext } from '../../index'

import styles from './Info.scss'

import imageCeremonyRoom from 'images/location-ceremony-room.jpg'
import imageBand from 'images/info-band.jpg'

export default function(props) {
	const [response, loading, error, request] = useJsonApi('/api/update/information')

	const [original, setOriginal] = useState(props.songRequests || '')
	const [songRequests, setSongRequests] = useState(props.songRequests || '')

	const doRequest = () => {
		request({data: {songRequests: songRequests}})
	}

	const context = useContext(UserContext)
	
	const buttonDisabled = () => original.trim() === songRequests.trim()

	useEffect(() => {
		if (!response) return

		if (response.result.success) {
			setOriginal(songRequests)
			context.setGuestInfo(state => ({...state, songRequests: songRequests}))
		}
		else if (!response.result.success)
			console.log(t(response.result.error))
	}, [response])
	
	return (
		<PageLayout>
			<PageHeading value={'Information'} />

			<PageDivider />

			<PageContent>
				{t('pages.info.timeinfo')}
				<PageContentImage src={imageCeremonyRoom} />

				{t('pages.info.foodinfo')}

				{t('pages.info.bandinfo')}

				<PageContentImage src={imageBand} />
				<a href={"https://www.jukeboxmk.com/"} target="newtab">{t('pages.info.bandinfolink')}</a>
				
				{t('pages.info.songrequests')}
				<div className={styles.songRequestContainer}>
					<TextArea className={styles.textArea} maxLength={200} onChange={setSongRequests} value={songRequests} placeholder={t('pages.info.songrequestsplaceholder')} />
					<button className={styles.songRequestButton} disabled={buttonDisabled()} onClick={doRequest} >{t('pages.info.savesongrequest')}</button>
				</div>
			</PageContent>
		</PageLayout>
	)
}