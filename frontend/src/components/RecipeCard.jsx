import { Link } from 'react-router-dom'
import { getCategoryLabel } from '../data/siteData'

function RecipeCard({ recipe, variant = 'default' }) {
  const secondaryTag = recipe.themes[0] ? getCategoryLabel(recipe.themes[0]) : null
  const cardClassName =
    variant === 'compact' ? 'recipe-card recipe-card--compact' : 'recipe-card'

  return (
    <article className={cardClassName} style={{ '--recipe-accent': recipe.accent }}>
      <p className="recipe-card__category">{getCategoryLabel(recipe.type)}</p>
      <h3>{recipe.title}</h3>
      <div className="recipe-card__meta">
        <span>{recipe.prepTime}</span>
        <span>{recipe.difficulty}</span>
        <span>{recipe.servings}</span>
      </div>
      <p className="recipe-card__summary">{recipe.summary}</p>
      <div className="recipe-card__footer">
        <div className="recipe-card__rating">
          <strong>{recipe.rating.toFixed(1)}</strong>
          <span>{recipe.reviewCount} reviews</span>
        </div>
        {secondaryTag ? <span className="tag">{secondaryTag}</span> : null}
      </div>
      <Link className="text-link" to={`/recipe/${recipe.slug}`}>
        Open recipe
      </Link>
    </article>
  )
}

export default RecipeCard
