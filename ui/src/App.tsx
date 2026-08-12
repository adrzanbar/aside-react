import { Link, NavLink, Outlet, Route, Routes, useLocation } from 'react-router'
import './App.css'

function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Outlet />
    </>
  )
}

function Home() {
  return (
    <section id="center">
      <h1>Home</h1>
      <p>
        Routing works. Go to <Link to="/about">About</Link>.
      </p>
    </section>
  )
}

function About() {
  const location = useLocation()
  return (
    <section id="center">
      <h1>About</h1>
      <p>
        Current route: <code>{location.pathname}</code>
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </section>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
