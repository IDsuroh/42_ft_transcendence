// import useState which lets the page remember/change a value/update the state to show what is going on
import { useState } from 'react'
import { getCookie } from '../utils/cookies'

// SignupPage UI Component
// This page is responsible only for creating a new user account.
function SignupPage()   {
    /*
        Calls React function 'useState' and initiates with empty strings.
        'state' means a value that React remembers for this component, React updates the screen when
        the value changes. Meaning that when we type something in the input, React saves it as a 'state'
        so that later on when we press the button to process that certain API, it brings that 'state'
        to the backend to process.

        use State(...) returns two things. #1 Current value and #2 the function that changes the value.

        The signup values are React-managed frontend values.
        It only lets React remember what the user typed before sending it to Django.
    */
    const [signupUsername, setSignupUsername] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [message, setMessage] = useState('No signup request sent yet.')

    // declared as async because there are some operations that don't finish immediately
    // async means that this function is allowed to use await inside and may contain 'Promises'
    async function signupUser()  {
        try {
            if (!signupUsername.trim()) {
                setMessage('Username is required.')
                return
            }

            if (!signupEmail.trim())    {
                setMessage('Email is required.')
                return
            }

            if (!signupPassword)    {
                setMessage('Password is required.')
                return
            }

            // Find Django CSRF token cookie and return the value
            const csrfToken = getCookie('csrftoken')

            /*
                await means do the fetch() function call and pause until the response is ready,
                then continue. fetch is a built-in browser function.

                This line sends a POST request to Django's signup endpoint.
                Signup is POST because we are asking Django to create a new user in the database.

                About Cookies:
                If login succeeds, Django creates/updates the session authentication and sends
                a sessionid cookie to the browser. The browser stores that cookie in its internal
                cookie storage.

                Later, when we check the current user or logout, the browser sends this sessionid
                cookie back to Django. Django uses that cookie to know which user/session is making
                the request.

                credentials: 'include' means this request can include/store cookies.
                X-CSRFToken is sent because signup is a POST request.
            */
            const response = await fetch('/api/users/signup/', {
                method: 'POST',
                credentials: 'include',
                // HTTP headers are extra information attached to the request.
                // Content-Type is needed for DRF to interpret the body correctly as JSON.
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                /*
                    JSON.stringify converts JavaScript object into JSON for the request
                    from React to Django.
                    Django cannot receive live JavaScript object directly.

                    This request sends:
                    username
                    email
                    password

                    Django receives this JSON and uses SignupSerializer to validate/create the user.
                */
                body: JSON.stringify({
                    username: signupUsername,
                    email: signupEmail,
                    password: signupPassword,
                }),
            })

            /*
                Read the response body and convert it from JSON text into a JavaScript object.
                This is for React to understand Django's response data.
                This is not the same object that we sent.
                It is Django's response result, usually user info or an error message
                Reading and converting the response body can also take time.
            */
            const data = await response.json()

            if (response.ok)    {
                setMessage(`Signed up as ${data.username} (${data.email})`)
            } else  {
                setMessage(
                    data.username?.[0] || // optional chaining: protects the code from crashing when the field doesn't exist
                    data.email?.[0] ||
                    data.password?.[0] ||
                    data.detail ||
                    'Signup failed.'
                )
            }
        } catch (error) {
            setMessage('Could not connect to backend.')
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
            <section className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-lg">
                <h1 className="text-3xl font-bold">Signup</h1>

                <p className="mt-4 text-slate-300">
                    Create a new Transcendence account.
                </p>

                <div className="mt-6 space-y-4">
                    <input
                        type="text"
                        value={signupUsername}
                        onChange={(event) => setSignupUsername(event.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                        placeholder="Username"
                    />

                    <input
                        type="email"
                        value={signupEmail}
                        onChange={(event) => setSignupEmail(event.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        value={signupPassword}
                        onChange={(event) => setSignupPassword(event.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                        placeholder="Password"
                    />

                    <button
                        onClick={signupUser}
                        className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold hover:bg-green-700"
                    >
                        Signup
                    </button>
                </div>

                <p className="mt-4 rounded-lg bg-slate-800 p-4 text-sm text-slate-300">
                    {message}
                </p>
            </section>
        </main>
    )
}

export default SignupPage

/*
    SignupPage.jsx is a React page/component.

    This page contains only the signup-related frontend logic:
    - signupUsername state
    - signupEmail state
    - signupPassword state
    - message state
    - signupUser() function
    - signup form JSX

    The export makes the SignupPage function available to other files.

    Later, App.jsx will import this page and React Router will show it when the URL is:

    /signup

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
    SignupPage.jsx className values get styled
*/