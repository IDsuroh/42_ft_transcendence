import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'

const homepageSections = [
  {
    title: 'Featured recipe area',
    description:
      'This space is reserved for highlighted recipes once live data is available.',
    actionLabel: 'Open search',
    actionTo: '/results/search',
  },
  {
    title: 'Latest recipe list area',
    description:
      'This space is reserved for the newest recipes returned by the backend.',
    actionLabel: 'Browse recipes',
    actionTo: '/results/search',
  },
  {
    title: 'Category navigation area',
    description:
      'This space is reserved for category or theme navigation once those endpoints exist.',
    actionLabel: 'Open connect page',
    actionTo: '/connect',
  },
]

function HomePage() {
  return (
    <div className="content-frame">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing page</p>
          <h1>Homepage layout</h1>
          <p className="page-hero__lead">
            This page is now a structural shell only. Live recipe, category, and
            ranking data has been removed until backend integration is ready.
          </p>
          <div className="page-hero__actions" style={{ marginTop: '24px' }}>
            <Link className="button button--primary" to="/results/search">
              Search recipes
            </Link>
            <Link className="button button--ghost" to="/add-recipe">
              Submit a recipe
            </Link>
          </div>
          <div className="hero-stats">
            <span className="stat-pill">Featured content area</span>
            <span className="stat-pill">Recipe list area</span>
            <span className="stat-pill">Navigation area</span>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Homepage sections"
          title="Database-driven content areas"
          description="These cards mark where live database content should be rendered later."
        />
        <div className="feature-grid">
          {homepageSections.map((section) => (
            <article key={section.title} className="feature-card">
              <p className="eyebrow">Section</p>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <Link className="text-link" to={section.actionTo}>
                {section.actionLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
