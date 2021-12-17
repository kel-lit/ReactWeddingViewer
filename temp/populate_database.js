const initDb = require("../express/database/database").initDb
const getDb = require("../express/database/database").getDb
const guests = require("./guests.json")

used_codes = []

guests_and_token = []

function populate() {
	dayGuests = guests.allDay
	evening = guests.evening

	toAddDay = get_list(dayGuests, true)
	toAddEvening = get_list(evening, false)

	const users = getDb().collection("users")

	console.log(users)
}

function get_list(guests, isDayGuest) {
	return guests.map(names => {
		guestInfo = names.map(name => {
			return {
				name: name,
				isAttending: "pending",
				isVegetarian: false,
				isDayGuest: isDayGuest
			}
		})

		return {
			code: generate_code(names),
			guests: guestInfo,
			foodNotes: "",
			songRequests: ""
		}
	})
}

function generate_code(names) {
	lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
			"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
	uppercase = lowercase.map(letter => letter.toUpperCase())
	nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

	all = lowercase.concat(uppercase).concat(nums)

	generate_token = () => {
		token = ""

		for (let i = 0; i < 8; i++) {
			token += all[Math.floor(Math.random() * all.length)]
		}

		return token
	}

	token = generate_token()

	while (used_codes.includes(token))
		token = generate_token()

	guests_and_token.push({guests: names, token: token})
	
	return token
}

initDb((err, db_) => {
	console.log("Hello")


	if (err) console.log(err)
	else console.log(db_)
})

populate()

//generate_code()

console.log(guests_and_token)