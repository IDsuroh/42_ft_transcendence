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

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <section className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-lg">
        <h1 className="text-3xl font-bold">Transcendence</h1>

        <p className="mt-4 text-slate-300">
          Frontend is running with React, Vite, and Tailwind CSS.
        </p>

        <button className="mt-6 w-full rounded-lg bg-purple-600 px-4 py-2 font-semibold hover:bg-purple-700">
          Test Button
        </button>
      </section>
    </main>
  )
}

export default App

/*
This is the main visible fronend page/component
This defines a JavaScript function named App and in React, a function that returns visible UI is called
Component.

App.jsx is using Tailwind classes but it doesn't need to import the CSS directly because it is loaded
'Globally'.

So how does this file know exactly to use Tailwind CSS?
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

Once CSS is loaded globally through main.jsx, any component can use those class names.

The return (...)
Returns the HTML-like UI that should appear on the screen.

The export makes the App function available to other files.

What is JSX (JavaScript XML) is a syntax React uses to describe what should appear on the page.
Write JSX (looks like HTML)
    ↓
Vite converts it
    ↓
Browser receives normal JavaScript
    ↓
Page appears
*/