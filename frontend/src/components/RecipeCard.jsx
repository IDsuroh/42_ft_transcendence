import { Link } from 'react-router-dom'

function RecipeCard({ recipe, variant = 'default' }) {
  const cardClassName =
    variant === 'compact' ? 'recipe-card recipe-card--compact' : 'recipe-card'

  return (
    <article className={cardClassName} style={{ '--recipe-accent': recipe.accent }}>
      <h3>{recipe.title}</h3>
      <p className="recipe-card__summary">{recipe.summary}</p>
      <Link className="text-link" to={`/recipe/${recipe.slug}`}>
        Open record
      </Link>
    </article>
  )
}

export default RecipeCard
