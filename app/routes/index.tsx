import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import type { MetaFunction, LinksFunction } from '@remix-run/node'
import dayPickerStyles from 'react-day-picker/dist/style.css'
import root from '~/styles/day-picker.css'
import { Container } from '~/components/Container'

export const meta: MetaFunction = () => ({
	title: 'git-think',
})

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: dayPickerStyles as unknown as string },
	{ rel: 'stylesheet', href: root },
]

export default function Index() {
	const [selected, setSelected] = useState<Date>()

	let footer = <p>Please pick a day.</p>
	if (selected) {
		footer = <p>You picked {format(selected, 'PP')}.</p>
	}

	return (
		<Container>
			<DayPicker
				mode="single"
				selected={selected}
				onSelect={setSelected}
				footer={footer}
				showOutsideDays
				fixedWeeks
				showWeekNumber
			/>
		</Container>
	)
}
