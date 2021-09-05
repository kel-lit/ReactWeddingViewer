import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Button } from 'utils/Buttons';
import useJsonApi from 'utils/useJsonApi';
import {Translator as t} from 'utils/Translator';
import UserProfile from 'utils/UserProfile';
import { UserContext } from '../index';

import styles from './Login.scss';

import imageLogo from 'images/logo.png';
import imageBackground from 'images/login-back.jpg';

export default function Login(props) {
	const [loginResponse, loginLoading, loginError, login] = useJsonApi('/api/login');

	const [code, setCode] 				= useState('');
	const [error, setError] 			= useState(null);
	const [inputActive, setInputActive] = useState(false);

	const context = useContext(UserContext);

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
			context.setGuests(loginResponse.result.data.map(obj => obj.name));

			context.login();
		}
		else if (loginResponse.result.error){
			setError(t(loginResponse.result.error));
		}
	}, [loginResponse])

	return (
		<Router>
			<Redirect to='/'/>
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
		</Router>
	)
}

// Look into useContext 