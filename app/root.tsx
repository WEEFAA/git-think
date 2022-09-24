import rootStyles from '~/styles/root.css'
import tailwindCss from '~/styles/tailwind.css'
import type { MetaFunction, LinksFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: tailwindCss },
	{ rel: 'stylesheet', href: rootStyles },
]

export default function App() {
	return (
		<html lang="en" className="dark font-mono">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="container bg-white dark:bg-slate-800">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
