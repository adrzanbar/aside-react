import { createMemoryRouter, type ActionFunctionArgs, type RouteObject } from 'react-router'
import { About, Home, Layout, RouteError } from './App'
import { callServer } from './gas'

export async function homeLoader() {
  return callServer<string>('hello')
}

export async function aboutAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = String(formData.get('name') ?? '').trim() || 'stranger'
  return { greeting: await callServer<string>('greet', name) }
}

const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: RouteError,
    children: [
      { index: true, Component: Home, loader: homeLoader },
      { path: 'about', Component: About, action: aboutAction },
    ],
  },
]

export const router = createMemoryRouter(routes, { initialEntries: ['/'] })
