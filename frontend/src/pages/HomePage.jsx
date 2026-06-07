// import useState which lets the page remember/change a value/update the state to show what is going on
import { useState } from 'react'
import { getCookie } from '../utils/cookies'

// HomePage UI Component
// This page is responsible for checking the current logged-in user and logging out.
function HomePage() {
    /*
        message is React-managed frontend state.

        It stores the current status message shown on the page:
        - No request sent yet.
        - Current user: ...
        - Logged out successfully.
        - Not logged in.
        - Already logged out.
    */
    const [message, setMessage] = useState('No request sent yet.')

    // This function asks Django: "Who is the currently logged-in user?"
    async function checkCurrentUser()   {
        try {
            /*
                This sends a GET request to Django's /me/ endpoint.

                GET is used because we are only reading/checking information.
                We are not creating/changing/deleting anything.

                credentials: 'include' means the browser sends the sessionid cookie if it has one.
                Django uses that sessionid cookie to recognize the logged-in user.

                We do not need X-CSRFToken here because this is a GET request.
                CSRF protection is mainly needed for unsafe/changing requests like POST.
            */
            const response = await fetch('http://localhost:8000/api/users/me/', {
                method: 'GET',
                credentials: 'include',
            })

            /*
                Read Django's JSON response and convert it into a JavaScript object so React can use
                data.username, data.email, or data.detail.
            */
            const data = await response.json()

            if (response.ok)    {
                setMessage(`Current user: ${data.username} (${data.email})`)
            } else  {
                /*
                    When nobody is logged in, Django REST Framework returns:
                    {"detail": "Authentication credentials were not provided."}

                    That message is technically correct, but not user-friendly.
                    So we translate it into "Not logged in."
                */
                if (data.detail === 'Authentication credentials were not provided.')    {
                    setMessage('Not logged in.')
                } else  {
                    setMessage(data.detail || 'Not logged in.')
                }
            }
        } catch (error) {
            setMessage('Could not connect to backend.')
        }
    }

    // This function asks Django to destroy the current logged-in session.
    async function logoutUser() {
        try {
            const csrfToken = getCookie('csrftoken')    // Find Django's CSRF token cookie and return the value

            /*
                This sends a POST request to Django's logout endpoint.

                Logout is POST because it changes the authentication/session state.
                It destroys the current session.

                credentials: 'include' is needed because Django needs the sessionid cookie to know which
                session should be logged out.

                X-CSRFToken is needed because logout is a POST request.

                We do not need Content-Type: application/json here because logout sends no JSON body.
            */
            const response = await fetch('http://localhost:8000/api/users/logout/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            })

            const data = await response.json()

            if (response.ok)    {
                /*
                    The backend LogoutView returns:
                    {"message": "Logged out successfully."}

                    So the frontend reads data.message.
                */
                setMessage(data.message || 'Logged out.')
            } else  {
                /*
                    If the user clicks Logout while already logged out, Django returns the authentication
                    error. We translate that into a nicer frontend message.
                */
                if (data.detail === 'Authentication credentials were not provided.')    {
                    setMessage('Already logged out.')
                } else  {
                    setMessage(data.detail || data.message || 'Logout failed.')
                }
            }
        } catch (error) {
            setMessage('Could not connect to backend.')
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
            <section className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-lg">
                <h1 className="text-3xl font-bold">Home</h1>

                <p className="mt-4 text-slate-300">
                    Check your current session or log out.
                </p>

                <div className="mt-6 space-y-4">
                    <button
                        onClick={checkCurrentUser}
                        className="w-full rounded-lg bg-slate-700 px-4 py-2 font-semibold hover:bg-slate-600"
                    >
                        Check Current User
                    </button>

                    <button
                        onClick={logoutUser}
                        className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                <p className="mt-4 rounded-lg bg-slate-800 p-4 text-sm text-slate-300">
                    {message}
                </p>
            </section>
        </main>
    )
}

export default HomePage

/*
HomePage.jsx is a React page/component.

This page contains only the current-user/logout-related frontend logic:
- message state
- checkCurrentUser() function
- logoutUser() function
- Check Current User button
- Logout button

The export makes the HomePage function available to other files.

Later, App.jsx will import this page and React Router will show it when the URL is:

/home

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
HomePage.jsx className values get styled
*/