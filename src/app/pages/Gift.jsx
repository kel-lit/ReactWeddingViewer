import React, { useEffect, useState } from 'react'
import useJsonApi from 'utils/useJsonApi'

export default function () {
	const [custResponse, custLoading, custError, custRequest] = useJsonApi('/api/gift/createcustomer')
	const [pricResponse, pricLoading, pricError, pricRequest] = useJsonApi('/api/gift/createprice')

	const [customerName, setCustomerName] = useState('')

	const [giftAmount, setGiftAmount] = useState(0)

	const giveGift = () => {
		pricRequest({data: {giftAmount: giftAmount, }})
	}

	useEffect(() => {
		if (!custResponse) {
			custRequest()
			return
		}

		setCustomerName(custResponse.customerName)
	}, [custResponse])

	return (
		<>
			<h1>Test</h1>

			<input onChange={e => setGiftAmount(e.target.value)} placeholder='£0' type='number'/>

			<button onClick={giveGift}>Contribute</button>

			{customerName}
		</>
	)
}