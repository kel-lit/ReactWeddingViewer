import React from 'react'
import PageLayout, { PageHeading, PageContent, PageDivider } from '../AddOns/PageLayout'

export default function(props) {
	return (
		<PageLayout>
			<PageHeading value={'Information'} />

			<PageDivider />

			<PageContent value={
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, quidem adipisci ullam facere sapiente ipsam nesciunt harum? Exercitationem nostrum sapiente temporibus similique quisquam ad voluptatibus cumque quos tenetur. Alias, rem.'
			} />

		</PageLayout>
	)
}