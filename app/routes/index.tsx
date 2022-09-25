import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import type { MetaFunction, LinksFunction } from '@remix-run/node'
import dayPickerStyles from 'react-day-picker/dist/style.css'
import root from '~/styles/day-picker.css'
import List, { Item, ItemData } from '~/components/List'
import WeekNumber from '~/components/WeekNumber'

export const meta: MetaFunction = () => ({
	title: 'git-think',
})

export const links: LinksFunction = () => [
	{
		rel: 'stylesheet',
		href: dayPickerStyles as unknown as string,
	},
	{
		rel: 'stylesheet',
		href: root,
	},
	{
		rel: 'stylesheet',
		href: 'https://use.fontawesome.com/releases/v5.7.0/css/all.css',
		crossOrigin: 'anonymous',
		integrity:
			'sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU',
	},
]

export default function Index() {
	const [selected, setSelected] = useState<Date>()
	const customComponents = {
		WeekNumber,
	}
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
				components={customComponents}
			/>
			<div className="m-4 text-green-800 bg-gray-900 px-3 pb-3 w-full rounded-lg py-4">
				<div className="container">
					<List>
						<Item time="8:00AM">
							<ItemData title="Grocery">buy lemons</ItemData>
						</Item>
						<Item time="7:00AM">
							<ItemData title="Other">wash the dishes</ItemData>
						</Item>
					</List>
				</div>
			</div>
		</div>
	)
}
