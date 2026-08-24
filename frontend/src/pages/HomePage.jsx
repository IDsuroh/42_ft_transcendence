import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import SectionTitle from '../components/SectionTitle'
import {
  getLatestRecipes,
  getTopRecipes,
  recipeTypeCategories,
  themeCategories,
} from '../data/siteData'

function HomePage() {
  const topRecipes = getTopRecipes(3)
  const latestRecipes = getLatestRecipes(4)
  const featuredRecipe = topRecipes[0]

  return (
    <div className="content-frame">
      <section className="page-hero hero-grid">
        <div>
          <p className="eyebrow">Landing page</p>
          <h1>Recipes that feel collected, not dumped into a list.</h1>
          <p className="page-hero__lead">
            Browse the recipes people are opening right now, scan the latest
            additions, or jump into a themed section like summer, salads, or
            easy weeknight mains.
          </p>
          <div className="page-hero__actions" style={{ marginTop: '24px' }}>
            <Link className="button button--primary" to={`/recipe/${featuredRecipe.slug}`}>
              Open today&apos;s favorite
            </Link>
            <Link className="button button--ghost" to="/category/top-recipes">
              Browse top recipes
            </Link>
          </div>
          <div className="hero-stats">
            <span className="stat-pill">24h popular recipes</span>
            <span className="stat-pill">Latest additions</span>
            <span className="stat-pill">Category-led browsing</span>
          </div>
        </div>

        <article
          className="feature-card"
          style={{ '--recipe-accent': featuredRecipe.accent }}
        >
          <p className="eyebrow">Most popular over 24h</p>
          <h3>{featuredRecipe.title}</h3>
          <p>{featuredRecipe.summary}</p>
          <div className="card-meta-strip">
            <span>{featuredRecipe.prepTime}</span>
            <span>{featuredRecipe.servings}</span>
            <span>{featuredRecipe.rating.toFixed(1)} rating</span>
          </div>
          <div className="feature-card__list">
            {topRecipes.map((recipe) => (
              <div key={recipe.slug} className="mini-card">
                <strong>{recipe.title}</strong>
                <p>{recipe.summary}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Popular now"
          title="What people keep cooking"
          description="The homepage lead section can switch time spans later, but the structure already supports high-interest recipe curation."
          action={
            <Link className="button button--ghost" to="/results/search?q=top">
              Search highlights
            </Link>
          }
        />
        <div className="feature-grid">
          {topRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Latest additions"
          title="Fresh recipes entering the catalogue"
          description="This section mirrors the document note about recent additions and gives the landing page a second browse path beyond popularity."
        />
        <div className="feature-grid">
          {latestRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} variant="compact" />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Themes"
          title="Browse by mood, season, or pace"
          description="The document suggested themes like cheap, easy and fast, top recipes, summer, and salads. Those are now visible as first-class navigation targets."
        />
        <div className="theme-grid">
          {themeCategories.map((category) => (
            <article
              key={category.slug}
              className="theme-card"
              style={{
                '--recipe-accent':
                  category.slug === 'summer'
                    ? '#d7a24d'
                    : category.slug === 'salads'
                      ? '#7e9d59'
                      : '#c36841',
              }}
            >
              <p className="eyebrow">Theme</p>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <Link className="text-link" to={`/category/${category.slug}`}>
                Explore theme
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Categories"
          title="Structure the archive from the menu down"
          description="The shared header menu points to recipe types and themes, but the landing page also surfaces them directly for faster scanning."
        />
        <div className="theme-grid">
          {recipeTypeCategories.map((category) => (
            <article
              key={category.slug}
              className="theme-card"
              style={{ '--recipe-accent': '#8f5a3f' }}
            >
              <p className="eyebrow">Recipe type</p>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <Link className="text-link" to={`/category/${category.slug}`}>
                Open category
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
