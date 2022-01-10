import React, { useEffect, useState } from 'react'
import useJsonApi from 'utils/useJsonApi'
import PageLayout, { PageHeading, PageSubHeading, PageContent, PageDivider } from '../AddOns/PageLayout'

export default function () {
	const [custResponse, custLoading, custError, custRequest] = useJsonApi('/api/gift/createcustomer')
	const [pricResponse, pricLoading, pricError, pricRequest] = useJsonApi('/api/gift/createprice')

	const [customerName, setCustomerName] = useState('')

	const [giftAmount, setGiftAmount] = useState(0)

	const queryParams = new URLSearchParams(window.location.search)

	const giveGift = () => {
		pricRequest({data: {giftAmount: giftAmount, customerName: customerName}})
	}

	useEffect(() => {
		if (!custResponse) {
			custRequest()
			return
		}

		setCustomerName(custResponse.result.customerName)
	}, [custResponse])

	useEffect(() => {
		if (!pricResponse) return

		window.location.href = pricResponse.result.url
	})

	const NewGift = () => {
		return (
			<>
				<PageContent>
					{t('pages.gifts.content')}
				</PageContent>

				<PageContent>
					<input onChange={e => setGiftAmount(e.target.value)} placeholder='£0' type='number' value={giftAmount}/>

					<button onClick={giveGift}>Contribute</button>

					{customerName}
				</PageContent>
			</>
		)
	}

	const GiftMessage = () => {
		if (queryParams.get("success") === "true") {
			return (
				<PageContent>
					{t('pages.gifts.successmessage')}
				</PageContent>
			)
		}
		else if (queryParams.get("cancelled") === "true") {
			return (
				<>
					<PageContent>
						{t('pages.gifts.giftcancelled')}
					</PageContent>

					<NewGift />
				</>
			)
		}

		return null
	}

	return (
		<PageLayout>
			<PageHeading value={t('pages.home.gifts')} />

			<PageDivider />

			{queryParams.get('success') || queryParams.get('cancelled') ? <GiftMessage /> : <NewGift />}
		</PageLayout>
	)
}