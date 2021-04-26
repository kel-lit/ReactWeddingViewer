import React, { useEffect, useState } from 'react';
import useJsonApi from '../utils/useJsonApi';
import { Button } from '../utils/Buttons';
import t from '../utils/Translator';

import styles from './Login.module.scss';

export default function Login({ callback }) {
	const [code, setCode] = useState('');
	const [loginResponse, loginLoading, loginError, login] = useJsonApi('/api/database/login');

	const doLogin = () => {
		login({code: code});
	}

	useEffect(() => {
		if (!loginResponse.isLoaded) return;

		if (loginResponse.result.success) {
			console.log("Logged in as: " + loginResponse.result.success);
		}
		else if (loginResponse.error){
			console.log(JSON.stringify(loginResponse.error));
		}
	}, [loginResponse])

	return (
		<>
			<div className={styles.loginCard}>
				<div className={styles.loginTitle}>
					{t('pages.login.title')}
				</div>
				<div className={styles.loginForm}>
					<label className={styles.loginLabel} htmlFor='loginInput'>{t('pages.login.codeInputLabel')}</label>
					<input id='loginInput' className={styles.loginInput} onChange={(e) => setCode(e.target.value)} placeholder={t('pages.login.codeInput')} />
					<Button text={t('pages.login.login')} onClick={doLogin} />
					{}
				</div>
			</div>
		</>
	)
}