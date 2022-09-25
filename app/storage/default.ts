import { TGitThinkStorage } from '~/types/Abstracts'

class DefaultStorage implements TGitThinkStorage {
	constructor() {}
	get(selected: Date) {
		return [
			{ time: "8:00 PM", title: "Grocery", description: "buy foods"}
		]
	}
	getAll() {
		return []
	}
	add() {}
	push() {}
	pull() {}
}

export default DefaultStorage
