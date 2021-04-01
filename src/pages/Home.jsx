import React, { useEffect, useState } from 'react';

export default function Home () {
	let [res, setRes] = useState({isLoaded: false, message: ''})

	const testApi = () => {
		fetch('/api/test')
		.then(res => res.json())
		.then((result) => {
			setRes({
				isLoaded: true,
				message: result.test
			})
		})
	}

	useEffect(() => {
		testApi();
	}, [])

	useEffect(() => {

	}, [res])


	return (
		<div className=''>
			{res.isLoaded ? res.message : ''}
		</div>
	)
}
