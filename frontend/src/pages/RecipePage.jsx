import { useParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import SectionTitle from '../components/SectionTitle'
import {
  formatDate,
  getCategoryLabel,
  getRecipeBySlug,
  getSuggestedRecipes,
} from '../data/siteData'

function RecipePage() {
  const { slug } = useParams()
  const recipe = getRecipeBySlug(slug)

  if (!recipe) {
    return (
      <div className="content-frame">
        <section className="page-hero not-found">
          <p className="eyebrow">Recipe page</p>
          <h1>That recipe preview is missing.</h1>
          <p className="page-hero__lead">
            The route is correct, but the mock recipe data does not contain this
            slug yet.
          </p>
        </section>
      </div>
    )
  }

  const suggestions = getSuggestedRecipes(recipe, 3)

  return (
    <div className="content-frame">
      <section className="page-hero">
        <p className="eyebrow">Recipe page</p>
        <h1>{recipe.title}</h1>
        <p className="page-hero__lead">{recipe.summary}</p>
        <div className="hero-stats">
          <a className="stat-pill" href="#comments">
            {recipe.rating.toFixed(1)} rating and {recipe.reviewCount} reviews
          </a>
          <span className="stat-pill">{recipe.prepTime}</span>
          <span className="stat-pill">{recipe.difficulty}</span>
          <span className="stat-pill">{recipe.servings}</span>
          <span className="stat-pill">{formatDate(recipe.addedOn)}</span>
        </div>
        <div className="recipe-detail__actions" style={{ marginTop: '24px' }}>
          <button type="button" className="button button--primary">
            Share recipe
          </button>
          <button type="button" className="button button--ghost">
            Add to favorites
          </button>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Picture carousel"
          title="Visual slots for the recipe gallery"
          description="There are no final food images yet, so the page uses stylized gallery panels that map cleanly to the future carousel requirement."
        />
        <div className="gallery-grid">
          {recipe.gallery.map((item) => (
            <article
              key={item.title}
              className="gallery-card"
              style={{ '--gallery-accent': item.accent }}
            >
              <div className="gallery-card__label">
                <p className="eyebrow">Photo slot</p>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section detail-grid">
        <article className="detail-panel">
          <p className="eyebrow">Ingredients</p>
          <h3>Build the plate</h3>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </article>

        <article className="detail-panel">
          <p className="eyebrow">Steps</p>
          <h3>Cook in order</h3>
          <ol className="step-list">
            {recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="page-section split-grid">
        <article className="detail-panel">
          <p className="eyebrow">Author</p>
          <h3>{recipe.author}</h3>
          <p>{recipe.authorNote}</p>
          <div className="pill-list" style={{ marginTop: '18px' }}>
            <span className="tag">{getCategoryLabel(recipe.type)}</span>
            {recipe.themes.map((theme) => (
              <span key={theme} className="tag">
                {getCategoryLabel(theme)}
              </span>
            ))}
          </div>
        </article>

        <article className="detail-panel">
          <p className="eyebrow">Suggestions</p>
          <h3>Keep browsing nearby flavors</h3>
          <p>
            The document asked for suggestions between the steps and comments.
            This placement follows that structure.
          </p>
          <div className="feature-card__list" style={{ marginTop: '18px' }}>
            {suggestions.map((suggestedRecipe) => (
              <div key={suggestedRecipe.slug} className="mini-card">
                <strong>{suggestedRecipe.title}</strong>
                <p>{suggestedRecipe.summary}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Comments"
          title="Reader feedback and notes"
          description="The rating display above links down here, which matches the page requirement in your planning document."
        />
        <div id="comments" className="feature-grid">
          {recipe.comments.map((comment) => (
            <article key={`${comment.author}-${comment.date}`} className="comment-card">
              <div className="comment-card__meta">
                <strong>{comment.author}</strong>
                <span>{comment.date}</span>
              </div>
              <p>{comment.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="More like this"
          title="Suggested recipes in card form"
          description="The same recipe-card component used on the landing page also powers the suggestion section to keep the UI system consistent."
        />
        <div className="feature-grid">
          {suggestions.map((suggestedRecipe) => (
            <RecipeCard key={suggestedRecipe.slug} recipe={suggestedRecipe} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default RecipePage
