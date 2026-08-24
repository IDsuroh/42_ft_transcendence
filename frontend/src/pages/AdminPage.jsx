import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import {
  formatDate,
  getCategoryLabel,
  pendingRecipes,
} from '../data/siteData'

function AdminPage() {
  return (
    <div className="content-frame">
      <section className="page-hero">
        <p className="eyebrow">Admin page</p>
        <h1>Moderation dashboard for pending recipe requests.</h1>
        <p className="page-hero__lead">
          The page is intentionally simple: a list of pending submissions that
          link into a dedicated review screen, which matches the workflow from your notes.
        </p>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Pending list"
          title="Submissions waiting for moderation"
          description="Each card acts as a route into a more detailed review page with comment-box space for approval or denial feedback."
        />
        <div className="feature-grid">
          {pendingRecipes.map((recipe) => (
            <article key={recipe.slug} className="admin-card">
              <p className="eyebrow">Pending request</p>
              <h3>{recipe.title}</h3>
              <div className="card-meta-strip">
                <span>{recipe.author}</span>
                <span>{formatDate(recipe.submittedOn)}</span>
              </div>
              <p>{recipe.summary}</p>
              <div className="pill-list" style={{ marginTop: '18px' }}>
                {recipe.categories.map((category) => (
                  <span key={category} className="tag">
                    {getCategoryLabel(category)}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: '18px' }}>
                <Link className="button button--primary" to={`/admin/review/${recipe.slug}`}>
                  Review request
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminPage
