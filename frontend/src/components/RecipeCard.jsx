function handleOpenRecordClick(_slug) {}

function RecipeCard({ recipe, variant = 'default' }) {
  const cardClassName =
    variant === 'compact' ? 'recipe-card recipe-card--compact' : 'recipe-card'

  return (
    <article className={cardClassName} style={{ '--recipe-accent': recipe.accent }}>
      <h3>{recipe.title}</h3>
      <p className="recipe-card__summary">{recipe.summary}</p>
      <button
        type="button"
        className="text-link recipe-card__link-button"
        data-recipe-slug={recipe.slug}
        onClick={() => handleOpenRecordClick(recipe.slug)}
      >
        Open record
      </button>
    </article>
  )
}

export default RecipeCard
