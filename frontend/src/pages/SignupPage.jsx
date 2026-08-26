import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthPageShell from '../components/AuthPageShell'

function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(
    'Frontend signup layout is ready. Django registration wiring comes after the UI pass.',
  )

  function handleSubmit(event) {
    event.preventDefault()

    if (!username.trim() || !email.trim() || !password) {
      setStatus('Username, email, and password are all required.')
      return
    }

    setStatus(
      'Signup form validated on the frontend. The next step is connecting it to Django account creation.',
    )
  }

  return (
    <AuthPageShell
      introEyebrow="Signup page"
      introTitle="Create a cooking profile worth coming back to."
      introDescription="The signup flow now uses the same shared header, footer, and typography as the rest of the frontend."
      bullets={[
        'Save favorites and profile-level recipe history.',
        'Submit recipes for moderation review later.',
        'Keep the page simple enough for fast backend hookup.',
      ]}
      formEyebrow="Register"
      formTitle="Create account"
      status={status}
    >
      <form className="field-list" onSubmit={handleSubmit} style={{ marginTop: '18px' }}>
        <div className="field">
          <label htmlFor="signup-username">Username</label>
          <input
            id="signup-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Your display name"
          />
        </div>

        <div className="field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="field">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
          />
        </div>

        <div className="auth-card__actions">
          <button type="submit" className="button button--primary">
            Create account
          </button>
          <Link className="button button--ghost" to="/login">
            Already registered?
          </Link>
        </div>
      </form>
    </AuthPageShell>
  )
}

export default SignupPage
