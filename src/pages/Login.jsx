import React, { useEffect, useState } from 'react';
import { Button } from 'utils/Buttons';
import useJsonApi from 'utils/useJsonApi';
import {Translator as t} from 'utils/Translator';
import UserProfile from 'utils/UserProfile';

import styles from './Login.scss';

import imageLogo from 'images/logo.png';
import imageBackground from 'images/login-back.jpg';

export default function Login({ loginCallback }) {
	const [loginResponse, loginLoading, loginError, login] = useJsonApi('/api/login');

	const [code, setCode] 				= useState('');
	const [error, setError] 			= useState(null);
	const [inputActive, setInputActive] = useState(false);

	const doLogin = () => {
		if (code.length < 8) {
			setError(t('pages.login.errors.tooshort'));
		}
		else if (code.length > 8) {
			setError(t('pages.login.errors.toolong'));
		}
		else {
			login({code: code});
		}
	}

	useEffect(() => {
		if (!loginResponse.isLoaded) return;

		if (loginResponse.result.success) {
			const names = loginResponse.result.data.map(obj => obj.name);

			sessionStorage.setItem('names', names.join(';'));

			loginCallback(true);
		}
		else if (loginResponse.result.error){
			setError(t(loginResponse.result.error));
		}
	}, [loginResponse])

	return (
		<>	
			<div className={styles.loginBody} onSubmit={(e) => { e.preventDefault(); }}>
				<img className={styles.background} src={imageBackground} />
				<form action={null} className={styles.form}>
					<div className={styles.formCard}>
						<img src={imageLogo} className={styles.logo}/>
						<div className={styles.loginTitle}>{t('pages.login.title')}</div>
						<label htmlFor='logininput' className={styles.inputLabel} >{t('pages.login.codeinputlabel')}</label>
						<input className={styles.loginInput} 
							onFocus={() => setInputActive(true)} 
							onBlur={() => setInputActive(false)} 
							onChange={(e) => setCode(e.target.value)} 
							placeholder={!inputActive ? t('pages.login.codeinput') : ''} 
							autoCapitalize='None'
							autoCorrect='off' />

						{ error && <div className={styles.error}>{error}</div> }
						<Button className={styles.loginButton} onClick={doLogin} text={t('pages.login.login')} />
					</div>
				</form>
			</div>
		</>
	)
}

// Look into useContext