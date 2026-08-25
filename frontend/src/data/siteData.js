export const viewer = {
  isAuthenticated: false,
  name: '',
}

export const recipes = []

export const profilePreview = {
  name: 'Your profile',
  role: 'Account overview',
  bio: 'Profile details will appear here after account data is connected.',
  yourRecipeSlugs: [],
  favoriteRecipeSlugs: [],
  draftRecipes: [],
  isAdmin: false,
}

export const pendingRecipes = []

export function getRecipeBySlug(slug) {
  return recipes.find((recipe) => recipe.slug === slug) ?? null
}

export function getPendingRecipeBySlug(slug) {
  return pendingRecipes.find((recipe) => recipe.slug === slug) ?? null
}

export function sortByPopularity(items) {
  return [...items].sort((left, right) => right.popularity - left.popularity)
}

export function sortByDate(items) {
  return [...items].sort(
    (left, right) =>
      new Date(`${right.addedOn}T12:00:00`) -
      new Date(`${left.addedOn}T12:00:00`),
  )
}

export function getTopRecipes(limit = 3) {
  return sortByPopularity(recipes).slice(0, limit)
}

export function getLatestRecipes(limit = 4) {
  return sortByDate(recipes).slice(0, limit)
}

export function getSuggestedRecipes(recipe, limit = 3) {
  const ranked = recipes
    .filter((candidate) => candidate.slug !== recipe.slug)
    .map((candidate) => {
      let score = 0

      if (candidate.type === recipe.type) {
        score += 3
      }

      score += candidate.themes.filter((theme) => recipe.themes.includes(theme)).length * 2
      score += candidate.tags.filter((tag) => recipe.tags.includes(tag)).length
      score += candidate.popularity / 100

      return { recipe: candidate, score }
    })
    .sort((left, right) => right.score - left.score)

  return ranked.slice(0, limit).map((entry) => entry.recipe)
}

export function searchRecipes(query) {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return recipes
  }

  return recipes.filter((recipe) => {
    const searchableBits = [
      recipe.title,
      recipe.summary,
      recipe.author,
      recipe.type,
      ...recipe.themes,
      ...recipe.tags,
      ...recipe.ingredients,
    ]

    return searchableBits.some((bit) => bit.toLowerCase().includes(normalized))
  })
}

export function getProfileRecipes() {
  return profilePreview.yourRecipeSlugs
    .map((slug) => getRecipeBySlug(slug))
    .filter(Boolean)
}

export function getFavoriteRecipes() {
  return profilePreview.favoriteRecipeSlugs
    .map((slug) => getRecipeBySlug(slug))
    .filter(Boolean)
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${dateString}T12:00:00`))
}
