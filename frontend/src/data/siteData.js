export const recipeTypeCategories = [
  {
    slug: 'starter',
    name: 'Starter',
    description: 'Light openers, grazing plates, and bright first bites.',
  },
  {
    slug: 'main',
    name: 'Main',
    description: 'Centerpiece recipes built for weeknights or dinner tables.',
  },
  {
    slug: 'dessert',
    name: 'Dessert',
    description: 'Finishing notes with fruit, cream, crunch, and comfort.',
  },
  {
    slug: 'drinks',
    name: 'Drinks',
    description: 'Sips for brunch, dinner parties, and late-evening resets.',
  },
  {
    slug: 'soups',
    name: 'Soups',
    description: 'Broths, creamy bowls, and simmered comfort food.',
  },
]

export const themeCategories = [
  {
    slug: 'cheap',
    name: 'Cheap',
    description: 'Budget-conscious ideas that still feel carefully made.',
  },
  {
    slug: 'easy-fast',
    name: 'Easy and fast',
    description: 'Low-friction recipes made for busy days and fast cleanup.',
  },
  {
    slug: 'top-recipes',
    name: 'Top Recipes',
    description: 'The crowd favorites people keep opening, saving, and cooking.',
  },
  {
    slug: 'summer',
    name: 'Summer',
    description: 'Bright produce, chilled drinks, and recipes meant for sunlight.',
  },
  {
    slug: 'salads',
    name: 'Salads',
    description: 'Crunchy bowls, leafy mixes, and herb-heavy combinations.',
  },
]

const categoryLookup = new Map(
  [...recipeTypeCategories, ...themeCategories].map((category) => [
    category.slug,
    category,
  ]),
)

export const viewer = {
  isAuthenticated: false,
  name: 'Guest cook',
}

export const recipes = [
  {
    id: 1,
    slug: 'ember-lemon-chicken',
    title: 'Ember Lemon Chicken',
    type: 'main',
    themes: ['easy-fast', 'top-recipes'],
    summary:
      'Crisp-skinned chicken thighs finished in lemon butter with burnt fennel and herbs.',
    author: 'Mina Halden',
    addedOn: '2026-08-22',
    popularity: 98,
    rating: 4.9,
    reviewCount: 126,
    prepTime: '35 min',
    difficulty: 'Easy',
    servings: '4 servings',
    accent: '#c55b38',
    tags: ['weeknight', 'citrus', 'skillet'],
    gallery: [
      {
        title: 'Bronzed skillet finish',
        note: 'Lemon butter catching on the pan edges.',
        accent: '#c55b38',
      },
      {
        title: 'Fennel and herb board',
        note: 'Fresh dill and shaved fennel for the final lift.',
        accent: '#8ba15d',
      },
      {
        title: 'Table-ready plating',
        note: 'A generous spoon of juices over toasted bread.',
        accent: '#d6aa57',
      },
    ],
    ingredients: [
      '8 bone-in chicken thighs',
      '2 fennel bulbs, cut into wedges',
      '4 cloves garlic, crushed',
      '1 lemon, zested and juiced',
      '45 g butter',
      '1 handful dill and parsley',
      'Olive oil, salt, and black pepper',
    ],
    steps: [
      'Season the chicken well, then sear it skin-side down until the surface turns deep gold.',
      'Move the chicken aside, roast the fennel in the same pan, and let the edges caramelize.',
      'Add garlic, butter, and lemon juice, then baste the chicken until glossy.',
      'Finish with herbs, lemon zest, and the pan juices right before serving.',
    ],
    authorNote:
      'I built this for nights when I want one pan doing almost all the work but still need the plate to feel dramatic.',
    suggestions: [
      'citrus-garden-salad',
      'basil-spark-tonic',
      'velvet-plum-tart',
    ],
    comments: [
      {
        author: 'Sara B.',
        date: '2 days ago',
        text: 'The fennel and lemon combination made it feel more expensive than it was.',
      },
      {
        author: 'Jon M.',
        date: 'Yesterday',
        text: 'Used drumsticks instead and still got the same sticky glaze.',
      },
    ],
  },
  {
    id: 2,
    slug: 'midnight-tomato-soup',
    title: 'Midnight Tomato Soup',
    type: 'soups',
    themes: ['cheap', 'top-recipes'],
    summary:
      'Slow-roasted tomatoes blended with smoked paprika and a finish of cold cream.',
    author: 'Elise Rowan',
    addedOn: '2026-08-19',
    popularity: 90,
    rating: 4.7,
    reviewCount: 89,
    prepTime: '50 min',
    difficulty: 'Easy',
    servings: '5 servings',
    accent: '#8e3429',
    tags: ['tomato', 'comfort', 'smoky'],
    gallery: [
      {
        title: 'Roasted tray',
        note: 'Tomatoes blistered with onion and garlic.',
        accent: '#8e3429',
      },
      {
        title: 'Velvet blend',
        note: 'A glossy texture without needing much cream.',
        accent: '#d07360',
      },
      {
        title: 'Night-table bowl',
        note: 'Finished with cracked pepper and torn basil.',
        accent: '#526d48',
      },
    ],
    ingredients: [
      '1.5 kg ripe tomatoes',
      '1 onion, sliced',
      '5 cloves garlic',
      '750 ml vegetable stock',
      '1 tsp smoked paprika',
      '80 ml cream',
      'Olive oil, salt, and chili flakes',
    ],
    steps: [
      'Roast the tomatoes, onion, and garlic until the edges darken and collapse.',
      'Transfer everything to a pot with stock and paprika, then simmer for 15 minutes.',
      'Blend until smooth, season aggressively, and fold in a small amount of cream.',
      'Serve with extra cream, basil, and toasted sourdough on the side.',
    ],
    authorNote:
      'This is the bowl I make when I want pantry comfort but still want the color on the table to feel intense.',
    suggestions: [
      'charred-peach-bruschetta',
      'ember-lemon-chicken',
      'velvet-plum-tart',
    ],
    comments: [
      {
        author: 'Maya K.',
        date: '3 days ago',
        text: 'The smoked paprika is what keeps it from tasting flat.',
      },
      {
        author: 'Luca T.',
        date: 'Last week',
        text: 'Great with canned tomatoes too when fresh ones are weak.',
      },
    ],
  },
  {
    id: 3,
    slug: 'citrus-garden-salad',
    title: 'Citrus Garden Salad',
    type: 'starter',
    themes: ['summer', 'salads', 'easy-fast'],
    summary:
      'Little gem lettuce, shaved cucumber, orange segments, and a sharp herb dressing.',
    author: 'Noor Havel',
    addedOn: '2026-08-23',
    popularity: 84,
    rating: 4.6,
    reviewCount: 54,
    prepTime: '15 min',
    difficulty: 'Easy',
    servings: '3 servings',
    accent: '#87a65c',
    tags: ['salad', 'fresh', 'citrus'],
    gallery: [
      {
        title: 'Leafy base',
        note: 'Little gem leaves kept whole for texture.',
        accent: '#87a65c',
      },
      {
        title: 'Citrus slices',
        note: 'Orange and grapefruit laid in clean layers.',
        accent: '#f1a24c',
      },
      {
        title: 'Final drizzle',
        note: 'Herb dressing flicked across the whole bowl.',
        accent: '#d8c989',
      },
    ],
    ingredients: [
      '2 heads little gem lettuce',
      '1 cucumber, shaved',
      '2 oranges, segmented',
      '1 grapefruit, segmented',
      '1 handful mint and parsley',
      '2 tbsp olive oil',
      '1 tbsp white wine vinegar',
      'Salt and cracked black pepper',
    ],
    steps: [
      'Wash and dry the leaves so the dressing does not slide off the surface.',
      'Whisk oil, vinegar, chopped herbs, salt, and pepper into a bright dressing.',
      'Layer lettuce, cucumber, and citrus on a wide platter instead of tossing hard.',
      'Dress right before serving so the leaves stay cold and crisp.',
    ],
    authorNote:
      'I like salads that look arranged rather than mixed, because every ingredient keeps its own texture.',
    suggestions: [
      'ember-lemon-chicken',
      'basil-spark-tonic',
      'charred-peach-bruschetta',
    ],
    comments: [
      {
        author: 'Ari D.',
        date: 'Today',
        text: 'The herb dressing also works on grilled fish.',
      },
      {
        author: 'Chloe R.',
        date: 'Yesterday',
        text: 'Added avocado and it still stayed bright instead of heavy.',
      },
    ],
  },
  {
    id: 4,
    slug: 'velvet-plum-tart',
    title: 'Velvet Plum Tart',
    type: 'dessert',
    themes: ['top-recipes', 'summer'],
    summary:
      'A layered plum tart with almond cream, flaky pastry, and a glossy fruit finish.',
    author: 'Amina Snow',
    addedOn: '2026-08-17',
    popularity: 92,
    rating: 4.8,
    reviewCount: 102,
    prepTime: '1 hr 10 min',
    difficulty: 'Medium',
    servings: '8 slices',
    accent: '#75416a',
    tags: ['fruit', 'bake', 'party'],
    gallery: [
      {
        title: 'Pastry base',
        note: 'Cold dough rolled thin with visible butter layers.',
        accent: '#c49467',
      },
      {
        title: 'Plum fan',
        note: 'Fruit arranged in tight overlapping lines.',
        accent: '#75416a',
      },
      {
        title: 'Gloss finish',
        note: 'A last brush of syrup for shine.',
        accent: '#d25768',
      },
    ],
    ingredients: [
      '1 sheet puff pastry',
      '6 plums, sliced',
      '90 g butter',
      '90 g sugar',
      '90 g almond flour',
      '1 egg',
      'Apricot jam for glazing',
    ],
    steps: [
      'Bake the pastry briefly so the middle does not stay raw under the fruit.',
      'Mix butter, sugar, almond flour, and egg into a quick almond cream.',
      'Spread the cream, arrange the plums, and bake until the edges are deep bronze.',
      'Warm the jam and brush it over the tart while still hot from the oven.',
    ],
    authorNote:
      'This is the sort of dessert that looks polished even when the fruit arrangement is a little uneven.',
    suggestions: [
      'basil-spark-tonic',
      'citrus-garden-salad',
      'midnight-tomato-soup',
    ],
    comments: [
      {
        author: 'Naomi Y.',
        date: '4 days ago',
        text: 'The almond layer kept the pastry from getting soggy.',
      },
      {
        author: 'Felix J.',
        date: 'Last week',
        text: 'Peaches work too if plums are not sweet enough.',
      },
    ],
  },
  {
    id: 5,
    slug: 'basil-spark-tonic',
    title: 'Basil Spark Tonic',
    type: 'drinks',
    themes: ['summer', 'easy-fast'],
    summary:
      'Sparkling basil-lime cooler with crushed ice, green syrup, and a saline finish.',
    author: 'Iris Boone',
    addedOn: '2026-08-24',
    popularity: 75,
    rating: 4.5,
    reviewCount: 31,
    prepTime: '10 min',
    difficulty: 'Easy',
    servings: '2 glasses',
    accent: '#4f7e66',
    tags: ['drink', 'lime', 'party'],
    gallery: [
      {
        title: 'Basil syrup',
        note: 'Steeped just enough to stay bright green.',
        accent: '#4f7e66',
      },
      {
        title: 'Crushed ice pour',
        note: 'Highball glasses packed all the way up.',
        accent: '#7fb6bf',
      },
      {
        title: 'Citrus finish',
        note: 'Lime twist and a single basil leaf on top.',
        accent: '#d7e6d9',
      },
    ],
    ingredients: [
      '1 bunch basil',
      '2 limes',
      '30 g sugar',
      'Sparkling water',
      'Crushed ice',
      'Pinch of sea salt',
    ],
    steps: [
      'Simmer sugar with a splash of water, then steep basil in the warm syrup.',
      'Strain, chill, and shake the syrup with lime juice and a tiny pinch of salt.',
      'Pour over crushed ice and top with sparkling water.',
      'Finish with basil leaves and extra lime peel for aroma.',
    ],
    authorNote:
      'The salt matters. Without it, the drink reads sweet instead of sharp and alive.',
    suggestions: [
      'velvet-plum-tart',
      'citrus-garden-salad',
      'ember-lemon-chicken',
    ],
    comments: [
      {
        author: 'Nia P.',
        date: 'Today',
        text: 'Made a pitcher for brunch and it disappeared first.',
      },
      {
        author: 'Owen C.',
        date: 'Yesterday',
        text: 'Easy to turn into a mocktail or cocktail base.',
      },
    ],
  },
  {
    id: 6,
    slug: 'saffron-rice-pan',
    title: 'Saffron Rice Pan',
    type: 'main',
    themes: ['cheap', 'top-recipes'],
    summary:
      'Golden rice layered with peppers, chickpeas, and crispy onions in one wide pan.',
    author: 'Lina Voss',
    addedOn: '2026-08-20',
    popularity: 87,
    rating: 4.7,
    reviewCount: 67,
    prepTime: '45 min',
    difficulty: 'Medium',
    servings: '6 servings',
    accent: '#cb8b33',
    tags: ['rice', 'shared table', 'budget'],
    gallery: [
      {
        title: 'Saffron bloom',
        note: 'Threads opened in warm stock before cooking.',
        accent: '#cb8b33',
      },
      {
        title: 'Wide-pan crust',
        note: 'The bottom gets a light crisp layer for texture.',
        accent: '#8f5a1f',
      },
      {
        title: 'Pepper finish',
        note: 'Roasted peppers and onions tucked on top.',
        accent: '#c76845',
      },
    ],
    ingredients: [
      '400 g rice',
      '1 pinch saffron',
      '1 onion, sliced',
      '1 red pepper, sliced',
      '1 can chickpeas',
      '900 ml vegetable stock',
      'Crispy onions, parsley, lemon wedges',
    ],
    steps: [
      'Toast the rice briefly, then pour in saffron stock and season it well.',
      'Layer peppers and chickpeas over the top without stirring too often.',
      'Cook until the liquid disappears and the base begins to catch lightly.',
      'Rest the pan, then finish with herbs, crispy onions, and lemon.',
    ],
    authorNote:
      'This is one of my favorite low-cost dinner-centerpiece recipes because the pan still looks abundant when it hits the table.',
    suggestions: [
      'midnight-tomato-soup',
      'citrus-garden-salad',
      'basil-spark-tonic',
    ],
    comments: [
      {
        author: 'Ruben H.',
        date: '5 days ago',
        text: 'Used leftover roast peppers and it got even sweeter.',
      },
      {
        author: 'Eve L.',
        date: 'This week',
        text: 'A good base if you want to add sausage or seafood later.',
      },
    ],
  },
  {
    id: 7,
    slug: 'charred-peach-bruschetta',
    title: 'Charred Peach Bruschetta',
    type: 'starter',
    themes: ['summer', 'top-recipes'],
    summary:
      'Grilled peaches, whipped ricotta, toasted bread, and black pepper honey.',
    author: 'Noor Havel',
    addedOn: '2026-08-21',
    popularity: 81,
    rating: 4.6,
    reviewCount: 46,
    prepTime: '20 min',
    difficulty: 'Easy',
    servings: '6 toasts',
    accent: '#da7b54',
    tags: ['toast', 'peach', 'party'],
    gallery: [
      {
        title: 'Peach char',
        note: 'High heat brings out smoky sweetness fast.',
        accent: '#da7b54',
      },
      {
        title: 'Ricotta swipe',
        note: 'Whipped with lemon and olive oil.',
        accent: '#efe4c9',
      },
      {
        title: 'Honey crack',
        note: 'Black pepper and flaky salt on the finish.',
        accent: '#d2a14e',
      },
    ],
    ingredients: [
      '3 ripe peaches',
      '1 baguette',
      '200 g ricotta',
      '1 lemon',
      '2 tbsp honey',
      'Black pepper and flaky salt',
    ],
    steps: [
      'Toast the sliced baguette until the edges dry out and crisp properly.',
      'Grill the peaches until they pick up dark marks and start to soften.',
      'Whip ricotta with lemon zest and olive oil until spreadable.',
      'Assemble with peaches, ricotta, and pepper honey right before serving.',
    ],
    authorNote:
      'This is a small plate that still reads like a centerpiece when you stack the toasts on a board.',
    suggestions: [
      'midnight-tomato-soup',
      'basil-spark-tonic',
      'velvet-plum-tart',
    ],
    comments: [
      {
        author: 'Tori S.',
        date: 'Yesterday',
        text: 'The pepper honey was the part everyone kept asking about.',
      },
      {
        author: 'Miles Z.',
        date: 'Last week',
        text: 'Nectarines worked too and held their shape a bit better.',
      },
    ],
  },
  {
    id: 8,
    slug: 'coconut-lime-noodle-bowl',
    title: 'Coconut Lime Noodle Bowl',
    type: 'main',
    themes: ['easy-fast', 'summer'],
    summary:
      'Rice noodles in a coconut broth with lime, herbs, chili oil, and quick greens.',
    author: 'Gia Ren',
    addedOn: '2026-08-18',
    popularity: 79,
    rating: 4.5,
    reviewCount: 52,
    prepTime: '25 min',
    difficulty: 'Easy',
    servings: '4 servings',
    accent: '#5f8a76',
    tags: ['noodles', 'coconut', 'quick'],
    gallery: [
      {
        title: 'Broth base',
        note: 'Coconut milk sharpened with lime and stock.',
        accent: '#5f8a76',
      },
      {
        title: 'Herb finish',
        note: 'Mint, basil, and scallions layered on top.',
        accent: '#8fc1b5',
      },
      {
        title: 'Chili oil ribbon',
        note: 'A last spoon for warmth and color contrast.',
        accent: '#c44c35',
      },
    ],
    ingredients: [
      '200 g rice noodles',
      '400 ml coconut milk',
      '400 ml stock',
      '2 limes',
      '1 bunch herbs',
      '1 cup spinach or bok choy',
      'Chili oil and scallions',
    ],
    steps: [
      'Simmer coconut milk and stock together with lime zest and a pinch of salt.',
      'Cook the noodles separately so the broth stays clear and balanced.',
      'Warm the greens in the broth for only a minute so they keep color.',
      'Serve the noodles in bowls and ladle the broth over with herbs and chili oil.',
    ],
    authorNote:
      'The separate noodle pot keeps the broth cleaner, which matters if you want leftovers to still feel fresh.',
    suggestions: [
      'citrus-garden-salad',
      'basil-spark-tonic',
      'velvet-plum-tart',
    ],
    comments: [
      {
        author: 'Pia W.',
        date: 'Last week',
        text: 'Good with shrimp, but I liked it just as much without any extra protein.',
      },
      {
        author: 'Daniel F.',
        date: 'This week',
        text: 'Added mushrooms and they soaked up the broth well.',
      },
    ],
  },
]

export const profilePreview = {
  name: 'Noor Havel',
  role: 'Home cook and rooftop host',
  bio:
    'Builds seasonal starters, sharp dressings, and dinner-party recipes with short prep windows.',
  yourRecipeSlugs: [
    'citrus-garden-salad',
    'charred-peach-bruschetta',
    'ember-lemon-chicken',
  ],
  favoriteRecipeSlugs: [
    'velvet-plum-tart',
    'basil-spark-tonic',
    'coconut-lime-noodle-bowl',
    'midnight-tomato-soup',
  ],
  draftRecipes: [
    {
      slug: 'charred-corn-galette',
      title: 'Charred Corn Galette',
      status: 'In review',
      submittedOn: '2026-08-24',
      note: 'Waiting for moderator feedback on the photo set and final step wording.',
    },
  ],
  isAdmin: true,
}

export const pendingRecipes = [
  {
    slug: 'charred-corn-galette',
    title: 'Charred Corn Galette',
    author: 'Noor Havel',
    submittedOn: '2026-08-24',
    categories: ['main', 'cheap'],
    summary:
      'A free-form galette with roasted corn, scallions, whipped feta, and cracked pepper.',
    ingredients: [
      'Puff pastry',
      'Sweet corn',
      'Scallions',
      'Whipped feta',
      'Egg wash',
    ],
    steps: [
      'Roast the corn until parts of it darken.',
      'Spread whipped feta over the chilled pastry.',
      'Pile on the corn mixture and fold the pastry edges inward.',
      'Bake until the crust is deep gold and crisp.',
    ],
  },
  {
    slug: 'smoked-pepper-lentil-bowls',
    title: 'Smoked Pepper Lentil Bowls',
    author: 'Lina Voss',
    submittedOn: '2026-08-23',
    categories: ['main', 'easy-fast'],
    summary:
      'Warm lentils with roasted peppers, yogurt sauce, herbs, and toasted seeds.',
    ingredients: [
      'Cooked lentils',
      'Roasted red peppers',
      'Greek yogurt',
      'Cumin and smoked paprika',
      'Parsley and pumpkin seeds',
    ],
    steps: [
      'Warm lentils with spices until fragrant.',
      'Fold in sliced roasted peppers and adjust seasoning.',
      'Spoon yogurt into bowls and top with the lentils.',
      'Finish with herbs and toasted seeds.',
    ],
  },
]

export function getCategoryBySlug(slug) {
  return categoryLookup.get(slug) ?? null
}

export function getCategoryLabel(slug) {
  return getCategoryBySlug(slug)?.name ?? slug
}

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

export function getRecipesByCategory(slug) {
  return recipes.filter(
    (recipe) => recipe.type === slug || recipe.themes.includes(slug),
  )
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
