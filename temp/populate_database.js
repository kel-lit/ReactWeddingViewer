const initDb = require("../express/database/database").initDb
const getDb = require("../express/database/database").getDb
const guests = require("./guests2.json")

used_codes = []

guests_and_token = []

async function populate(_db) {
	dayGuests = guests.allDay
	evening = guests.evening

	
	toAddDay = get_list(dayGuests, true)
	toAddEvening = get_list(evening, false)
	toAddAll = toAddDay.concat(toAddEvening)
	
	const users = _db.collection("users")

	response = await users.insertMany(toAddAll)
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
	chars = ["-", "+", "@", "?"]

	all = lowercase.concat(uppercase).concat(nums).concat(chars)

	generate_token = () => {
		token = ""

		for (let i = 0; i < 10; i++) {
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

async function update_token(db_) {
	users = db_.collection('users')
}

initDb(async (err, _db) => {
	if (err) throw err

	await populate(_db)

	process.exit()
})

