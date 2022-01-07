import React from 'react'

import English from 'languages/English.json'
import Italian from 'languages/Italian.json'

export default function Translator(key) {
	let currentLanguage = document.cookie.split('; ').find(row => row.startsWith('ksweddingviewer_language=')).split('=')[1] || "english"

	const 	source 		= currentLanguage == "it-IT" ? Italian : English
	const 	sections 	= key.split('.')
	let 	result 		= source

	for (const section of sections) {
		if (!result[section]) {
			return key
		}
		result = result[section]
	}

	if (typeof result !== 'string')
		return key

	const parsedResult = parse(result)

	return typeof parsedResult === 'string' ? parsedResult : <>{parsedResult}</>
}

function parse(string) {
	if (string.search("{newline}") !== -1)
		string = create_newlines(string)

	string = create_links(string)

	return string
}

function create_newlines(string) {
	let pos
	let sub_string = string
	let new_string = []
	
	while ((pos = sub_string.search("{newline}")) !== -1) {
		new_string.push(sub_string.substring(0, pos))
		new_string.push([<br key={Math.random().toString()}/>, <br key={Math.random().toString()}/>])
		sub_string = sub_string.substring(pos + "{newline}".length, sub_string.length)
	}

	new_string.push(sub_string)

	return new_string
}

function create_links(string_list) {
	if (!Array.isArray(string_list)) return string_list

	return string_list.map(entry => {
		if (typeof(entry) !== 'string') return entry

		let pos
		let sub_string = entry
		let new_string = []
	
		while ((pos = sub_string.search("{link")) !== -1) {
			const end = sub_string.search("}")
	
			const for_regex = sub_string.substring(0, end + 1) 

			const link = for_regex.match("(?<={link to=')(.*)(?='\ text=)")
			const text = for_regex.match("(?<=text=')(.*)(?='})")
	
			new_string.push(sub_string.substring(0, pos))
			
			new_string.push(<a href={link[0]} key={Math.random().toString()}>{text[0]}</a>)
			sub_string = sub_string.substring(end + 1, sub_string.length)
		}

		new_string.push(sub_string)

		return new_string
	})
}

// export { Translator };