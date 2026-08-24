import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  formatDate,
  getCategoryLabel,
  getPendingRecipeBySlug,
} from '../data/siteData'

function ReviewRequestPage() {
  const { slug } = useParams()
  const request = getPendingRecipeBySlug(slug)
  const [moderatorReply, setModeratorReply] = useState('')
  const [status, setStatus] = useState(
    'This review screen is ready for moderator notes. Approval and denial actions are still frontend placeholders.',
  )

  if (!request) {
    return (
      <div className="content-frame">
        <section className="page-hero not-found">
          <p className="eyebrow">Review request</p>
          <h1>That pending recipe request could not be found.</h1>
          <Link className="button button--primary" to="/admin">
            Back to admin page
          </Link>
        </section>
      </div>
    )
  }

  function handleModeration(action) {
    setStatus(
      `${action} recorded in the frontend preview. The reply box value is preserved so Django moderation endpoints can consume it later.`,
    )
  }

  return (
    <div className="content-frame">
      <section className="page-hero">
        <p className="eyebrow">Moderation detail</p>
        <h1>{request.title}</h1>
        <p className="page-hero__lead">{request.summary}</p>
        <div className="hero-stats">
          <span className="stat-pill">{request.author}</span>
          <span className="stat-pill">{formatDate(request.submittedOn)}</span>
          {request.categories.map((category) => (
            <span key={category} className="stat-pill">
              {getCategoryLabel(category)}
            </span>
          ))}
        </div>
      </section>

      <section className="page-section review-request__grid">
        <article className="review-card">
          <p className="eyebrow">Ingredients</p>
          <h3>Submission ingredients</h3>
          <ul className="ingredient-list">
            {request.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </article>

        <article className="review-card">
          <p className="eyebrow">Steps</p>
          <h3>Submission steps</h3>
          <ol className="step-list">
            {request.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="page-section moderation-grid">
        <article className="review-card">
          <p className="eyebrow">Moderator reply</p>
          <h3>Comment box for approval or denial</h3>
          <div className="field" style={{ marginTop: '18px' }}>
            <label htmlFor="moderator-reply">Reply to user</label>
            <textarea
              id="moderator-reply"
              rows="7"
              value={moderatorReply}
              onChange={(event) => setModeratorReply(event.target.value)}
              placeholder="Write the note that would be sent back if the recipe is denied or needs changes."
            />
          </div>
          <div className="review-request__actions" style={{ marginTop: '18px' }}>
            <button
              type="button"
              className="button button--primary"
              onClick={() => handleModeration('Approval')}
            >
              Approve recipe
            </button>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => handleModeration('Denial')}
            >
              Deny with note
            </button>
          </div>
        </article>

        <article className="review-card">
          <p className="eyebrow">Current state</p>
          <h3>Frontend moderation status</h3>
          <p className="status-banner" style={{ marginTop: '18px' }}>
            {status}
          </p>
          <div style={{ marginTop: '18px' }}>
            <Link className="button button--ghost" to="/admin">
              Back to dashboard
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}

export default ReviewRequestPage
