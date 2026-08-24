import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  recipeTypeCategories,
  themeCategories,
  viewer,
} from '../data/siteData'

function SiteHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setMenuOpen(false)

    if (location.pathname === '/results/search') {
      const params = new URLSearchParams(location.search)
      setQuery(params.get('q') ?? '')
    }
  }, [location.pathname, location.search])

  function handleSearchSubmit(event) {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      navigate('/results/search')
      return
    }

    navigate(`/results/search?q=${encodeURIComponent(trimmedQuery)}`)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner content-frame">
        <button
          type="button"
          className="button button--ghost"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="site-menu-panel"
        >
          Menu
        </button>

        <Link className="brand" to="/">
          <span className="brand__mark">RS</span>
          <span className="brand__text">
            <strong>Recipe Site</strong>
            <small>Cook the beautiful version</small>
          </span>
        </Link>

        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for citrus, soups, quick mains..."
            aria-label="Search recipes"
          />
          <button type="submit" className="button button--primary">
            Search
          </button>
        </form>

        <div className="header-actions">
          {!viewer.isAuthenticated ? (
            <Link className="button button--secondary" to="/connect">
              Connect
            </Link>
          ) : null}
          <Link
            className="button button--ghost"
            to={viewer.isAuthenticated ? '/profile' : '/connect'}
          >
            Profile
          </Link>
        </div>
      </div>

      <div
        id="site-menu-panel"
        className={menuOpen ? 'menu-panel is-open' : 'menu-panel'}
      >
        <div className="menu-panel__grid content-frame">
          <section className="menu-panel__section">
            <p className="eyebrow">Start here</p>
            <h3>Browse the site like a food magazine.</h3>
            <p className="menu-panel__copy">
              Open a category, jump into seasonal themes, or preview the recipe
              proposal flow before the Django review endpoints are connected.
            </p>
            <div className="menu-panel__actions">
              <Link className="button button--primary" to="/add-recipe">
                Propose a recipe
              </Link>
              <Link className="button button--ghost" to="/profile">
                Preview profile
              </Link>
            </div>
          </section>

          <section className="menu-panel__section">
            <p className="eyebrow">Recipes by type</p>
            <div className="menu-link-list">
              {recipeTypeCategories.map((category) => (
                <NavLink
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="menu-link"
                >
                  <strong>{category.name}</strong>
                  <span>{category.description}</span>
                </NavLink>
              ))}
            </div>
          </section>

          <section className="menu-panel__section">
            <p className="eyebrow">Recipes by theme</p>
            <div className="menu-link-list">
              {themeCategories.map((category) => (
                <NavLink
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="menu-link"
                >
                  <strong>{category.name}</strong>
                  <span>{category.description}</span>
                </NavLink>
              ))}
            </div>
          </section>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
