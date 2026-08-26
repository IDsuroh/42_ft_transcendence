const popularPlaceholders = Array.from({ length: 5 }, (_, index) => ({
  id: `popular-${index + 1}`,
  slug: `popular-recipe-${index + 1}`,
  label: 'Recipe image',
  name: 'Recipe name',
}))

const latestPlaceholders = Array.from({ length: 4 }, (_, index) => ({
  id: `latest-${index + 1}`,
  slug: `latest-recipe-${index + 1}`,
  title: 'Recipe name',
  posted: 'Posted x minutes ago',
}))

function handlePlaceholderClick(_slug) {}

function HomePage() {
  return (
    <div className="content-frame landing-plain">
      <section className="landing-plain__section" aria-labelledby="popular-section-title">
        <div className="landing-plain__titlebar">
          <h1 id="popular-section-title">Most popular recipes over 24h</h1>
        </div>

        <div className="landing-plain__popular-grid">
          {popularPlaceholders.map((item) => (
            <button
              type="button"
              key={item.id}
              className="landing-plain__popular-card landing-plain__card-button"
              data-recipe-slug={item.slug}
              onClick={() => handlePlaceholderClick(item.slug)}
            >
              <div className="landing-plain__image-placeholder" aria-hidden="true">
                {item.label}
              </div>
              <div className="landing-plain__caption">{item.name}</div>
            </button>
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
            <button
              type="button"
              key={item.id}
              className="landing-plain__latest-card landing-plain__card-button"
              data-recipe-slug={item.slug}
              onClick={() => handlePlaceholderClick(item.slug)}
            >
              <div className="landing-plain__latest-image" aria-hidden="true">
                Recipe image
              </div>

              <div className="landing-plain__latest-copy">
                <h3>{item.title}</h3>
                <p>{item.posted}</p>
              </div>
            </button>
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
    </div>
  )
}

export default HomePage
