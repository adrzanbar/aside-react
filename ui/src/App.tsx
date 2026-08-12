import {
  Form,
  Link,
  NavLink,
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigation,
  useRouteError,
} from 'react-router'
import type { aboutAction } from './routes.tsx'
import './App.css'

export function Layout() {
  const navigation = useNavigation()
  const isPending = navigation.state !== 'idle'
  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      {isPending && (
        <div className="loading">
          {navigation.state === 'submitting'
            ? 'Submitting...'
            : `Loading ${navigation.location?.pathname}...`}
        </div>
      )}
      <Outlet />
    </>
  )
}

export function Home() {
  const message = useLoaderData() as string
  return (
    <section id="center">
      <h1>Home</h1>
      <p>
        Backend says: <code>{message}</code>
      </p>
      <p>
        Routing works. Go to <Link to="/about">About</Link>.
      </p>
    </section>
  )
}

export function About() {
  const location = useLocation()
  const actionData = useActionData<typeof aboutAction>()
  const submitting = useNavigation().state === 'submitting'
  return (
    <section id="center">
      <h1>About</h1>
      <p>
        Current route: <code>{location.pathname}</code>
      </p>
      <Form method="post">
        <input name="name" placeholder="Your name" />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Greet'}
        </button>
      </Form>
      {actionData && (
        <p>
          <code>{actionData.greeting}</code>
        </p>
      )}
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </section>
  )
}

export function RouteError() {
  const error = useRouteError() as Error
  return (
    <section id="center">
      <h1>Error</h1>
      <p>
        <code>{error?.message ?? 'Something went wrong.'}</code>
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </section>
  )
}
