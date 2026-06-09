/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
*/

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

// App UI Component
// App.jsx is not the frontend router/layout file.
// It decides which page component appears depending on the browser URL.
function App()  {
  return (
    <BrowserRouter>
      <nav className="bg-slate-950 p-4 text-white flex gap-4">
        <Link
          to="/signup"
          className="rounded-lg bg-green-600 px-4 py-2 font-semibold hover:bg-green-700"
        >
          Signup
        </Link>

        <Link
          to="/login"
          className="rounded-lg bg-purple-600 px-4 py-2 font-semibold hover:bg-purple-700"
        >
          Login
        </Link>

        <Link
          to="/home"
          className="rounded-lg bg-slate-700 px-4 py-2 font-semibold hover:bg-slate-600"
        >
          Home
        </Link>

        <Link
          to="/privacy"
          className="rounded-lg bg-slate-700 px-4 py-2 font-semibold hover:bg-slate-600"
        >
          Privacy
        </Link>

        <Link
          to="/terms"
          className="rounded-lg bg-slate-700 px-4 py-2 font-semibold hover:bg-slate-600"
        >
          Terms
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

/*
App.jsx is the main frontend component loaded by main.jsx.

Before refactoring, App.jsx contained every form/function:
- signup
- login
- logout
- check current user

Now App.jsx only controls frontend routing/navigation.

BrowserRouter
= enables React Router in the browser.

Routes
= contains all frontend route rules.

Route
= connects one frontend URL path to one React page/component.

Link
= React Router link used to move to another frontend page without manually refreshing.

Current frontend routes:
  /       → redirects to /home
  /signup → SignupPage
  /login  → LoginPage
  /home   → HomePage

This does not change Django backend routes.
This only controls which React page appears in the browser.

Backend API routes still stay the same:
  POST /api/users/signup/
  POST /api/users/login/
  GET  /api/users/me/
  POST /api/users/logout/

This file can use Tailwind classes because Tailwind is loaded globally:

main.jsx imports index.css
    ↓
index.css imports Tailwind
    ↓
Vite sees Tailwind because vite.config.js has tailwindcss()
    ↓
Vite processes the Tailwind classes
    ↓
Browser receives real CSS
    ↓
App.jsx className values get styled
*/