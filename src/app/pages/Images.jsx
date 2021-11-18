import React from 'react'
import PageLayout, { PageHeading, PageContent, PageDivider } from '../AddOns/PageLayout'

export default function(props) {
	return (
		<PageLayout>
			<PageHeading value={t('pages.images.title')} />

			<PageDivider />

			<PageContent>
				{t('pages.images.maincontent')}
			</PageContent>
		</PageLayout>
	)
}