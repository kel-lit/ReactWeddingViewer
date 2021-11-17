import React, { useState, useContext, useEffect } from 'react'
import PageLayout, { PageHeading, PageContent, PageDivider } from '../AddOns/PageLayout'
import Toggle from '../AddOns/Toggle'
import TextArea from '../AddOns/TextArea'
import Loader from 'utils/Loader'
import useJsonApi from 'utils/useJsonApi'

import styles from './RSVP.scss'

import imageDay from 'images/allday.png'
import imageEvening from 'images/evening.png'

const ChangesContext = React.createContext({})

export default function({ guestInfo }) {
	const [response, loading, error, saveChanges] = useJsonApi('/api/update')

	const [original, setOriginal]		= useState(null)
	const [hasChanges, setHasChanges] 	= useState(null)
	
	const [foodNotes, setFoodNotes]		= useState(guestInfo.foodNotes || "")

	const updateFoodNotes = (value) => {
		setHasChanges(state => ({
			...state,
			foodNotes: value
		}))
	}

	const showSave = () => {
		if (!hasChanges) return

		return JSON.stringify(original) !== JSON.stringify(hasChanges)
	}

	const doSaveChanges = () => {
		const guests 			= guestInfo.guests
		const newGuestsArray 	= guests

		for (const key in hasChanges) {
			newGuestsArray[key] = {...guests[key], isAttending: hasChanges[key].attending, isVegetarian: hasChanges[key].vegetarian}
		}

		saveChanges({data: {guests: newGuestsArray, foodNotes: foodNotes}});
	}

	useEffect(() => {
		const original = {}

		guestInfo.guests.forEach((guest, index) => {
			original[index] = {attending: guest.isAttending, vegetarian: guest.isVegetarian}
		})

		original.foodNotes = foodNotes;

		setOriginal(original)
		setHasChanges(original)
	}, [])

	useEffect(() => {
		
	}, [response])

	if (original) {
		return (
			<PageLayout>
				<PageHeading value={t('pages.rsvp.title')} />

				<PageDivider />

				<ChangesContext.Provider value={{setHasChanges: setHasChanges}}>
					<RSVPTable guests={guestInfo.guests} />
				</ChangesContext.Provider>

				<TextArea className={styles.food_notes} maxLength={200} placeholder={t('pages.rsvp.textareaplaceholder')} getContent={setFoodNotes} value={foodNotes} onChange={updateFoodNotes} />

				<div className={styles.key}>
					<div className={styles.key_block}>
						<div className={styles.key_text}>{t('pages.rsvp.allday')}</div>  
						<img className={styles.key_icon} src={imageDay} />
					</div>
					<div className={styles.key_block}>
						<img className={styles.key_icon} src={imageEvening} />
						<div className={styles.key_text}>{t('pages.rsvp.evening')}</div>  
					</div>
				</div>

				{ showSave() && <button className={styles.save_button} onClick={doSaveChanges} >{t('pages.rsvp.save')}</button> }
			</PageLayout>
		)
	}
	else 
		return <Loader />
}

function RSVPTable({ guests }) {
	return (
		<div className={styles.table}>
			{ guests.length && <RSVPTableHeading /> }
			{ (guests || []).map((guest, index) => <RSVPTableRow key={index} index={index} {...guest} />) }
		</div>
	)
}

function RSVPTableHeading() {
	return (
		<div className={styles.row_head + ' ' + styles.heading}>
			<div className={styles.heading_row_cell}>{t('pages.rsvp.name')}</div>
			<div className={styles.heading_row_cell}>{t('pages.rsvp.guesttype')}</div>
			<div className={styles.heading_row_cell}>{t('pages.rsvp.attending')}</div>
			<div className={styles.heading_row_cell}>{t('pages.rsvp.vegetarian')}</div>
		</div>
	)
}

function RSVPTableRow({ index, name, isDayGuest, isAttending, isVegetarian }) {
	const [state, setState] = useState({attending: isAttending, vegetarian: isVegetarian})

	const context = useContext(ChangesContext)

	const original = {attending: isAttending, vegetarian: isVegetarian}

	const doSetState = (key, value) => {
		setState(oldState => ({
			...(oldState || {}),
			[key]: value
		}))
	}

	const isGuestAttending = () => {
		return state.attending && state.attending !== 'pending'
	}

	useEffect(() => {
		context.setHasChanges(oldState => ({
			...(oldState || {}), 
			[index]: {...state}
		}))
	}, [state])

	return (
		<div>
			<div className={styles.row_head + ' ' + styles.data}>
				<div className={styles.row_data_cell}>{name}</div>
				<div className={styles.row_data_cell}><img src={isDayGuest ? imageDay : imageEvening} className={styles.icon} /></div>
				<div className={styles.row_data_cell}><Toggle value={state.attending} onClick={pos => doSetState('attending', pos)} /></div>
				<div className={styles.row_data_cell}><Toggle value={state.vegetarian} onClick={pos => doSetState('vegetarian', pos)} disabled={!isGuestAttending()} /></div>
			</div>
		</div>
	)
}
