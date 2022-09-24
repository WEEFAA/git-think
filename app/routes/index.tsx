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

	let footer = <p>Please pick a day.</p>
	if (selected) {
		footer = <p>You picked {format(selected, 'PP')}.</p>
	}

	return (
		<div className="flex flex-no-wrap justify-between">
			<DayPicker
				mode="single"
				selected={selected}
				onSelect={setSelected}
				footer={footer}
				showOutsideDays
				fixedWeeks
				showWeekNumber
				className="bg-slate-800 dark:bg-white drop-shadow-lg rounded-lg w-auto border-double border-2 outline-offset-2 outline-pink-500"
			/>
			<div className="bg-white w-full my-4 drop-shadow-lg rounded-lg border-double border-2 outline-offset-2 outline-pink-500">
				test
			</div>
		</div>
	)
}
