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
          <span className="stat-pill">Profile details will load here</span>
          <span className="stat-pill">{profilePreview.draftRecipes.length} pending moderation record</span>
          {profilePreview.isAdmin ? <span className="stat-pill">Admin flag enabled</span> : null}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Your recipes"
          title="Recipes linked to this profile"
          description="Recipes owned by the current account will appear here after login."
        />
        {yourRecipes.length > 0 ? (
          <div className="feature-grid">
            {yourRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="empty-state">No recipes are linked to this profile yet.</div>
        )}
      </section>

      <section className="page-section profile-grid">
        <article className="detail-panel">
          <p className="eyebrow">Favourites</p>
          <h3>Favorite recipe records</h3>
          <p>
            Recipes saved by the current user will appear here after favorite data is connected.
          </p>
          {favoriteRecipes.length > 0 ? (
            <div className="feature-card__list" style={{ marginTop: '18px' }}>
              {favoriteRecipes.map((recipe) => (
                <div key={recipe.slug} className="mini-card">
                  <strong>{recipe.title}</strong>
                  <p>{recipe.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state" style={{ marginTop: '18px' }}>
              No favorite recipes are available yet.
            </div>
          )}
          <div style={{ marginTop: '18px' }}>
            <Link className="button button--ghost" to="/results/search?q=favorites">
              Search recipes
            </Link>
          </div>
        </article>

        <article className="detail-panel">
          <p className="eyebrow">Pending requests</p>
          <h3>Pending moderation records</h3>
          {profilePreview.draftRecipes.length > 0 ? (
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
          ) : (
            <div className="empty-state" style={{ marginTop: '18px' }}>
              No moderation requests are pending for this account.
            </div>
          )}
          <div className="page-hero__actions" style={{ marginTop: '18px' }}>
            <Link className="button button--primary" to="/add-recipe">
              Add recipe
            </Link>
            {profilePreview.isAdmin ? (
              <Link className="button button--ghost" to="/admin">
                Open admin area
              </Link>
            ) : null}
          </div>
        </article>
      </section>
    </div>
  )
}

export default ProfilePage
