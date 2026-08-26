# Work Log

This file is the running log for work done in this repository.

## Project Snapshot

- Repository: `42_ft_transcendence`
- Stack: Django, Django REST Framework, PostgreSQL, React, Vite, Tailwind CSS, Nginx, Docker Compose
- Main directories:
  - `backend/` for Django app and API
  - `frontend/` for React app
  - `nginx/` for reverse proxy and HTTPS configuration
- Current routing model:
  - Nginx serves the built frontend and proxies `/api/` to Django
  - React Router handles frontend pages like `/signup`, `/login`, `/home`, `/privacy`, and `/terms`

## Log Format

Use this structure for future entries:

```md
## YYYY-MM-DD

### Task
- Short description of the requested work

### Actions
- Concrete actions taken

### Notes
- Important findings, blockers, or decisions
```

## Explanation Protocol

Use this protocol whenever the user asks for a code explanation, logic walkthrough, or architecture explanation in this repository.

- Explain line by line when the user asks for code flow or syntax explanation.
- Define jargon in simple language before using it heavily.
- Explain each item in this order:
  - what it is
  - why it exists
  - how it works
  - how it connects to the next part
- Do not only narrate behavior. Explain the mechanism.
- Do not assume the user knows terms like:
  - WSGI
  - ASGI
  - CORS
  - CSRF
  - REST framework
  - class-based view
  - middleware
  - proxy
  - origin
  - cookie
  - session
- When explaining routing, spell out the exact flow:
  - what URL the browser requested
  - what Nginx does with that URL
  - what Django file receives it first
  - how Django matches the path
  - why the path may be split across multiple `urls.py` files
  - which view function or class handles it next
- When explaining a split routing setup such as `config/urls.py` and `users/urls.py`, explain why the project divides responsibilities instead of placing every route in one file.
- When explaining syntax like `.as_view()`, explain:
  - what object exists before `.as_view()`
  - why Django cannot use the class directly as the final request handler
  - what `.as_view()` returns
  - how the returned callable leads Django to `get()` or `post()`
- Avoid vague phrases like "eventually Django runs ..." unless the call chain has already been explained step by step.
- Tie backend explanations to the frontend and Nginx when relevant, so the user can see the full request-response path.
- Prefer concrete examples using the actual paths in this repository, such as `/api/users/login/`.
- If a configuration file uses values from `.env`, explain exactly how the value is loaded and where that loading happens in code.
- If the user sounds unfamiliar with the topic, write as if teaching from zero knowledge and reduce jargon aggressively.
- Do not compress the explanation into a short summary if the user asked for a detailed walkthrough.
- When explaining code logic in the terminal, lay out the code lines themselves in the explanation, not only file names or line numbers.
- If the user asks where the frontend sends API calls, include the actual frontend code that performs the request and explain it step by step.
- When a multi-chunk explanation is in progress, save the chunk breakdown in the work log if the user wants to continue later.
- Unless the user explicitly says otherwise, explain code logic as if the user has no background knowledge at all, including basic syntax and foundational programming concepts.

## Session Start Rule

- At the start of every future Codex session in this repository, read `WORK_LOG.md` before suggesting or applying changes.

## Frontend Styling Rule

- Do not add additional or extra styling unless the user explicitly asks for it.
- When the user asks for structure only, keep the frontend plain and close to the existing header/footer style.
- Use the same straightforward font direction as the existing header/footer unless the user asks for a different one.

## 2026-08-26

### Task
- Save the user's standing rule for future frontend styling and session startup behavior

### Actions
- Added a session-start instruction to read `WORK_LOG.md` at the beginning of future work in this repository
- Added a frontend styling rule to avoid extra styling unless the user explicitly requests it
- Recorded that plain structural frontend work should stay aligned with the existing header/footer style and font direction

### Notes
- Frontend structure should default to plain layout work, not visual design expansion, unless the user asks for styling

## 2026-08-26

### Task
- Record the user's current routing and URL-usage direction for later team discussion

### Actions
- Recorded that slug-based path identifiers should remain under strong consideration for single-item detail pages
- Recorded that query parameters should remain under strong consideration for search, filtering, sorting, pagination, and similar page-state controls
- Recorded that `id + slug` is not the preferred direction right now because it feels unnecessarily complex for the current stage

### Notes
- Current preference under discussion:
  - path identifiers such as slugs for one-item detail pages
  - query parameters for search and UI state
- This is a design consideration note, not a final backend contract

## 2026-08-26

### Task
- Save the user's teammate-facing routing report and note the follow-up report preference

### Actions
- Recorded the user's Teammate Report 1 text for August 26, 2026
- Recorded that a later Teammate Report 2 for the same day is expected and should be generated from the user's queue/instructions when requested

### Notes
- User-authored report text:
  - `Teammate Report 1 ( Auguest 26, 2026)`
  - `Worked on the frontend routing structure.`
  - `- React Router = the frontend routing system that decides which React page/component to show when the URL changes.`
  - `- URL identifier = the value inside the URL that tells the app which specific record to load, for example a slug or an id.`
  - `Difference between them:`
  - `- React Router chooses the page type.`
  - `- The URL identifier chooses the specific data for that page.`
  - `(e.g.`
  - `router is for which page in the whole site.`
  - `/login/, /admin/, /recipe/, etc.`
  - `Identifier is for which specific data within those respective pages.`
  - `/login/who/, /recipe/examplefood/, etc.)`
  - `used Reach Router + slug in my case.`
  - `Left untouched for later:`
  - `- The homepage recipe image/name boxes are still just clickable no-op buttons for now.`
  - `- Nothing is connected  to backend/database data yet.`
  - `- Real recipe-page redirection and real data loading are  for later development.`
- Future preference:
  - when the user later provides the queue for Teammate Report 2 on August 26, 2026, generate it in the same general reporting context unless the user asks for a different format

## 2026-07-29

### Task
- Save the user's explanation protocol into the repository work log for future sessions

### Actions
- Reviewed the existing work log file in the project root
- Added a dedicated `Explanation Protocol` section with the user's preferred explanation rules
- Recorded this update as a dated work log entry

### Notes
- The repository uses `WORK_LOG.md` as the existing persistent notes file
- Future explanation requests in this repo should follow the protocol above unless the user asks for a different style

## 2026-07-29

### Task
- Save the Step F chunk breakdown so the explanation can resume later

### Actions
- Recorded the planned Step F teaching chunks for the database, migration, session, and authentication flow

### Notes
- Step F chunk plan:
  - Chunk 1: `models.py`
    - what a model is
    - what `class User(AbstractUser):` means
    - what fields mean
    - how Python model code represents database structure
  - Chunk 2: migrations
    - what a migration is
    - what `makemigrations` does
    - what `migrate` does
    - how model code becomes a real PostgreSQL table
  - Chunk 3: database connection
    - how `settings.py` connects Django to PostgreSQL
    - what each `DATABASES` value means
    - how Django knows which database to use
  - Chunk 4: signup to database write
    - how signup reaches `create_user(...)`
    - what gets saved into the database
    - why password is hashed instead of stored raw
  - Chunk 5: login to session/auth state
    - how login checks stored user data
    - what `authenticate(...)` compares
    - what `login(request, user)` stores for future requests
  - Chunk 6: `/me/` and session reuse
    - how Django reads the session on later requests
    - how `request.user` is reconstructed from stored session/auth data
  - Chunk 7: logout and session destruction
    - what gets invalidated
    - why the old session no longer works
  - Chunk 8: full Step F connection map
    - model -> migration -> database table -> signup -> login -> session -> me -> logout

## 2026-07-30

### Task
- Record the repo-level collaboration rule for future edits

### Actions
- Added a standing note that real file changes should be proposed and explained first

### Notes
- Before making any real file changes in this repo:
  - explain the proposed changes first
  - explain why those changes are being made
  - wait for explicit user approval before applying them
- Future changes and recommendations for this repo should be checked against
  `ft_transcendence.pdf` for compliance before implementation.
- The current Docker/HTTPS/bootstrap approach is for development only.
- Later, when preparing the final production deployment version, use a clear
  dev vs production split:
  - production should use real CA-issued certificates
  - production should use separate production settings/environment handling
  - production should use tighter secret handling
  - production should include backups, logging, restart policy, and monitoring
  - production should not reuse the self-signed localhost certificate flow
  - production should not keep `DEBUG=True`
  - production should not expose dev-only bind mounts
  - production should not commit private keys
- When `README.md` is next updated, add a clear note that the current setup is
  for development only and is not the final production deployment approach.
- Planned work order for the next major phases:
  - finish and clean the local/development setup first
  - then make the app more Kanban-focused
  - then prepare the deployable/production version

## 2026-07-24

### Task
- Create a dedicated markdown file to track work done in this project

### Actions
- Read the repository structure and identified the main areas: `backend/`, `frontend/`, and `nginx/`
- Reviewed the main project context from `README.md`
- Reviewed service orchestration in `docker-compose.yml`
- Reviewed backend dependencies in `backend/requirements.txt`
- Reviewed frontend dependencies in `frontend/package.json`
- Reviewed Django configuration in `backend/config/settings.py`
- Reviewed frontend routing in `frontend/src/App.jsx`
- Reviewed reverse proxy setup in `nginx/default.conf`
- Created this file as the persistent work log for future sessions

### Notes
- The project is set up as a Dockerized full-stack app with Django, PostgreSQL, React, and Nginx
- Authentication and basic policy pages are already described in the repository documentation
- This file can now be appended as we continue working

## 2026-07-24

### Task
- Read `Notes.txt` and align with the current study progress

### Actions
- Reviewed `Notes.txt` in the project root
- Confirmed the repository study plan is organized into six logic flows named A through F
- Noted that steps A and B are complete and the next focus is step C: React frontend startup and routing flow
- Reviewed the step C files:
  - `frontend/src/main.jsx`
  - `frontend/src/App.jsx`
  - `frontend/src/pages/LoginPage.jsx`
  - `frontend/src/pages/SignupPage.jsx`
  - `frontend/src/pages/HomePage.jsx`
  - `frontend/src/pages/PrivacyPage.jsx`
  - `frontend/src/pages/TermsPage.jsx`

### Notes
- Step C starts in `frontend/src/main.jsx`, where React loads and mounts `<App />` into the HTML element with id `root`
- `frontend/src/App.jsx` wraps the app in `BrowserRouter`, renders the navigation links, and maps URL paths to page components
- The page files are the route targets that React Router displays after matching the browser URL
- `LoginPage.jsx`, `SignupPage.jsx`, and `HomePage.jsx` also contain request logic, so they belong partly to step D as well

## 2026-08-24

### Task
- Split the repository workflow so frontend work can continue on a dedicated branch

### Actions
- Recorded the decision to stop pursuing the earlier Kanban-heavy scope for now
- Recorded that the next active focus is the website frontend and overall display work
- Prepared a dedicated `frontend` branch setup that removes backend and infrastructure files from the working branch view while keeping `WORK_LOG.md`

### Notes
- Current working agreement:
  - the active implementation focus is the frontend only
  - Docker infrastructure, backend, and database design are out of scope for the current branch
- Files intended to stay available on the `frontend` branch:
  - `frontend/`
  - `.env`
  - `ft_transcendence.pdf`
  - `WORK_LOG.md`
- Files intended to be removed from the `frontend` branch:
  - `backend/`
  - `nginx/`
  - `.env.example`
  - `.gitignore`
  - `docker-compose.yml`
  - markdown documentation files except `WORK_LOG.md`
  - loose text notes such as `Some backend commands.txt`

## 2026-08-24

### Task
- Record the revised project stack and rebuild direction for the restarted implementation

### Actions
- Recorded that the project is being redone and will need a new frontend container
- Recorded the agreed technology choices for the restarted build:
  - Django for the backend framework
  - React for the frontend application
  - MariaDB for the database
- Recorded that snowflake-style table relationship planning has been raised as a database design topic to evaluate later

### Notes
- The old repository snapshot and the new project direction are not the same thing
- The current active branch focus is still frontend implementation and overall website display work
- Frontend container work should be treated as a rebuild, not as a small patch on top of the previous setup
- Database schema design is not finalized yet; `snowflake schema` is currently a planning note, not an implemented decision in this branch

## 2026-08-24

### Task
- Rebuild the frontend container for the restarted frontend-first branch

### Actions
- Replaced the old frontend image definition with a clean development-focused Dockerfile
- Switched dependency installation in the frontend image to `npm ci` so the lockfile drives the container install
- Kept the container entrypoint focused on the Vite development server on port `5173`
- Added `frontend/.dockerignore` to keep local build output, editor files, and dependency folders out of the Docker build context

### Notes
- This container is now a frontend development container, not a production static-build image
- The container rebuild is intentionally isolated from backend, reverse proxy, and database orchestration

## 2026-08-24

### Task
- Read the recipe-site planning document and rebuild the React frontend structure around it

### Actions
- Read `Recipe Website.txt` from `/home/suroh/Downloads` to capture the current product direction
- Confirmed the project has pivoted to a recipe website with shared header/footer and these main page types:
  - landing page
  - category page
  - recipe page
  - add recipe page
  - profile page
  - admin page
  - login and signup flows
  - search results page
- Replaced the previous auth-demo router with a recipe-site route map
- Added shared frontend building blocks:
  - site header with menu/search/connect/profile actions
  - site footer with general usage and category links
  - reusable recipe cards and section headings
- Added frontend mock content for categories, recipes, profile preview data, and admin review requests
- Rebuilt the page layer to match the planning document:
  - landing page with popular/latest/theme sections
  - category pages with top/latest/all groupings
  - recipe detail pages with rating anchor, gallery slots, ingredients, steps, author, suggestions, and comments
  - add recipe page with repeatable frontend form fields
  - profile page with recipes, favorites, and pending review state
  - admin dashboard and review-detail pages for pending recipe moderation
  - login/signup pages restyled for the new product direction
- Replaced the old demo CSS with a new global visual system for the recipe-site branch

### Notes
- The current frontend is intentionally backend-independent and uses mock data until Django and MariaDB endpoints are rebuilt
- Auth forms, recipe submission, favorites, and moderation actions are UI-ready but still use placeholder status handling
- This environment does not provide `node`, `npm`, or `docker`, so the rebuilt frontend could not be compiled or previewed here

## 2026-08-24

### Task
- Save the agreed frontend-only work order for future turns

### Actions
- Recorded the current recommended frontend workflow so later check-ins can continue from the same order

### Notes
- Current frontend-first work order:
  - preview the site locally and review the design first
  - prepare a short guide for teammates so they can run `npm run dev` and check the layout/design for confirmation
  - check the main flows one by one:
    - landing page
    - category page
    - recipe page
    - add recipe page
    - profile page
    - admin and review pages
    - login and signup pages
  - write down exact frontend corrections after preview:
    - colors
    - typography
    - spacing
    - card layout
    - header and menu behavior
    - mobile layout
    - missing or weak sections
  - keep improving only frontend structure:
    - reusable UI pieces
    - responsiveness
    - forms
    - empty states
    - mock content quality
  - do not define real API integration until backend behavior is confirmed
  - later replace mock data gradually when Django and database output is confirmed

## 2026-08-24

### Task
- Wrap up the current frontend-only work session with a clear summary for continuation tomorrow

### Actions
- Confirmed the active branch remains `frontend`
- Rebuilt the frontend as a recipe-site UI rather than the previous project direction
- Rebuilt the frontend container as a dedicated development container
- Replaced the old starter-style frontend pages with recipe-site pages and routes:
  - landing page
  - category page
  - recipe page
  - add recipe page
  - profile page
  - admin dashboard and review page
  - login and signup pages
  - connect page
  - search results page
  - privacy and terms pages
- Added shared frontend components for cleaner structure:
  - site header
  - site footer
  - recipe card
  - section title
  - page hero
  - auth page shell
- Centralized the current placeholder content in `frontend/src/data/siteData.js`
- Removed leftover starter/demo files that were no longer used:
  - old Vite starter assets
  - old cookie helper
  - old icon sprite
- Updated the frontend title and favicon so the branch reflects the recipe-site branding
- Confirmed the site runs in local development after `npm ci`, `npm audit fix`, and `npm run dev`
- Confirmed the frontend-only workflow going forward:
  - keep using mock data for UI work
  - keep avoiding API/backend assumptions until the backend contract is known
- Compared `frontend_css` against `frontend`, then moved local `frontend` to the same commit and switched back to `frontend` so continued work stays on the user branch without changing the partner branch

### Notes
- `npm audit fix` changed the lockfile, not the declared dependency list in `package.json`
- The built output folder `frontend/dist/` and local `frontend/node_modules/` are development artifacts from local npm commands and are not part of the intended source history
- The current frontend is a structural and visual prototype with placeholder data, ready for more pure frontend refinement before backend integration

## 2026-08-25

### Task
- Refine the frontend header menu behavior, remove remaining mock category/data behavior, and save a teammate-facing summary of today's work

### Actions
- Fixed the header menu popup so it opens as a compact box anchored to the menu button instead of stretching across the page
- Updated the menu popup sizing so its height follows the real content and no longer cuts off lower menu items
- Reduced the popup width and kept it viewport-safe for smaller screens
- Removed the dedicated mock category page flow by deleting `frontend/src/pages/CategoryPage.jsx`
- Changed `/category/:slug` handling in `frontend/src/App.jsx` to redirect back to `/` instead of rendering a mock category page
- Removed clickable mock category and theme links from the menu and kept them as non-clickable labels until real backend-driven navigation exists
- Removed the global mock-data banner that was displayed across the site chrome
- Cleared the hard-coded mock recipe, profile, and moderation record data from `frontend/src/data/siteData.js`
- Converted the affected pages to empty-state or backend-pending behavior instead of showing fake records:
  - `frontend/src/pages/HomePage.jsx`
  - `frontend/src/pages/SearchResultsPage.jsx`
  - `frontend/src/pages/ProfilePage.jsx`
  - `frontend/src/pages/AdminPage.jsx`
  - `frontend/src/pages/ReviewRequestPage.jsx`
  - `frontend/src/pages/RecipePage.jsx`
- Updated `frontend/src/pages/AddRecipePage.jsx` so category and ingredient inputs no longer depend on fake database-driven select options
- Cleaned up several remaining placeholder labels in the shared UI text, including footer and recipe action labels
- Prepared a teammate-report summary in Google-doc-friendly bullet format for today's work

### Notes
- The frontend now behaves more honestly as a structural shell: category routes no longer pretend real category pages exist, and the shared data file no longer injects fake recipe/profile/admin records
- Runtime verification could not be completed in this shell because `node` and `npm` are unavailable here, so today's checks were limited to source inspection
- Remaining `placeholder="..."` attributes in form fields are standard input placeholder text, not mock content records

## 2026-08-26

### Task
- Unify the frontend visual style around the landing-page system, refine auth page copy, and build a placeholder category directory plus one sample category detail page

### Actions
- Normalized the frontend layout so the inner pages, login page, and signup page follow the same visual direction as the landing page, header, and footer
- Refined shared styling in `frontend/src/App.css` so the boxed landing-page treatment is used more consistently across sections, cards, form surfaces, and navigation controls
- Updated the login and signup page messaging to use more natural and more persuasive copy
- Added a placeholder category directory page at `frontend/src/pages/CategoryPage.jsx`
- Added `/category` routing in `frontend/src/App.jsx`
- Built the category directory with:
  - `Top 5 categories`
  - `All categories`
  - 18 placeholder category cards per page
  - 3 pages total
- Added centered pagination controls with `First`, `Previous`, numbered page buttons, `Next`, and `Last`
- Adjusted the pagination layout so the numbered page buttons remain fixed in the page center even when the side navigation buttons appear or disappear
- Styled the category cards as square cards and set the main category grid to 3 cards per row
- Kept the top 5 category cards in a single row
- Replaced the old landing-page category entry block with visible top-category cards plus a `See more Categories` button
- Added a sample category detail page at `frontend/src/pages/CategoryDetailPage.jsx`
- Added `/category/:slug` handling in `frontend/src/App.jsx`
- Limited the active sample detail route to `Category 01` for now, while leaving the other category cards as placeholder no-op buttons
- Built the sample category detail page with:
  - `Trending Recipe in This Category`
  - `List of All Recipes in This Category`
  - no-op sample recipe buttons named `Sample recipe 01` through `Sample recipe 18`
- Removed the extra temporary category placeholder data file and simplified the sample category behavior back into the page files
- Created a teammate-facing uploadable summary in `teammate_report_2.md`

### Notes
- The category flow remains frontend-only placeholder behavior and does not assume a backend or final database schema yet
- Runtime verification could not be completed in this shell because `node` and `npm` are unavailable here, so today's checks were limited to source inspection

### Teammate Report 1
- Worked on the frontend routing structure.
- `React Router` = the frontend routing system that decides which React page/component to show when the URL changes.
- `URL identifier` = the value inside the URL that tells the app which specific record to load, for example a slug or an id.
- Difference between them:
- `React Router` chooses the page type.
- The URL identifier chooses the specific data for that page.
- Example:
- Router is for which page in the whole site.
- `/login/`, `/admin/`, `/recipe/`, etc.
- Identifier is for which specific data within those respective pages.
- `/login/who/`, `/recipe/examplefood/`, etc.
- Used React Router + slug in my case.
- Left untouched for later:
- The homepage recipe image/name boxes are still just clickable no-op buttons for now.
- Nothing is connected to backend/database data yet.
- Real recipe-page redirection and real data loading are for later development.

### Teammate Report 2
- Main focus: landing page, category page, category detail page, and auth page cleanup.
- Landing page: added visible top-category cards and kept a `See more Categories` entry into the category flow.
- Category page: added the main category directory layout with `Top 5 categories`, `All categories`, square cards, and centered pagination.
- Category detail page: built one sample category view for `Category 01` with a trending recipe block and a list of sample recipes.
- Login and signup pages: cleaned up the copy and kept them aligned with the shared frontend layout.
- Current status: category work is still frontend-only placeholder behavior with no backend or database connection yet.
