import { useState } from 'react'

function RepeatableFieldPanel({ eyebrow, title, items, renderItem, addLabel, onAdd }) {
  return (
    <article className="form-panel">
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <div className="dynamic-list form-panel__body">{items.map(renderItem)}</div>
      <div className="form-panel__actions">
        <button type="button" className="button button--ghost" onClick={onAdd}>
          {addLabel}
        </button>
      </div>
    </article>
  )
}

function AddRecipePage() {
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([{ ingredient: '', quantity: '' }])
  const [categories, setCategories] = useState([''])
  const [steps, setSteps] = useState([''])
  const [pictures, setPictures] = useState([''])
  const [status, setStatus] = useState(
    'Form submission is available here, but it is not connected to the backend yet.',
  )

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

  function addCategoryField() {
    setCategories((current) => [...current, ''])
  }

  function addIngredientField() {
    setIngredients((current) => [...current, { ingredient: '', quantity: '' }])
  }

  function addStepField() {
    setSteps((current) => [...current, ''])
  }

  function addPictureField() {
    setPictures((current) => [...current, ''])
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!recipeName.trim()) {
      setStatus('Recipe name is required before a proposal can be sent.')
      return
    }

    setStatus('Submission was captured in the UI only. Backend persistence is not connected yet.')
  }

  return (
    <div className="content-frame">
      <section className="page-hero">
        <p className="eyebrow">Add recipe page</p>
        <h1>Recipe submission form</h1>
        <p className="page-hero__lead">
          This page keeps the submission structure in place while backend storage
          and moderation endpoints are being connected.
        </p>
      </section>

      <section className="page-section">
        <form className="split-grid" onSubmit={handleSubmit}>
          <article className="form-panel">
            <p className="eyebrow">Recipe basics</p>
            <h3>Main information</h3>
            <div className="field-list form-panel__body">
              <div className="field">
                <label htmlFor="recipe-name">Recipe name</label>
                <input
                  id="recipe-name"
                  type="text"
                  value={recipeName}
                  onChange={(event) => setRecipeName(event.target.value)}
                  placeholder="Recipe title from user input"
                />
              </div>

              <div className="field">
                <label>Categories</label>
                <div className="dynamic-list">
                  {categories.map((category, index) => (
                    <div key={`${category}-${index}`} className="dynamic-card">
                      <input
                        type="text"
                        value={category}
                        onChange={(event) => updateCategory(index, event.target.value)}
                        placeholder="Category or theme"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-panel__actions">
              <button
                type="button"
                className="button button--ghost"
                onClick={addCategoryField}
              >
                Add category field
              </button>
            </div>
          </article>

          <RepeatableFieldPanel
            eyebrow="Ingredients"
            title="Repeatable ingredient fields"
            items={ingredients}
            renderItem={(item, index) => (
              <div key={`${item.ingredient}-${index}`} className="dynamic-card field-list">
                <div className="field">
                  <label>Ingredient</label>
                  <input
                    type="text"
                    value={item.ingredient}
                    onChange={(event) =>
                      updateIngredient(index, 'ingredient', event.target.value)
                    }
                    placeholder="Ingredient name"
                  />
                </div>

                <div className="field">
                  <label>Quantity</label>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(event) =>
                      updateIngredient(index, 'quantity', event.target.value)
                    }
                    placeholder="Quantity and unit from user input"
                  />
                </div>
              </div>
            )}
            addLabel="Add ingredient field"
            onAdd={addIngredientField}
          />

          <RepeatableFieldPanel
            eyebrow="Steps"
            title="Repeatable step fields"
            items={steps}
            renderItem={(step, index) => (
              <div key={`step-${index + 1}`} className="dynamic-card field-list">
                <div className="field">
                  <label>{`Step ${index + 1}`}</label>
                  <textarea
                    rows="4"
                    value={step}
                    onChange={(event) => updateStep(index, event.target.value)}
                    placeholder="Step text from user input"
                  />
                </div>
              </div>
            )}
            addLabel="Add step field"
            onAdd={addStepField}
          />

          <RepeatableFieldPanel
            eyebrow="Pictures"
            title="Image reference fields"
            items={pictures}
            renderItem={(picture, index) => (
              <div key={`picture-${index + 1}`} className="dynamic-card field-list">
                <div className="field">
                  <label>{`Picture ${index + 1}`}</label>
                  <input
                    type="text"
                    value={picture}
                    onChange={(event) => updatePicture(index, event.target.value)}
                    placeholder="Stored file reference or upload result"
                  />
                </div>
              </div>
            )}
            addLabel="Add image field"
            onAdd={addPictureField}
          />

          <article className="form-panel form-panel--full">
            <p className="eyebrow">Submission state</p>
            <h3>Submission status</h3>
            <p className="status-banner form-panel__body">{status}</p>
            <div className="form-panel__actions">
              <button type="submit" className="button button--primary">
                Submit recipe
              </button>
            </div>
          </article>
        </form>
      </section>
    </div>
  )
}

export default AddRecipePage
