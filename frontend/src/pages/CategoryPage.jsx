import { useSearchParams } from 'react-router-dom'

const topCategoryPlaceholders = Array.from({ length: 5 }, (_, index) => ({
  id: `top-category-${index + 1}`,
  label: 'Category image',
  name: `Top category ${String(index + 1).padStart(2, '0')}`,
}))

const totalPages = 3
const categoriesPerPage = 18
const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
const categoryPlaceholders = Array.from({ length: totalPages * categoriesPerPage }, (_, index) => ({
  id: `category-${index + 1}`,
  label: 'Category image',
  name: `Category ${String(index + 1).padStart(2, '0')}`,
}))

function handlePlaceholderClick() {}

function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedPage = Number.parseInt(searchParams.get('page') ?? '1', 10)
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages
      ? requestedPage
      : 1

  const pageStartIndex = (currentPage - 1) * categoriesPerPage
  const currentCategories = categoryPlaceholders.slice(
    pageStartIndex,
    pageStartIndex + categoriesPerPage,
  )

  function goToPage(page) {
    if (page <= 1) {
      setSearchParams({})
      return
    }

    setSearchParams({ page: String(page) })
  }

  return (
    <div className="content-frame landing-plain">
      <section className="landing-plain__section" aria-labelledby="top-categories-title">
        <div className="landing-plain__titlebar">
          <h2 id="top-categories-title">Top 5 categories</h2>
          <p>This block stays visible on every category-directory page.</p>
        </div>

        <div className="category-browser__top-grid">
          {topCategoryPlaceholders.map((category) => (
            <button
              type="button"
              key={category.id}
              className="landing-plain__popular-card landing-plain__card-button category-browser__tile category-browser__tile--top"
              onClick={handlePlaceholderClick}
            >
              <div className="landing-plain__image-placeholder category-browser__image" aria-hidden="true">
                {category.label}
              </div>
              <div className="landing-plain__caption">{category.name}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="landing-plain__section" aria-labelledby="all-categories-title">
        <div className="landing-plain__titlebar">
          <h2 id="all-categories-title">All categories</h2>
          <p>{`Page ${currentPage} of ${totalPages}. Each page shows 18 placeholder category buttons.`}</p>
        </div>

        <div className="category-browser__grid">
          {currentCategories.map((category) => (
            <button
              type="button"
              key={category.id}
              className="landing-plain__popular-card landing-plain__card-button category-browser__tile"
              onClick={handlePlaceholderClick}
            >
              <div className="landing-plain__image-placeholder category-browser__image" aria-hidden="true">
                {category.label}
              </div>
              <div className="landing-plain__caption">{category.name}</div>
            </button>
          ))}
        </div>

        <div className="category-browser__pagination" aria-label="Category pages">
          <div className="category-browser__nav-group category-browser__nav-group--left">
            {currentPage > 1 ? (
              <>
                <button
                  type="button"
                  className="header-button"
                  onClick={() => goToPage(1)}
                >
                  First
                </button>
                <button
                  type="button"
                  className="header-button"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  Previous
                </button>
              </>
            ) : null}
          </div>

          <div className="category-browser__page-list" aria-label="Page numbers">
            {pageNumbers.map((pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                className={
                  pageNumber === currentPage
                    ? 'header-button category-browser__page-button is-active'
                    : 'header-button category-browser__page-button'
                }
                onClick={() => goToPage(pageNumber)}
                disabled={pageNumber === currentPage}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <div className="category-browser__nav-group category-browser__nav-group--right">
            {currentPage < totalPages ? (
              <>
                <button
                  type="button"
                  className="header-button"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next
                </button>
                <button
                  type="button"
                  className="header-button"
                  onClick={() => goToPage(totalPages)}
                >
                  Last
                </button>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CategoryPage
