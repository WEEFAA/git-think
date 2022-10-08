import { TGitThinkStorage } from '~/types/Abstracts'
import { TThinkData } from '~/types/git-think'
import { TDefaultJSONData } from './types'

type TDefaultStorage = {
	readonly _listen_to: string
	_localStorage: Storage
	readonly _key: string
}

export type IDefaultStorage = TGitThinkStorage & TDefaultStorage

class DefaultStorage implements IDefaultStorage {
	_localStorage: Storage
	readonly _key: string
	readonly _listen_to: string = '__git_store_localStorage_render'

	constructor(storeKey?: string) {
		this._localStorage = localStorage
		this._key = storeKey ?? '__git_think'
	}

	get(selected: Date): TThinkData[] {
		const rawData = this._localStorage.getItem(
			this.constructKeyFromDate(selected)
		)
		if (!rawData) return []
		// get actual git think items
		const gitThinkItems =
			DefaultStorage.parseData<TDefaultJSONData>(rawData)?.data
		return gitThinkItems ?? []
	}

	getAll() {
		return []
	}
	add() {}

	push(data: TThinkData, time: Date): void {
		const key = this.constructKeyFromDate(time)
		// get previous data
		let previousItems = this.get(time)
		let storageItem: TDefaultJSONData = {
			data: previousItems,
		}
		// add new data
		storageItem.data.push(data)
		this._localStorage.setItem(key, JSON.stringify(storageItem))
		this.rerender()
	}

	pull() {}

	rerender() {
		// dispatch custom change event
		dispatchEvent(new Event(this._listen_to))
	}
	static parseData<T = ReturnType<typeof JSON.parse>>(
		data: string
	): T | undefined {
		try {
			// process the data
			const json = JSON.parse(data)
			return json
		} catch (e) {
			throw new Error('Data invalid.')
		}
	}

	private constructKeyFromDate(date: Date): string {
		const datePart = `${
			date.getMonth() + 1
		}/${date.getDate()}/${date.getFullYear()}`
		return `${this._key}:${datePart}`
	}
}

export default DefaultStorage
