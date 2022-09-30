import { ReactNode } from 'react'

const List: React.FC<React.PropsWithChildren> = function (props) {
	return <ul className="flex flex-col">{props.children}</ul>
}

export type TItem = {
	time: string
	children?: React.ReactNode
	float?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}
export const Item: React.FC<TItem> = function (props) {
	let containerClass =
		'transition duration-500 shadow ease-in-out transform hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'
	if (props.float) {
		containerClass += ' hover:-translate-y-1'
	}

	return (
		<li className="border-gray-400 flex flex-row mb-2">
			<div className={containerClass}>
				<div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
					<a href="#" className="block relative">
						<svg
							className="mx-auto object-cover rounded-full h-10 w-10 fill-green-900"
							width="24px"
							height="24px"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							data-name="Layer 1"
						>
							<path d="M6,6A2,2,0,0,1,8,4,1,1,0,0,0,8,2,4,4,0,0,0,4,6V9a2,2,0,0,1-2,2,1,1,0,0,0,0,2,2,2,0,0,1,2,2v3a4,4,0,0,0,4,4,1,1,0,0,0,0-2,2,2,0,0,1-2-2V15a4,4,0,0,0-1.38-3A4,4,0,0,0,6,9Zm16,5a2,2,0,0,1-2-2V6a4,4,0,0,0-4-4,1,1,0,0,0,0,2,2,2,0,0,1,2,2V9a4,4,0,0,0,1.38,3A4,4,0,0,0,18,15v3a2,2,0,0,1-2,2,1,1,0,0,0,0,2,4,4,0,0,0,4-4V15a2,2,0,0,1,2-2,1,1,0,0,0,0-2Z" />
						</svg>
					</a>
				</div>
				{props.children}
				<div className="text-gray-600 dark:text-gray-200 text-xs">
					{props.time}
				</div>
				<button
					className="w-24 text-right flex justify-end"
					onClick={props.onClick}
				>
					<svg
						width="12"
						fill="currentColor"
						height="12"
						className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
						viewBox="0 0 1792 1792"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
					</svg>
				</button>
			</div>
		</li>
	)
}

Item.defaultProps = {
	float: true,
}

export type TItemData = React.PropsWithChildren<{
	title?: ReactNode
}>

export const ItemData: React.FC<TItemData> = function ({
	children,
	title,
	...props
}) {
	return (
		<div className="flex-1 pl-1 md:mr-16">
			<div className="font-medium dark:text-white">{title}</div>
			<div className="text-gray-600 dark:text-gray-200 text-sm">{children}</div>
		</div>
	)
}

export default List
