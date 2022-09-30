import { TGitThinkStorage } from '~/types/Abstracts'
import { TThinkData } from '~/types/git-think'

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
		const rawData = this._localStorage.getItem(this._key)
		if (!rawData) return []
		const data = DefaultStorage.parseData(rawData).data
		return data[this.constructKeyFromDate(selected)] ?? []
	}

	getAll() {
		return []
	}
	add() {}

	push(data: TThinkData, time: Date): void {
		const key = this.constructKeyFromDate(time)
		// initialize if no data
		const items = this.get(time)
		let rawData = this._localStorage.getItem(this._key)
		if (!rawData) {
			// initialize
			rawData = JSON.stringify({ data: {} })
		}
		const storageData = DefaultStorage.parseData(rawData)
		if (items.length === 0) {
			storageData.data[key] = [data]
		} else {
			storageData.data[key] = storageData.data[key].concat(data)
		}
		this._localStorage.setItem(this._key, JSON.stringify(storageData))
		this.rerender()
	}

	pull() {}

	rerender() {
		// dispatch custom change event
		dispatchEvent(new Event(this._listen_to))
	}
	static parseData(data: string): ReturnType<typeof JSON.parse> {
		try {
			// process the data
			const json = JSON.parse(data)
			return json
		} catch (e) {
			throw new Error('Data invalid.')
		}
	}

	private constructKeyFromDate(date: Date): string {
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
	}
}

export default DefaultStorage
