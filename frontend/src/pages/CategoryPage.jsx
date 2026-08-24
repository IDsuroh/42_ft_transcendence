import { Link, useParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import SectionTitle from '../components/SectionTitle'
import {
  getCategoryBySlug,
  getRecipesByCategory,
  sortByDate,
  sortByPopularity,
} from '../data/siteData'

function CategoryPage() {
  const { slug } = useParams()
  const category = getCategoryBySlug(slug)

  if (!category) {
    return (
      <div className="content-frame">
        <section className="page-hero not-found">
          <p className="eyebrow">Category page</p>
          <h1>That category does not exist yet.</h1>
          <p className="page-hero__lead">
            The route is ready, but this category slug is not part of the
            current recipe-site structure.
          </p>
          <Link className="button button--primary" to="/">
            Return to landing page
          </Link>
        </section>
      </div>
    )
  }

  const matchingRecipes = getRecipesByCategory(slug)
  const topRecipes = sortByPopularity(matchingRecipes).slice(0, 3)
  const latestRecipes = sortByDate(matchingRecipes).slice(0, 3)

  return (
    <div className="content-frame">
      <section className="page-hero">
        <p className="eyebrow">Category page</p>
        <h1>{category.name}</h1>
        <p className="page-hero__lead">{category.description}</p>
        <div className="hero-stats">
          <span className="stat-pill">{matchingRecipes.length} recipes in view</span>
          <span className="stat-pill">Top, latest, and full archive blocks</span>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Top"
          title={`Best-performing ${category.name.toLowerCase()} recipes`}
          description="This block mirrors the planned category-page structure by keeping a dedicated highlight area above the full list."
        />
        {topRecipes.length > 0 ? (
          <div className="feature-grid">
            {topRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="empty-state">No recipes have been assigned here yet.</div>
        )}
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Latest"
          title={`Newest additions for ${category.name.toLowerCase()}`}
          description="The list can later paginate, but the current UI already distinguishes latest additions from the wider archive."
        />
        {latestRecipes.length > 0 ? (
          <div className="feature-grid">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="empty-state">No latest additions yet for this category.</div>
        )}
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="All recipes"
          title={`Everything filed under ${category.name.toLowerCase()}`}
          description="This is the section that would later support infinite scroll or numbered pagination once the backend catalogue exists."
        />
        {matchingRecipes.length > 0 ? (
          <div className="feature-grid">
            {matchingRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            This category shell is ready, but no recipes are attached to it yet.
          </div>
        )}
      </section>
    </div>
  )
}

export default CategoryPage
