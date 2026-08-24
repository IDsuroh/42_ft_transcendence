import { Link, useSearchParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import SectionTitle from '../components/SectionTitle'
import { searchRecipes, themeCategories } from '../data/siteData'

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const results = searchRecipes(query)

  return (
    <div className="content-frame">
      <section className="page-hero">
        <p className="eyebrow">Results / search</p>
        <h1>{query ? `Results for "${query}"` : 'Search all recipes'}</h1>
        <p className="page-hero__lead">
          The shared header search bar lands here. Right now it filters the mock
          recipe catalogue, and later it can connect directly to Django search endpoints.
        </p>
        <div className="pill-list" style={{ marginTop: '24px' }}>
          {themeCategories.map((theme) => (
            <Link key={theme.slug} className="tag" to={`/category/${theme.slug}`}>
              {theme.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Matches"
          title={`${results.length} result${results.length === 1 ? '' : 's'} found`}
          description="This page is intentionally lightweight so search can remain a focused browse layer."
        />
        {results.length > 0 ? (
          <div className="results-grid">
            {results.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No recipes matched that search yet. Try a category like summer, soups,
            or top recipes.
          </div>
        )}
      </section>
    </div>
  )
}

export default SearchResultsPage
