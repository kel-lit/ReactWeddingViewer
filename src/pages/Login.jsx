import React, { useEffect, useState } from 'react';
import { Button } from '../utils/Buttons';
import useJsonApi from '../utils/useJsonApi';
import {Translator as t} from '../utils/Translator';
import UserProfile from '../utils/UserProfile';

import styles from './Login.module.scss';

import logo from '../images/logo.png';
import back from '../images/login-back.jpg';

export default function Login({ loginCallback }) {
	const [code, setCode] = useState('');
	const [error, setError] = useState(false);
	const [inputActive, setInputActive] = useState(false);
	const [loginResponse, loginLoading, loginError, login] = useJsonApi('/api/login');

	const doLogin = () => {
		if (code.length < 8) {
			setError(t('pages.login.errors.tooShort'));
		}
		else if (code.length > 8) {
			setError(t('pages.login.errors.tooLong'));
		}
		else {
			login({code: code});
		}
	}

	useEffect(() => {
		if (!loginResponse.isLoaded) return;

		if (loginResponse.result.success) {
			var names = '';

			Object.values(loginResponse.result.success).forEach((value, index) => {
				names += value.name;
				if (index != loginResponse.result.success.length - 1) names += ';'
			})

			sessionStorage.setItem('names', names); // Create a list like 'Name1; Name2; Name3

			loginCallback(true);
		}
		else if (loginResponse.result.error){
			setError(t(loginResponse.result.error));
		}
	}, [loginResponse])

	return (
		<>	
			<div className={styles.loginBody} onSubmit={(e) => { e.preventDefault(); }}>
				<img className={styles.background} src={back} />
				<form action={null} className={styles.form}>
					<div className={styles.formCard}>
						<img src={logo} className={styles.logo}/>
						<div className={styles.loginTitle}>{t('pages.login.title')}</div>
						<label htmlFor='loginInput' className={styles.inputLabel} >{t('pages.login.codeInputLabel')}</label>
						<input className={styles.loginInput} 
							onFocus={() => setInputActive(true)} 
							onBlur={() => setInputActive(false)} 
							onChange={(e) => setCode(e.target.value)} 
							placeholder={!inputActive ? t('pages.login.codeInput') : ''} 
							autoCapitalize='None'
							autoCorrect='off' />

						{error && <div className={styles.error}>{error}</div>}
						<Button className={styles.loginButton} onClick={doLogin} text={t('pages.login.login')} />
					</div>
				</form>
			</div>
		</>
	)
}

// Look into useContext