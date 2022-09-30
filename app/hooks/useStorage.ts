import { useEffect, useMemo, useRef, useState } from 'react'
import DefaultStorage, { IDefaultStorage } from '~/storage/default'

type TUseStorageReturn = {
	instance: IDefaultStorage | undefined
}
interface TUseStorage {
	(selected?: Date): TUseStorageReturn
}
export const useStorage: TUseStorage = function (selected) {
	const [render, rerender] = useState(-1)
	const [storage, setStorage] = useState<IDefaultStorage>()

	useEffect(() => {
		setStorage(new DefaultStorage())
	}, [])

	useEffect(() => {
		// listen to event changes
		if (!storage) return
		const eventName = storage._listen_to
		const renderCb = () => {
			rerender((ctr) => ++ctr)
		}
		addEventListener(eventName, renderCb)

		return () => {
			removeEventListener(eventName, renderCb)
		}
	}, [storage])

	return useMemo(
		() => ({
			instance: storage,
		}),
		[render, storage]
	)
}
