import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Button } from 'utils/Buttons';
import useJsonApi from 'utils/useJsonApi';
import { UserContext } from '../../index';

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
		if (!loginResponse) return;

		if (loginResponse.result &&  loginResponse.result.success) {
			context.setGuestInfo(loginResponse.result)

			context.login();
		}
		else if (loginResponse.result && loginResponse.result.error){
			setError(t(loginResponse.result.error));
		}
	}, [loginResponse])

	return (
		<Router>
			<Redirect to='/'/>
			<div className={styles.login_body} onSubmit={(e) => { e.preventDefault(); }}>
				<form action={null} className={styles.form}>
					<div className={styles.heading}>
						<img src={imageLogo} className={styles.logo}/>	
						<div className={styles.heading_title}>
							{t('pages.login.title')}
						</div>
					</div>
					<div className={styles.background_container}>
						<img src={imageBackground} className={styles.background} />
					</div>
					<div className={styles.input_container}>
						<div className={styles.input_card}>
							<label htmlFor='logininput' className={styles.input_label} >{t('pages.login.codeinputlabel')}</label>
							<input className={styles.input} 
								onFocus={() => setInputActive(true)} 
								onBlur={() => setInputActive(false)} 
								onChange={(e) => setCode(e.target.value)} 
								placeholder={!inputActive ? t('pages.login.codeinput') : ''} 
								autoCapitalize='None'
								autoCorrect='off' />

							{ error && <div className={styles.error}>{error}</div> }
							<Button className={styles.button} onClick={doLogin} text={t('pages.login.login')} />
						</div>
					</div>
				</form>
			</div>
		</Router>
	)
}