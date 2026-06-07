// import useState which lets the page remember/change a value/update the state to show what is going on
import { useState } from 'react'
import { getCookie } from '../utils/cookies'

// LoginPage UI Component
// This page is responsible only for logging in an existing user.
function LoginPage()    {
    /*
        Calls React function 'useState' and initiates with empty strings.
        'state' means a value that React remembers for this component, React updates the screen when
        the value changes. Meaning that when we type something in the input, React saves it as a 'state'
        so that later on when we press the button to process that certain API, it brings that 'state'
        to the backend to process.

        useState(...) returns two things. #1 Current value and #2 the function that changes the value.

        The login values are React-managed frontend values.
        They only let React remember what the user typed before sending it to Django.
    */
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [message, setMessage] = useState('No login request sent yet.')

   // declared as async because there are some operations that don't finish immediately
   // async means that this function is allowed to use await inside and may contain 'Promises'
   async function loginUser()   {
    try {
        const csrfToken = getCookie('csrftoken')    // Find Django's CSRF token cookie and return

        /*
            await means do the fetch() function call and pause until the response is ready, then continue.
            fetch is a built-in browser function.

            This line sends a POST request to Django's login endpoint.
            Login is POST because we are sending email/password and asking Django to create a login session.

            About Cookies:
            If login succeeds, Django creates/updates the session authentication and sends a sessionid cookie
            to the browser. The browser stores that cookie in its internal cookie storage.

            Later, when we check the current user or log out, the browser sends this sessionid cookie back to
            Django. Django uses that cookie to know which user/session is making the request.

            credentials: 'include' means this request can include/store cookies.
            X-CSRFToken is sent because login is a POST request.
        */
        const response = await fetch('http://localhost:8000/api/users/login/', {
            method: 'POST',
            credentials: 'include', // include cookies in the request itself
            // HTTP headers are extra information attached to the request
            // Content-Type is needed for DRF to interpret the body correctly as JSON.
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            /*
                JSON.stringify converts JavaScript object into JSON for the request from React to Django.
                Django cannot receive live JavaScript object directly.

                This request sends:
                email
                password

                Django receives this JSON and uses LoginSerializer to validate the credentials.
            */
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })

        /*
            Read the response body and convert it from JSON text into a JavaScript object.
            This is for React to understand Django's response data.
            This is not the same object we sent.
            It is Django's response result, usually user info or an error message.
            Reading and converting the response body can also take time.
        */
        const data = await response.json()

        if (response.ok)    {
            setMessage(`Logged in as ${data.username} (${data.email})`)
        } else  {
            // The value in index[0] stored under the key non_field_errors with optional chaining.
            // If data.non_field_errors exists, get first item.
            // If data.non_field_errors doesn't exist, return undefined and move to the next fallback.
            setMessage(data.non_field_errors?.[0] || data.detail || 'Login failed.')
        }
    } catch (error) {
        setMessage('Could not connect to backend.')
    }
   }

   return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <section className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-lg">
            <h1 className="text-3xl font-bold">Login</h1>

            <p className="mt-4 text-slate-300">
                Log in to your Transcendence account.
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
            </div>

            <p className="mt-4 rounded-lg bg-slate-800 p-4 text-sm text-slate-300">
                {message}
            </p>
        </section>
    </main>
   )
}

export default LoginPage

/*
LoginPage.jsx is a React page/component.

This page contains only the login-related frontend logic:
- email state
- password state
- message state
- loginUser() function
- login form JSX

The export makes the LoginPage function available to other files.

Later, App.jsx will import this page and React Router will show it when the URL is:

/login

What is JSX (JavaScript XML)?
JSX is a syntax React uses to describe what should appear on the page.
Write JSX (HTML-looking syntax written inside JavaScript.)
    ↓
Vite converts it
    ↓
Browser receives normal JavaScript
    ↓
Page appears

This page can use Tailwind classes because Tailwind is loaded globally:

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
LoginPage.jsx className values get styled
*/