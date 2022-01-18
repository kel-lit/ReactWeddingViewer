import { useEffect, useState } from 'react';
import fetch from 'cross-fetch'

export default function useJsonApi(path) {
	const [response, setResponse] 	= useState(null);
	const [loading, setLoading]		= useState(false);
	const [error, setError] 		= useState(null);
	const [request, setRequest]		= useState(null);
	
	const apiPath = path;

	useEffect(() => {
		if (request === null) return;

		const method = request === undefined ? 'GET' : 'POST';

		fetch(apiPath, {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			...(method === 'GET' ? '' : {body: JSON.stringify({...request})})
		})
		.then(res => res.json())
		.then(res => {
			setResponse({isLoaded: true, result: res.body});
		})
		.catch(error => {
			setResponse({isLoaded: false, error: error});
		})

		setRequest(null);
	}, [request])
 	
	return [response, loading, error, setRequest]
};