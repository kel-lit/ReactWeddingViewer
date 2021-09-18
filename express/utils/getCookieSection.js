module.exports = function getCookieSection(cookie, section, valueOnly = true) {
	const parts = cookie.split(';');

	for (let part of parts) {
		part = part.trim();

		if (part.startsWith(section))
			return valueOnly ? part.replace(section + '=', '') : part;
	}
}

