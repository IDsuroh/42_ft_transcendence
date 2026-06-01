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

// import useState which lets the page remember/change a value/update the state to show what is going on
import { useState } from 'react'

// App UI Component (a function that returns JSX) App = the main frontend page function
function App() {
  /*
    Calls React function 'useState' and initiate with 'No request sent yet.'
    'state' means a value that React remembers for this component, React updates the screen when value
    changes.
    useState(...) returns two things. #1 Current value and #2 the function that changes the value
    In our case, it returns message and function setMessage.
    We save it this way because we create message in a React-managed way and not as a normal independent
    JavaScript variable. (React automatically knows and updates messages to display as a state variable)
  */
  const [message, setMessage] = useState('No request sent yet.')
  // input email and password and it updates the state real fast
  const [email, setEmail] = useState('player1@example.com')
  const [password, setPassword] = useState('VeryStrongPassword123!')

  // declared as async because there are some operations that doesn't finish immediately
  // async means that this function is allowed to use await inside and may contain Promises
  async function loginUser()  {
    try {
      /* await means do the fetch() function call and pause until the response is ready, then continue
      fetch is a built-in browser function
      This line of code send the HTTP request with GET to ask credentials of the account
      and include the session cookie that was given at login */
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        credentials: 'include',
        // HTTP headers are extra information attached to the request
        // its needed for the DRF to interpret the body correctly
        headers: {
          'Content-Type': 'application/json',
        },
        // JSON.stringify converts JavaScript object into JSON for the request from React go to Django
        // Django cannot receive live JavaScript object directly
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      /* Read the response body and convert it from JSON text into a JavaScript object.
      It's for React to understand the data that is parsed
      Reading and converting the response body can also take time */
      const data = await response.json()

      if (response.ok)  {
        setMessage(`Logged in as ${data.username} (${data.email})`)
      } else {
        // The value in the index [0] stored under the key non_field_errors with optional chaining
        // If data.non_field_errors exists, get first item
        // If data.non_field_errors doesn't exist, return undefined
        setMessage(data.non_field_errors?.[0] || 'Login failed.')
      }
    } catch (error) {
      setMessage('Could not connect to backend.')
    }
  }

  async function checkCurrentUser() {
    try {
      const response = await fetch('http://localhost:8000/api/users/me/', {
        method: 'GET',
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Current user: ${data.username} (${data.email})`)
      } else {
        setMessage(data.detail || 'Not logged in.')
      }
    } catch (error) {
      setMessage('Could not connect to backend.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <section className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-lg">
        <h1 className="text-3xl font-bold">Transcendence</h1>

        <p className="mt-4 text-slate-300">
          Frontend is running with React, Vite, and Tailwind CSS.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            placeholder="Password"
          />

          <button
            onClick={loginUser}
            className="w-full rounded-lg bg-purple-600 px-4 py-2 font-semibold hover:bg-purple-700"
          >
            Login
          </button>

          <button 
            onClick={checkCurrentUser}
            className="w-full rounded-lg bg-slate-700 px-4 py-2 font-semibold hover:bg-slate-600"
          >
            Check Current User
          </button>
        </div>

        <p className="mt-4 rounded-lg bg-slate-800 p-4 text-sm text-slate-300">
          {message}
        </p>
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

When we click the button, the browser sends a request to the Django backend:
GET http://localhost:8000/api/users/me/
Then Django responds with JSON
Then React changes the text on the page based on the response

The return (...)
Returns the HTML-like UI that should appear on the screen.

The export makes the App function available to other files.

What is JSX (JavaScript XML) is a syntax React uses to describe what should appear on the page.
Write JSX (HTML-looking syntax written inside JavaScript.)
    ↓
Vite converts it
    ↓
Browser receives normal JavaScript
    ↓
Page appears
*/