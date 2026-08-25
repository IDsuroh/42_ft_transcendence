import { useParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import SectionTitle from '../components/SectionTitle'
import {
  formatDate,
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
          <h1>That recipe could not be found.</h1>
          <p className="page-hero__lead">
            There is no live recipe data connected for this URL yet.
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
        <div className="recipe-detail__actions" style={{ marginTop: '24px' }}>
          <button type="button" className="button button--primary">
            Share recipe
          </button>
          <button type="button" className="button button--ghost">
            Save recipe
          </button>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Picture carousel"
          title="Recipe image slots"
          description="Each panel below represents an image record that should come from the database or media storage."
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
          <h3>Ingredient records</h3>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </article>

        <article className="detail-panel">
          <p className="eyebrow">Steps</p>
          <h3>Step records</h3>
          <ol className="step-list">
            {recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="page-section split-grid">
        <article className="detail-panel">
          <p className="eyebrow">Record metadata</p>
          <h3>{recipe.author}</h3>
          <p>{recipe.authorNote}</p>
          <p>{`Created or published date: ${formatDate(recipe.addedOn)}`}</p>
        </article>

        <article className="detail-panel">
          <p className="eyebrow">Suggestions</p>
          <h3>Suggested recipe records</h3>
          <p>
            Later this block can use related-category, tag, or ranking logic from
            the backend.
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
          title="Comment records"
          description="This section should render stored public comments if recipe comments are enabled."
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
          title="Suggested recipe cards"
          description="This repeats the suggestion records in the shared card component."
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
