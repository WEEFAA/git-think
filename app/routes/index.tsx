import { useCallback, useState, useReducer, Reducer } from 'react'
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker'
import type { MetaFunction, LinksFunction } from '@remix-run/node'
import dayPickerStyles from 'react-day-picker/dist/style.css'
import root from '~/styles/day-picker.css'
import List, { Item, ItemData } from '~/components/List'
import WeekNumber from '~/components/WeekNumber'
import { useStorage } from '~/hooks/useStorage'
import { format } from 'date-fns'

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

type TActionData = {
	title: string
	description: string
}

enum TActionEnum {
	SET,
	INIT,
}
type TActionProps = {
	payload: any
	type: TActionEnum
}
type IFormReducer = Reducer<TActionData, TActionProps>
const initialState = { title: '', description: '' }
const fieldReducer: IFormReducer = (prevState, action) => {
	switch (action.type) {
		case TActionEnum.SET: {
			const data = action.payload
			return {
				...prevState,
				[data.field]: data.value,
			}
		}
		case TActionEnum.INIT: {
			return initialState
		}
		default:
			return prevState
	}
}

export default function Index() {
	const [selected, setSelected] = useState<Date | undefined>(new Date())

	const [state, dispatch] = useReducer<IFormReducer>(fieldReducer, initialState)
	const storage = useStorage(selected)
	const customComponents = {
		WeekNumber,
	}

	const handleSelect: SelectSingleEventHandler = (e) => {
		setSelected(e)
	}

	const onClick = useCallback(
		function () {
			const now = new Date()
			const target = selected ?? now
			target.setHours(
				now.getHours(),
				now.getMinutes(),
				now.getSeconds()
			)
			storage?.instance?.push(
				{
					time: target.toISOString(),
					title: state.title,
					description: state.description,
				},
				target
			)
			dispatch({ type: TActionEnum.INIT, payload: null })
		},
		[selected, state, dispatch]
	)

	const handleInputChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		dispatch({
			type: TActionEnum.SET,
			payload: {
				field: e.target.name,
				value: e.target.value,
			},
		})
	}

	const items = storage.instance?.get(selected ?? new Date()) ?? []
	return (
		<div className="flex flex-no-wrap justify-between w-full">
			<DayPicker
				mode="single"
				selected={selected}
				onSelect={handleSelect}
				showOutsideDays
				fixedWeeks
				showWeekNumber
				className="drop-shadow-lg rounded-lg w-auto"
				components={customComponents}
			/>
			<div className="m-4 text-green-800 bg-gray-900 px-3 pb-3 w-full rounded-lg py-4">
				<div className="container">
					<List>
						{items.map((item, index) => (
							<Item key={index} time={format(new Date(item.time), "HH:mm")}>
								<ItemData title={item.title}>{item.description}</ItemData>
							</Item>
						))}
						<Item time="now" float={false} onClick={onClick}>
							<form action="#" className="w-full">
								<ItemData
									title={
										<input
											onChange={handleInputChange}
											value={state.title}
											name="title"
											type="text"
											placeholder="Groceries...?"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-1.5 py-1.2 mb-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>
									}
								>
									<textarea
										value={state.description}
										onChange={handleInputChange}
										name="description"
										placeholder="buy healthy, salad, ice cream...."
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
								</ItemData>
							</form>
						</Item>
					</List>
				</div>
			</div>
		</div>
	)
}
