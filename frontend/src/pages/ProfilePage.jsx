import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import SectionTitle from '../components/SectionTitle'
import {
  formatDate,
  getFavoriteRecipes,
  getProfileRecipes,
  profilePreview,
} from '../data/siteData'

function ProfilePage() {
  const yourRecipes = getProfileRecipes()
  const favoriteRecipes = getFavoriteRecipes()

  return (
    <div className="content-frame">
      <section className="page-hero">
        <p className="eyebrow">Profile page</p>
        <h1>{profilePreview.name}</h1>
        <p className="page-hero__lead">
          {profilePreview.role}. {profilePreview.bio}
        </p>
        <div className="hero-stats">
          <span className="stat-pill">Profile preview for frontend planning</span>
          <span className="stat-pill">{profilePreview.draftRecipes.length} pending request</span>
          {profilePreview.isAdmin ? <span className="stat-pill">Admin access enabled</span> : null}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Your recipes"
          title="Last recipes published from this profile"
          description="The document asked for the last five and a see-more path. This preview shows the card system and leaves room for a deeper archive later."
          action={
            <Link className="button button--ghost" to="/category/main">
              See more
            </Link>
          }
        />
        <div className="feature-grid">
          {yourRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} variant="compact" />
          ))}
        </div>
      </section>

      <section className="page-section profile-grid">
        <article className="detail-panel">
          <p className="eyebrow">Favourites</p>
          <h3>Saved for later cooking</h3>
          <p>
            This section mirrors the profile requirement for favorites with a dedicated
            see-more path.
          </p>
          <div className="feature-card__list" style={{ marginTop: '18px' }}>
            {favoriteRecipes.map((recipe) => (
              <div key={recipe.slug} className="mini-card">
                <strong>{recipe.title}</strong>
                <p>{recipe.summary}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '18px' }}>
            <Link className="button button--ghost" to="/results/search?q=favorites">
              See more favorites
            </Link>
          </div>
        </article>

        <article className="detail-panel">
          <p className="eyebrow">Pending requests</p>
          <h3>Recipes still in review</h3>
          <div className="pending-list" style={{ marginTop: '18px' }}>
            {profilePreview.draftRecipes.map((draft) => (
              <div key={draft.slug} className="pending-item">
                <div className="pending-item__meta">
                  <strong>{draft.title}</strong>
                  <span>{draft.status}</span>
                  <span>{formatDate(draft.submittedOn)}</span>
                </div>
                <p>{draft.note}</p>
              </div>
            ))}
          </div>
          <div className="page-hero__actions" style={{ marginTop: '18px' }}>
            <Link className="button button--primary" to="/add-recipe">
              Add recipe
            </Link>
            {profilePreview.isAdmin ? (
              <Link className="button button--ghost" to="/admin">
                Open admin page
              </Link>
            ) : null}
          </div>
        </article>
      </section>
    </div>
  )
}

export default ProfilePage
