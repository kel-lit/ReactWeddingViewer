import English from 'languages/English.json';
import Italian from 'languages/Italian.json';

export default function Translator(key) {
	let currentLanguage = document.cookie.split('; ').find(row => row.startsWith('ksweddingviewer_language=')).split('=')[1] || "english";

	const 	source 		= currentLanguage == "english" ? English : Italian;
	const 	sections 	= key.split('.');
	let 	result 		= source;

	for (const section of sections) {
		if (!result[section]) {
			return key;
		}
		result = result[section];
	}

	return typeof result === 'string' ? result : key;
}

// export { Translator };