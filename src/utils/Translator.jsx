import English from '../languages/English.json';
import Italian from '../languages/Italian.json';

export default function t(key) {
	let currentLanguage = document.cookie.split('; ').find(row => row.startsWith('language=')).split('=')[1];

	if (!currentLanguage) return key;

	const 	source 		= currentLanguage == "english" ? English : Italian;
	const 	sections 	= key.split('.');
	let 	result 		= source;

	sections.forEach(section => {
		result = result[section];
	})

	return result ? result : key;
}