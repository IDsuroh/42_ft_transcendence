import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { viewer } from '../data/siteData'

const menuRecipeTypeLabels = [
  'Starter',
  'Main',
  'Dessert',
  'Drinks',
  'Soups',
  'Etc.',
]

const menuThemeLabels = [
  'Cheap',
  'Easy and fast',
  'Top Recipes',
]

function handleMenuPlaceholderClick() {}

function SiteHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const menuPopoverRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)

    if (location.pathname === '/results/search') {
      const params = new URLSearchParams(location.search)
      setQuery(params.get('q') ?? '')
    }
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    function handlePointerDown(event) {
      if (menuPopoverRef.current?.contains(event.target)) {
        return
      }

      setMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [menuOpen])

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
        <div ref={menuPopoverRef} className="menu-popover">
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="site-menu-panel"
          >
            <span className="menu-button__lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="sr-only">Toggle menu</span>
          </button>

          <div
            id="site-menu-panel"
            className={menuOpen ? 'menu-panel is-open' : 'menu-panel'}
          >
            <div className="menu-panel__stack">
              <button
                type="button"
                className="menu-line"
                onClick={handleMenuPlaceholderClick}
              >
                Propose a recipe <span className="menu-line__hint">(needs login)</span>
              </button>

              <section className="menu-group">
                <p className="menu-group__title">Recipes by Type</p>
                <div className="menu-link-list">
                  {menuRecipeTypeLabels.map((label) => (
                    <button
                      key={label}
                      type="button"
                      className="menu-line menu-line--nested"
                      onClick={handleMenuPlaceholderClick}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="menu-group">
                <p className="menu-group__title">Recipes by Theme</p>
                <div className="menu-link-list">
                  {menuThemeLabels.map((label) => (
                    <button
                      key={label}
                      type="button"
                      className="menu-line menu-line--nested"
                      onClick={handleMenuPlaceholderClick}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <Link className="brand" to="/">
          <span className="brand__mark" aria-hidden="true">
            RS
          </span>
          <span className="brand__name">Recipe Site</span>
        </Link>

        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search recipes"
            aria-label="Search recipes"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="header-actions">
          {!viewer.isAuthenticated ? (
            <Link className="header-button" to="/connect">
              Connect
            </Link>
          ) : null}
          <Link
            className="header-button header-button--profile"
            to={viewer.isAuthenticated ? '/profile' : '/connect'}
          >
            Profile
          </Link>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
