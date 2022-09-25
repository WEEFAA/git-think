import { TGitThinkStorage } from '~/types/Abstracts'
import { TThinkData } from '~/types/git-think'

type TUseStorageReturn = {
	_store: TGitThinkStorage,
	items: Array<TThinkData>
}
interface TUseStorage {
	(storage: TGitThinkStorage, selected?: Date): TUseStorageReturn
}
export const useStorage: TUseStorage = function (storage, selected) {
	
	return {
		_store: storage,
		items: storage.get(selected ?? new Date())
	}
}
