import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  getCategoryPath,
  landingRecipeCategories,
  sampleRecipePath,
  sampleRecipeSlug,
} from '../data/siteData'

const popularPlaceholders = Array.from({ length: 5 }, (_, index) => ({
  id: `popular-${index + 1}`,
  slug: sampleRecipeSlug,
  label: 'Recipe image',
  name: 'Recipe name',
}))

const latestPlaceholders = Array.from({ length: 4 }, (_, index) => ({
  id: `latest-${index + 1}`,
  slug: sampleRecipeSlug,
  title: 'Recipe name',
  posted: 'Posted x minutes ago',
}))

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      return undefined
    }

    const targetId = location.hash.slice(1)
    const frameId = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [location.hash])

  function handlePlaceholderClick() {}

  return (
    <div className="content-frame landing-plain">
      <section className="landing-plain__section" aria-labelledby="popular-section-title">
        <div className="landing-plain__titlebar">
          <h1 id="popular-section-title">Most popular recipes over 24h</h1>
        </div>

        <div className="landing-plain__popular-grid">
          {popularPlaceholders.map((item) => (
            <Link
              key={item.id}
              to={item.slug ? `/recipe/${item.slug}` : sampleRecipePath}
              className="landing-plain__popular-card landing-plain__card-button"
              data-recipe-slug={item.slug}
            >
              <div className="landing-plain__image-placeholder" aria-hidden="true">
                {item.label}
              </div>
              <div className="landing-plain__caption">{item.name}</div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="header-button landing-plain__action"
          onClick={handlePlaceholderClick}
        >
          See more
        </button>
      </section>

      <section className="landing-plain__section" aria-labelledby="latest-section-title">
        <div className="landing-plain__titlebar">
          <h2 id="latest-section-title">Latest recipes</h2>
          <p>Restricted to a fixed amount for now.</p>
        </div>

        <div className="landing-plain__latest-grid">
          {latestPlaceholders.map((item) => (
            <Link
              key={item.id}
              to={item.slug ? `/recipe/${item.slug}` : sampleRecipePath}
              className="landing-plain__latest-card landing-plain__card-button"
              data-recipe-slug={item.slug}
            >
              <div className="landing-plain__latest-image" aria-hidden="true">
                Recipe image
              </div>

              <div className="landing-plain__latest-copy">
                <h3>{item.title}</h3>
                <p>{item.posted}</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="header-button landing-plain__action"
          onClick={handlePlaceholderClick}
        >
          See more
        </button>
      </section>

      <section
        id="categories"
        className="landing-plain__section landing-plain__section--categories"
        aria-labelledby="landing-top-categories-title"
      >
        <div className="landing-plain__titlebar">
          <h2 id="landing-top-categories-title">Categories</h2>
        </div>

        <div className="category-browser__top-grid">
          {landingRecipeCategories.map((category) => (
            <Link
              key={category.id}
              id={category.id}
              to={getCategoryPath(category.slug)}
              className="landing-plain__popular-card landing-plain__card-button category-browser__tile category-browser__tile--top"
            >
              <div
                className="landing-plain__image-placeholder category-browser__image"
                aria-hidden="true"
              >
                {category.label}
              </div>
              <div className="landing-plain__caption">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
