import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import type { MetaFunction, LinksFunction } from '@remix-run/node'
import dayPickerStyles from 'react-day-picker/dist/style.css'
import root from '~/styles/day-picker.css'

export const meta: MetaFunction = () => ({
	title: 'git-think',
})

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: dayPickerStyles as unknown as string },
	{ rel: 'stylesheet', href: root },
]

export default function Index() {
	const [selected, setSelected] = useState<Date>()
	return (
		<div className="flex flex-no-wrap justify-between w-full">
			<DayPicker
				mode="single"
				selected={selected}
				onSelect={setSelected}
				showOutsideDays
				fixedWeeks
				showWeekNumber
				className="drop-shadow-lg rounded-lg w-auto"
			/>
			<div className="m-4 text-green-800 bg-gray-900 px-3 pb-3 w-full rounded-lg">test</div>
		</div>
	)
}
