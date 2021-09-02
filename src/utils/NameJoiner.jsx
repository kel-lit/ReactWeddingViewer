export default function formatNames(names) {
	let 	nameString 	= '';

	names.forEach((name, index) => {
		nameString += name;

		if (index < names.length - 2) {
			nameString += ', '
		}
		else if (index < names.length - 1) {
			nameString += ' & '
		}
	})

	return nameString;
}