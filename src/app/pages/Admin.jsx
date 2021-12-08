import React, { useState } from 'react'
import bcrypt from 'bcrypt'
import useJsonApi from 'utils/useJsonApi'

import styles from './Admin.scss'

export default function() {
	const [response, loading, error, request] = useJsonApi

	const [data, setData] = useState(null)

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	
	const doLogin = () => { 
		
	}

	return (
		<form action={null}>
			<input type='text' onChange={e => setUsername(e.target.value)} />
			<input type="password" onChange={e => setPassword(e.target.value)}/>

			<button onClick={doLogin}>Login</button>
		</form>
	)
}