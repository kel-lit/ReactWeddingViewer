var UserProfile = (() => {
	var names = [];

	var getNames = () => {
		return names;
	}
	
	var setNames = (names) => {
		names = names;
	}

	return {
		getNames: getNames,
		setNames: setNames
	}
})

export default UserProfile;