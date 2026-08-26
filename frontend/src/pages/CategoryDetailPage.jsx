import { Navigate, useParams } from 'react-router-dom'

const sampleCategorySlug = 'category-01'

function handleRecipePlaceholderClick() {}

function CategoryDetailPage() {
  const { slug } = useParams()

  if (slug !== sampleCategorySlug) {
    return <Navigate replace to="/category" />
  }

  const alphabeticalRecipes = Array.from({ length: 18 }, (_, index) => ({
    id: `${slug}-recipe-${index + 1}`,
    label: 'Recipe image',
    title: `Sample recipe ${String(index + 1).padStart(2, '0')}`,
  })).sort((left, right) => left.title.localeCompare(right.title))
  const trendingRecipe = {
    id: `${slug}-trending-recipe`,
    label: 'Recipe image',
    title: 'Sample recipe 01',
    summary: 'Current placeholder trending recipe card.',
  }

  return (
    <div className="content-frame landing-plain">
      <section className="landing-plain__section" aria-labelledby="category-detail-title">
        <div className="landing-plain__titlebar">
          <h1 id="category-detail-title">Trending Recipe in This Category</h1>
        </div>

        <div className="category-detail__featured-grid">
          <button
            type="button"
            className="landing-plain__latest-card landing-plain__card-button category-detail__featured-card"
            onClick={handleRecipePlaceholderClick}
          >
            <div className="landing-plain__latest-image" aria-hidden="true">
              {trendingRecipe.label}
            </div>

            <div className="landing-plain__latest-copy">
              <h3>{trendingRecipe.title}</h3>
              <p>{trendingRecipe.summary}</p>
            </div>
          </button>
        </div>
      </section>

      <section className="landing-plain__section" aria-labelledby="alphabetical-recipes-title">
        <div className="landing-plain__titlebar">
          <h2 id="alphabetical-recipes-title">List of All Recipes in This Category</h2>
        </div>

        <div className="category-browser__grid">
          {alphabeticalRecipes.map((recipe) => (
            <button
              type="button"
              key={recipe.id}
              className="landing-plain__popular-card landing-plain__card-button category-browser__tile"
              onClick={handleRecipePlaceholderClick}
            >
              <div className="landing-plain__image-placeholder category-browser__image" aria-hidden="true">
                {recipe.label}
              </div>
              <div className="landing-plain__caption">{recipe.title}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CategoryDetailPage
