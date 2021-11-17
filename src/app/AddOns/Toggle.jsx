import React, { useEffect, useState } from 'react'

import styles from './Toggle.scss'

export default function ({ disabled, value, onClick }) {
	const [togglePosition, setTogglePosition] = useState(value !== 'pending' ? value : null)

	const toggleOuterSize 	= {width: 64, height: 28}
	const toggleInfo 		= {width: toggleOuterSize.height - 6, height: toggleOuterSize.height - 6, margin: 3, borderRadius: toggleOuterSize.height / 2}

	const getToggleStyle = () => ({...toggleInfo, left: getToggleLeftOffset(togglePosition !== null && !disabled ? (togglePosition ? 'left' : 'right') : 'centre' )})

	const getToggleText = () => togglePosition === null ? '' : t(togglePosition ? 'utils.toggle.yes' : 'utils.toggle.no')

	const getToggleLeftOffset = (position) => {
		if (position === 'centre')
			return (toggleOuterSize.width / 2) - (toggleInfo.width / 2) - toggleInfo.margin
		else if (position === 'left')
			return 0
		else // position === 'right'
			return (toggleOuterSize.width - toggleInfo.width) - toggleInfo.margin * 2
	}

	const getClasses = (base) => {		
		if (disabled)
			return base + ' ' + styles.disabled
		if (togglePosition === null) 
			return base + ' ' + styles.center
		if (!togglePosition)
			return base + ' ' + styles.off
		if (togglePosition)
			return base + ' ' + styles.on
	}

	const toggle = () => setTogglePosition(!togglePosition)

	useEffect(() => { 
		if (togglePosition !== null)	
			onClick(togglePosition)
	}, [togglePosition])

	return (
		<>
			<div className={styles.toggle_container} style={{...toggleOuterSize}} onClick={toggle}>
				<div className={getClasses(styles.toggle_outer)} style={{...toggleOuterSize, borderRadius: '25px'}}>
					<div className={getClasses(styles.toggle_text)} >
						{getToggleText()}
					</div>

					<div className={getClasses(styles.toggle)} 
						style={getToggleStyle()} /> 

				</div>
			</div>
		</>
	)
}