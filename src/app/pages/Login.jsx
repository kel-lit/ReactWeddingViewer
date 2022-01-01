import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Button } from 'utils/Buttons';
import useJsonApi from 'utils/useJsonApi';
import { UserContext } from '../../index';
import MessageHandler from 'utils/MessageHandler';

import styles from './Login.scss';

import imageLogo from 'images/logo.png';

export default function Login(props) {
	const [loginResponse, loginLoading, loginError, login] = useJsonApi('/api/login');

	const [code, setCode] 				= useState('')

	const [message, setMessage]			= useState(null)

	const [inputActive, setInputActive] = useState(false);

	const context = useContext(UserContext);

	const doLogin = () => {
		if (code.length < 10) {
			setMessage({title: t('common.error'), message: t('pages.login.errors.tooshort'), type: 'error'});
		}
		else if (code.length > 10) {
			setMessage({title: t('common.error'), message: t('pages.login.errors.toolong'), type: 'error'});
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
			setMessage({title: t('common.error'), message: t(loginResponse.result.error), type: 'error'});
		}


	}, [loginResponse])

	return (
		<Router>
			<Redirect to='/'/>
			<div className={styles.login_body} onSubmit={(e) => { e.preventDefault(); }}>
				<form action={null} className={styles.form} noValidate>
					<div className={styles.heading}>
						<img src={imageLogo} className={styles.logo}/>	
						<div className={styles.heading_title}>
							{t('pages.login.title')}
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.input_card}>
							<input className={styles.input} 
								onFocus={() => setInputActive(true)} 
								onBlur={() => setInputActive(false)} 
								onChange={(e) => setCode(e.target.value)} 
								placeholder={!inputActive ? t('pages.login.codeinputlabel') : ''}
								type='email' />

							<Button className={styles.button} onClick={doLogin} text={t('pages.login.login')} />
						</div>
					</div>
				</form>

				<MessageHandler message={message || {}} close={() => setMessage(null)} />
			</div>
		</Router>
	)
}