import rootStyles from '~/styles/root.css'
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
	{ rel: 'stylesheet', href: rootStyles },
]

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
				{typeof document === 'undefined' ? '__STYLES__' : null}
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
