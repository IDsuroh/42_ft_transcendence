import { Link } from 'react-router-dom'
import { getCategoryPath, landingRecipeCategories } from '../data/siteData'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-frame site-footer__inner">
        <section className="site-footer__panel site-footer__brand">
          <div className="site-footer__mark" aria-hidden="true">
            RS
          </div>
          <div className="site-footer__brand-copy">
            <p className="eyebrow">Recipe Site</p>
            <h3>Site footer</h3>
            <p className="site-footer__copy">
              Shared site links and account entry points live here.
            </p>
          </div>
        </section>

        <div className="site-footer__aside">
          <nav className="site-footer__links" aria-label="Footer links">
            <Link className="footer-link" to="/terms">
              Terms
            </Link>
            <Link className="footer-link" to="/privacy">
              Privacy
            </Link>
            <Link className="footer-link" to="/connect">
              Connect
            </Link>
          </nav>

          <nav className="site-footer__category-list" aria-label="Footer categories">
            {landingRecipeCategories.map((category) => (
              <Link
                key={category.id}
                className="footer-category-link"
                to={getCategoryPath(category.slug)}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
