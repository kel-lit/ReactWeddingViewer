import React, { useEffect, useState } from 'react'

import styles from './TextArea.scss'

export default function (props) {
	const [active, setActive] 		= useState(false)
	const [content, setContent]		= useState(null)
	const [charCount, setCharCount] = useState(0)

	const { className, placeholder, maxLength, value, ...otherProps } = props

	useEffect(() => {
		props.getContent(content)
		setCharCount((content || "").length || 0)
	}, [content])

	return (
		<div className={styles.textarea_container}>
			<textarea 	className={styles.textarea + ' ' + className} 
						maxLength={maxLength} wrap={'off'} 
						placeholder={placeholder || ''} 
						onClick={() => setActive(true)} 
						onBlur={() => setActive(false)} 
						onChange={e => setContent(e.target.value)} 
						value={value || ''} />
			
			{ active &&
			<div className={styles.char_count}>
				{ charCount }/{maxLength}
			</div> }
		</div>
	)
}