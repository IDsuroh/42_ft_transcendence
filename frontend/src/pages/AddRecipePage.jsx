import { useState } from 'react'
import {
  recipeTypeCategories,
  themeCategories,
} from '../data/siteData'

const ingredientChoices = [
  'Tomatoes',
  'Chicken thighs',
  'Rice',
  'Limes',
  'Basil',
  'Peaches',
  'Yogurt',
  'Chickpeas',
]

function AddRecipePage() {
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([
    { ingredient: ingredientChoices[0], quantity: '' },
  ])
  const [categories, setCategories] = useState([recipeTypeCategories[0].slug])
  const [steps, setSteps] = useState([''])
  const [pictures, setPictures] = useState([''])
  const [status, setStatus] = useState(
    'This form is a frontend-first recipe proposal builder. Submission logic will be added when the moderation backend exists.',
  )

  const categoryOptions = [...recipeTypeCategories, ...themeCategories]

  function updateIngredient(index, field, value) {
    setIngredients((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    )
  }

  function updateCategory(index, value) {
    setCategories((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item)),
    )
  }

  function updateStep(index, value) {
    setSteps((current) =>
      current.map((step, stepIndex) => (stepIndex === index ? value : step)),
    )
  }

  function updatePicture(index, value) {
    setPictures((current) =>
      current.map((picture, pictureIndex) => (pictureIndex === index ? value : picture)),
    )
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!recipeName.trim()) {
      setStatus('Recipe name is required before a proposal can be sent.')
      return
    }

    setStatus(
      'The frontend proposal form is structured and interactive. The next step is wiring its payload to Django review endpoints.',
    )
  }

  return (
    <div className="content-frame">
      <section className="page-hero">
        <p className="eyebrow">Add recipe page</p>
        <h1>Build a recipe submission without waiting on the backend.</h1>
        <p className="page-hero__lead">
          The form structure follows your notes: recipe name, ingredient selectors,
          categories, repeatable steps, and picture slots.
        </p>
      </section>

      <section className="page-section">
        <form className="split-grid" onSubmit={handleSubmit}>
          <article className="form-panel">
            <p className="eyebrow">Recipe basics</p>
            <h3>Main information</h3>
            <div className="field-list" style={{ marginTop: '18px' }}>
              <div className="field">
                <label htmlFor="recipe-name">Recipe name</label>
                <input
                  id="recipe-name"
                  type="text"
                  value={recipeName}
                  onChange={(event) => setRecipeName(event.target.value)}
                  placeholder="Example: Charred Corn Galette"
                />
              </div>

              <div className="field">
                <label>Categories</label>
                <div className="dynamic-list">
                  {categories.map((category, index) => (
                    <div key={`${category}-${index}`} className="dynamic-card">
                      <select
                        value={category}
                        onChange={(event) => updateCategory(index, event.target.value)}
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.slug} value={option.slug}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="button button--ghost"
                onClick={() =>
                  setCategories((current) => [...current, themeCategories[0].slug])
                }
              >
                Add more categories
              </button>
            </div>
          </article>

          <article className="form-panel">
            <p className="eyebrow">Ingredients</p>
            <h3>Repeatable ingredient rows</h3>
            <div className="dynamic-list" style={{ marginTop: '18px' }}>
              {ingredients.map((item, index) => (
                <div key={`${item.ingredient}-${index}`} className="dynamic-card field-list">
                  <div className="field">
                    <label>Ingredient</label>
                    <select
                      value={item.ingredient}
                      onChange={(event) =>
                        updateIngredient(index, 'ingredient', event.target.value)
                      }
                    >
                      {ingredientChoices.map((choice) => (
                        <option key={choice} value={choice}>
                          {choice}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Quantity</label>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(event) =>
                        updateIngredient(index, 'quantity', event.target.value)
                      }
                      placeholder="Example: 180 g"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '18px' }}>
              <button
                type="button"
                className="button button--ghost"
                onClick={() =>
                  setIngredients((current) => [
                    ...current,
                    { ingredient: ingredientChoices[0], quantity: '' },
                  ])
                }
              >
                Add more ingredients
              </button>
            </div>
          </article>

          <article className="form-panel">
            <p className="eyebrow">Steps</p>
            <h3>Structured cooking instructions</h3>
            <div className="dynamic-list" style={{ marginTop: '18px' }}>
              {steps.map((step, index) => (
                <div key={`step-${index + 1}`} className="dynamic-card field-list">
                  <div className="field">
                    <label>{`Step ${index + 1}`}</label>
                    <textarea
                      rows="4"
                      value={step}
                      onChange={(event) => updateStep(index, event.target.value)}
                      placeholder="Describe the action for this step."
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '18px' }}>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => setSteps((current) => [...current, ''])}
              >
                Add more steps
              </button>
            </div>
          </article>

          <article className="form-panel">
            <p className="eyebrow">Pictures</p>
            <h3>Placeholder upload slots</h3>
            <div className="dynamic-list" style={{ marginTop: '18px' }}>
              {pictures.map((picture, index) => (
                <div key={`picture-${index + 1}`} className="dynamic-card field-list">
                  <div className="field">
                    <label>{`Picture ${index + 1}`}</label>
                    <input
                      type="text"
                      value={picture}
                      onChange={(event) => updatePicture(index, event.target.value)}
                      placeholder="Future file path or upload reference"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '18px' }}>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => setPictures((current) => [...current, ''])}
              >
                Add pictures
              </button>
            </div>
          </article>

          <article className="form-panel" style={{ gridColumn: '1 / -1' }}>
            <p className="eyebrow">Submission state</p>
            <h3>Ready for backend hookup</h3>
            <p className="status-banner">{status}</p>
            <div style={{ marginTop: '18px' }}>
              <button type="submit" className="button button--primary">
                Save proposal layout
              </button>
            </div>
          </article>
        </form>
      </section>
    </div>
  )
}

export default AddRecipePage
