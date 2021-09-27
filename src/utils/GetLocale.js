export default function () {
	if (['it', 'it-CH'].some(locale => navigator.languages.includes(locale)))
		return 'italian'

	return 'english'
}