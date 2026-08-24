import { Link } from 'react-router-dom'
import { recipeTypeCategories } from '../data/siteData'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-frame site-footer__grid">
        <section>
          <p className="eyebrow">Recipe Site</p>
          <h3>Built to browse recipes first, wire the backend second.</h3>
          <p className="site-footer__copy">
            This branch focuses on frontend structure, navigation, and display.
            Django, MariaDB, and moderation flows will connect behind it later.
          </p>
        </section>

        <section>
          <p className="eyebrow">General use</p>
          <div className="footer-link-list">
            <Link to="/terms">General usage conditions</Link>
            <Link to="/privacy">Privacy and account handling</Link>
            <Link to="/connect">Connect</Link>
          </div>
        </section>

        <section>
          <p className="eyebrow">Categories</p>
          <div className="footer-link-list">
            {recipeTypeCategories.map((category) => (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </footer>
  )
}

export default SiteFooter
