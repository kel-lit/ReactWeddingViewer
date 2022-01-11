import React, { useEffect, useState, useContext } from 'react'
import TextArea from '../AddOns/TextArea'
import PageLayout, { PageHeading, PageContent, PageDivider, PageContentImage, PageSubHeading } from '../AddOns/PageLayout'
import useJsonApi from 'utils/useJsonApi'
import { UserContext } from '../../index'
import MessageHandler from 'utils/MessageHandler'

import styles from './Info.scss'

import imageCeremonyRoom from 'images/location-ceremony-room.jpg'
import imageBand from 'images/info-band.jpg'

export default function(props) {
	const [response, loading, error, request] = useJsonApi('/api/update/information')

	const [message, setMessage] = useState(null)

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
			setMessage({message: t('common.changessaved'), type: 'info'})
		}
		else if (!response.result.success)
			setMessage({title: t('common.error'), message: t(response.result.error), type: 'error'})
	}, [response])
	
	return (
		<PageLayout>
			<PageHeading value={t('pages.info.title')} />

			<PageDivider />

			<PageContent>
				<PageSubHeading>
					{t('pages.info.timetitle')}
				</PageSubHeading>

				<TimeTable />
			</PageContent>

			<PageContent>
				<PageContentImage src={imageCeremonyRoom} />
			</PageContent>

			<PageContent>
				<PageSubHeading>
					{t('pages.info.foodtitle')}
				</PageSubHeading>
				{t('pages.info.foodinfo')}
				<br />
				<FoodTable />

				<br/>
				{t('pages.info.foodevening')}
			</PageContent>

			<PageContent>
				<PageSubHeading>
					{t('pages.info.hoteltitle')}
				</PageSubHeading>
				{t('pages.info.hotelinfo')}
			</PageContent>

			<PageContent>
				<PageSubHeading>
					{t('pages.info.bandtitle')}
				</PageSubHeading>
				{t('pages.info.bandinfo')}

				<PageContentImage src={imageBand} />
			</PageContent>

			<PageContent>
				<PageSubHeading>
					{t('pages.info.songrequeststitle')}
				</PageSubHeading>
				{t('pages.info.songrequests')}
				<div className={styles.songRequestContainer}>
					<TextArea className={styles.textArea} maxLength={200} onChange={setSongRequests} value={songRequests} placeholder={t('pages.info.songrequestsplaceholder')} />
					<button className={styles.songRequestButton} disabled={buttonDisabled()} onClick={doRequest} >{t('pages.info.savesongrequest')}</button>
				</div>
			</PageContent>

			<MessageHandler message={message || {}} close={() => setMessage(null)} />
		</PageLayout>
	)
}

function TimeTable() {
	return (
		<table className={styles.table}>
			<tbody>
				<tr>
					<th>{t('pages.info.timeoneheading')}</th>
					<td>{t('pages.info.timeone')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timetwoheading')}</th>
					<td>{t('pages.info.timetwo')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timethreeheading')}</th>
					<td>{t('pages.info.timethree')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timefourheading')}</th>
					<td>{t('pages.info.timefour')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timefiveheading')}</th>
					<td>{t('pages.info.timefive')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timesixheading')}</th>
					<td>{t('pages.info.timesix')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timesevenheading')}</th>
					<td>{t('pages.info.timeseven')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timeeightheading')}</th>
					<td>{t('pages.info.timeeight')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timenineheading')}</th>
					<td>{t('pages.info.timenine')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timetenheading')}</th>
					<td>{t('pages.info.timeten')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.timeelevenheading')}</th>
					<td>{t('pages.info.timeeleven')}</td>
				</tr>
			</tbody>
		</table>
	)
}

function FoodTable() {
	return (
		<table className={styles.table}>
			<tbody>
				<tr>
					<th></th>
					<th>{t('pages.info.foodstarterheading')}</th>
					<th>{t('pages.info.foodmainheading')}</th>
					<th>{t('pages.info.fooddessertheading')}</th>
				</tr>
				<tr>
					<th>{t('pages.info.foodmeateaters')}</th>
					<td>{t('pages.info.foodstarter')}</td>
					<td>{t('pages.info.foodmain')}</td>
					<td rowSpan={4}>{t('pages.info.fooddessert')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.foodveggie')}</th>
					<td>{t('pages.info.foodveggiestarter')}</td>
					<td rowSpan={2}>{t('pages.info.foodveggiemain')}</td>
				</tr>
				<tr>
					<th>{t('pages.info.foodvegan')}</th>
					<td>{t('pages.info.foodveganstarter')}</td>
				</tr>
					<th>{t('pages.info.foodkids')}</th>
					<td>{t('pages.info.foodkidsstarter')}</td>
					<td>{t('pages.info.foodkidsmain')}</td>
				<tr>

				</tr>
			</tbody>
		</table>
	)
}