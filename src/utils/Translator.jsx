import React from 'react'

import English from 'languages/English.json'
import Italian from 'languages/Italian.json'

export default function Translator(key) {
	let currentLanguage = document.cookie.split('; ').find(row => row.startsWith('ksweddingviewer_language=')).split('=')[1] || "english"

	const 	source 		= currentLanguage == "it" ? Italian : English
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
	if (string.search("{newline}") === -1 && string.search("{link") === -1) return string 
	
	const new_string = []

	if (string.search("{newline}") !== -1)
		new_string.push(create_newlines(string))
	if (string.search("{link") !== -1)
		new_string.push(create_links([string]))

	return new_string
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
	
			const for_regex = sub_string.substring(pos, end + 1)

			const link_regex = /{link to='(\S*)' text='/gm
			const text_regex = /text='(.*)'/gm
			const blank_regex = /' (blank)}/gm

			const link_match = link_regex.exec(for_regex)
			const text_match = text_regex.exec(for_regex)
			const blank_match = blank_regex.exec(for_regex)
	
			new_string.push(sub_string.substring(0, pos))
			
			new_string.push(<a href={link_match?.[1] || ''} target={blank_match ? '_blank' : '_self'} key={Math.random().toString()}>{text_match?.[1] || ''}</a>)
			sub_string = sub_string.substring(end + 1, sub_string.length)
		}

		new_string.push(sub_string)

		return new_string
	})
}

// export { Translator };