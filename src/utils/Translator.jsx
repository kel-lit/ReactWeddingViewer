import English from 'languages/English.json';
import Italian from 'languages/Italian.json';

function Translator(key) {
	let currentLanguage = document.cookie.split('; ').find(row => row.startsWith('language=')).split('=')[1];

	if (!currentLanguage) return key;

	const 	source 		= currentLanguage == "english" ? English : Italian;
	const 	sections 	= key.split('.');
	let 	result 		= source;

	sections.forEach(section => {
		if (!result[section]) {
			return key;
		}
		result = result[section];
	})

	return result ? result : key;
}

export { Translator };