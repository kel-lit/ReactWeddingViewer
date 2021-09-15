import { useEffect, useState } from 'react';

export default function useJsonApi(path) {
	const [response, setResponse] 	= useState({isLoaded: false});
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
			...(method === 'GET' ? '' : {body : JSON.stringify(request)})
		})
		.then(res => res.json())
		.then(res => {
			setResponse(reponse => ({...response, isLoaded: true, result: res.body}));
		})
		.catch(error => {
			setResponse(response => ({...response, isLoaded: false, error: error}));
		})

		setRequest(false);
	}, [request])
 	
	return [response, loading, error, setRequest]
};