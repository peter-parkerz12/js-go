import { HighlightedProject } from "./index";

export const project3: HighlightedProject = {
  slug: "recipe-finder",
  projectNumber: 3,
  title: "Recipe Finder",
  difficulty: "Intermediate",
  estimatedTime: "8-10 Hours",
  technologiesUsed: ["HTML5", "CSS Grid", "Fetch API", "Async/Await", "URL Search Params"],
  conceptCount: 18,
  objective:
    "Build a search engine that queries recipe database APIs, handles network latency, and manages favorites collections.",
  realWorldRelevance:
    "Most real-world apps fetch data from external servers. Knowing how to handle network delays, query strings, and API errors is critical for building reliable apps.",

  // Section 1: Overview
  overview: {
    description:
      "A search dashboard connected to a public API featuring recipe detail modals, search history, and a bookmarks drawer.",
    whyItExists:
      "To master asynchronous JavaScript. You will learn to manage network request cycles, handle loading and error states, and parse dynamic data shapes from external servers.",
    realWorldUsage:
      "E-commerce catalogs, digital storefronts, and content feeds. Any app that loads database records on request uses these asynchronous patterns.",
    businessValue:
      "Slow network requests hurt user retention. Showing loading spinners or skeleton guides keeps users on the page during data fetches, reducing search drop-off.",
    developerSkillsGained: [
      "Asynchronous fetching using the Fetch API and Async/Await.",
      "Handling network lifecycle states (loading, empty results, success, failure).",
      "Parsing and structure mapping of raw JSON payloads.",
      "Managing DOM modals and overlays accessibility.",
    ],
    howItPreparesForReact:
      "React applications use async fetch requests within hooks like useEffect or React Query. Building an asynchronous flow from scratch teaches you to handle race conditions and manage loading states before wrapping them in React components.",
    expectedFolderStructure: `recipe-finder/
├── index.html
├── style.css
└── script.js`,
    expectedFinalUI:
      "A clean search form header with a query input, a grid of recipe cards that displays skeleton cards during fetches, error alerts for network drops, a modal display overlay, and a toggleable favorites drawer.",
  },

  // Section 2: Learning Objectives
  learningObjectives: [
    "Execute remote API requests using the Fetch API and handle response status codes.",
    "Structure async functions with try/catch/finally blocks to handle network errors.",
    "Render visual loading skeletons and empty states dynamically in the DOM.",
    "Build a keyboard-navigable modal dialog using semantic HTML <dialog> elements.",
  ],

  // Section 3: Final Project Preview
  finalProjectPreview: {
    mockupImageDescription:
      "The Recipe Finder UI displaying loading skeletons, search results, a recipe details modal, and a favorites sidebar.",
    annotatedComponents: [
      {
        name: "Search Input and Trigger Button",
        description:
          "An HTML form with input validation that triggers the async search process on submit.",
      },
      {
        name: "Skeleton Loading Cards",
        description:
          "CSS-animated skeleton blocks that display while the API request is loading, giving users immediate feedback.",
      },
      {
        name: "HTML5 Modal Dialog",
        description:
          "A semantic <dialog> element that displays full recipe instructions and ingredient lists over the main page content.",
      },
      {
        name: "Favorites Drawer Sidebar",
        description:
          "A slide-out panel showing bookmarked recipes stored in localStorage, enabling quick access.",
      },
    ],
  },

  // Section 4: Concepts Covered
  conceptsCovered: {
    html: ["Semantic Form elements", "HTML5 Dialog element (<dialog>)"],
    css: ["CSS Grid layouts", "Skeleton pulse animations (@keyframes)", "Modal backing overlays"],
    javascript: [
      "Promises and Asynchronous flow",
      "Async/Await keywords",
      "Try/Catch/Finally error handling",
      "URLSearchParams formatting",
    ],
    browserApis: ["window.fetch() API", "Response.json() resolution", "localStorage serialization"],
    accessibility: [
      "Focus locking inside active modal panels",
      "ARIA roles for dialog elements",
      "Keyboard escape triggers (Esc to close dialog)",
    ],
    performance: ["Image performance optimizations", "Avoiding double network requests"],
    architecture: ["Handling API configuration constants and data mapping"],
  },

  // Section 5: Prerequisites
  prerequisites: [
    { title: "JavaScript Promises and Fetch", url: "/learn/javascript" },
    { title: "HTML5 Dialog Elements", url: "/learn/html" },
    { title: "CSS Animations and keyframes", url: "/learn/css" },
  ],

  // Section 6: Project Planning
  projectPlanning: {
    folderStructure: "A single workspace folder containing index.html, style.css, and script.js.",
    namingConventions:
      "BEM conventions for styling classes (e.g. '.search-bar', '.search-bar__input', '.recipe-grid', '.modal-overlay').",
    componentBreakdown: [
      "Search Bar: Input element and submit button.",
      "Results Grid: Containers displaying search results.",
      "Recipe Modal: Structured layout displaying meal details.",
      "Favorites list: Small drawer sidebar component.",
    ],
    dataFlow:
      "User submits query -> show loading skeleton -> fetch from API -> parse JSON payload -> render items array -> hide skeleton.",
    stateFlow:
      "State variables: activeSearchQuery (string), searchResults (array of objects), loadingState (boolean), bookmarkList (array of objects).",
    uiBreakdown:
      "Results container displays loading skeletons, recipe cards, empty states, or error callouts depending on state variables.",
    fileResponsibilities: [
      {
        file: "index.html",
        responsibility:
          "Defines form inputs, main results grid container, modal dialog nodes, and sidebar drawer.",
      },
      {
        file: "style.css",
        responsibility:
          "Styles grid alignments, pulse animations, overlay focus indicators, and mobile drawer slides.",
      },
      {
        file: "script.js",
        responsibility:
          "Runs async API calls, checks HTTP response codes, updates layouts, and manages local storage.",
      },
    ],
  },

  // Section 7: Step-by-Step Build Guide
  buildGuide: [
    {
      phaseNumber: 1,
      title: "Establish a Public API Connection",
      goal: "Write an async function that fetches search results from the public MealDB API.",
      why: "Understanding the HTTP request-response cycle is critical for loading data from external servers.",
      tasks: [
        "Declare a base URL constant pointing to the MealDB API endpoint.",
        "Write an async function fetchRecipes(query) with try/catch logic.",
        "Execute a fetch() call passing the search query as a URL parameter.",
        "Verify that the response resolves and console.log the JSON data.",
      ],
      expectedOutcome:
        "Submitting a search term triggers a console log displaying the matched recipe object array.",
      miniSyntaxExamples: [
        {
          code: `const fetchRecipes = async (query) => {
  try {
    const res = await fetch(\`https://www.themealdb.com/api/json/v1/1/search.php?s=\${query}\`);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    return data.meals || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};`,
          explanation:
            "Fetches from the search endpoint, checks response validity, resolves the JSON payload, and returns the meals array.",
        },
      ],
      architectureNotes:
        "Always check response.ok or response.status before parsing the body. A 500 error code resolves the fetch promise but does not return valid data.",
      commonMisconceptions:
        "Assuming fetch() fails on HTTP error statuses (like 404 or 500). Fetch only rejects on network failures or blocked connections.",
    },
    {
      phaseNumber: 2,
      title: "Render Skeleton Loaders and Handle Lifecycle States",
      goal: "Show loading skeletons before starting requests, replacing them with content when the fetch completes.",
      why: "Loading skeletons give visual feedback, improving perceived speed and reducing user bounce rates during slow API calls.",
      tasks: [
        "Create CSS styles for a pulse animation effect.",
        "Build a function showSkeleton() that populates the results grid with placeholder cards.",
        "Update the fetch process to trigger showSkeleton() before fetching, and hide skeletons when the data renders.",
      ],
      expectedOutcome:
        "The grid displays animated placeholders during fetches, replacing them with recipe card elements once data is loaded.",
      miniSyntaxExamples: [
        {
          code: `@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
.skeleton-card {
  animation: pulse 1.5s infinite ease-in-out;
  background: var(--color-muted);
}`,
          explanation:
            "Defines a CSS pulse animation that updates element opacity to indicate loading state.",
        },
      ],
      architectureNotes:
        "Encapsulate rendering states. Write clear renderLoading(), renderError(), and renderResults() functions to keep code modular.",
      commonMisconceptions:
        "Using a single global boolean variable for layout states. Having explicit state states prevents layout overlap bugs.",
    },
    {
      phaseNumber: 3,
      title: "Interactive Modal Detail Panels",
      goal: "Use the HTML5 <dialog> element to display recipe instructions on top of the search grid.",
      why: "HTML5 dialogs handle focus locking and overlay interactions natively, reducing the need for custom JS modal logic.",
      tasks: [
        "Add a <dialog id='recipe-dialog'> element to index.html.",
        "Write JS logic to fetch specific meal details when a recipe card is clicked.",
        "Populate the dialog content and open it using dialog.showModal().",
        "Add a close button that triggers dialog.close().",
      ],
      expectedOutcome:
        "Clicking a recipe card displays the full instructions in a modal overlay, closing it returns focus to the grid.",
      miniSyntaxExamples: [
        {
          code: `const dialog = document.querySelector('#recipe-dialog');
// Show modal
dialog.showModal();
// Close modal
dialog.close();`,
          explanation:
            "Natively displays the dialog element on top of other content, adding a backdrop overlay and locking keyboard focus.",
        },
      ],
      architectureNotes:
        "Always use showModal() instead of show(). ShowModal locks page focus and adds accessibility support automatically.",
      commonMisconceptions:
        "Using custom divs for modal components without managing keyboard focus can trap screen readers on hidden backdrops.",
    },
    {
      phaseNumber: 4,
      title: "Bookmark Persistence Drawer",
      goal: "Allow users to save favorite recipes, persisting selections in local storage.",
      why: "Building persistence features helps learners understand how client state syncs across page sessions.",
      tasks: [
        "Add a bookmark button (heart icon) to the recipe card layout.",
        "Write toggleBookmark() to add or remove recipe objects from the local storage array.",
        "Build a slide-out drawer sidebar that displays saved bookmarks.",
        "Trigger the favorites drawer visibility with a header navigation button.",
      ],
      expectedOutcome:
        "Favorited items are displayed in the sidebar drawer and remain visible after page reloads.",
      miniSyntaxExamples: [
        {
          code: `const toggleBookmark = (recipe) => {
  const index = bookmarks.findIndex(b => b.id === recipe.id);
  if (index === -1) {
    bookmarks.push(recipe);
  } else {
    bookmarks.splice(index, 1);
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
};`,
          explanation:
            "Searches the bookmarks array for an existing item. Toggles its presence, persists the updated array, and refreshes the drawer UI.",
        },
      ],
      architectureNotes:
        "To save memory, only store the basic fields (id, title, thumbnail URL) of bookmarked recipes in local storage, rather than the entire instruction payload.",
      commonMisconceptions:
        "Saving duplicate items to your bookmarks array. Always check for ID uniqueness using array.findIndex or array.some before saving.",
    },
  ],

  // Section 8: Engineering Notes
  engineeringNotes: {
    whyProfessionalApproach:
      "Structuring async functions with try/catch/finally ensures network requests fail gracefully, preventing UI states from getting stuck in an infinite loading loop.",
    alternativeApproaches:
      "You could fetch all recipes on page load and filter them client-side. However, this is slow for large datasets. Requesting data dynamically on search is much more scalable.",
    tradeoffs:
      "The MealDB API is free but has rate limits. In production, you would set up a backend proxy server to cache API responses and protect credentials.",
    whenNotToUse:
      "Do not call public APIs directly from client-side code if the API requires private keys. Doing so exposes secrets to the browser, risking key theft.",
  },

  // Section 9: Common Mistakes
  commonMistakes: [
    {
      symptom: "Network calls fire multiple times on form submission, resetting the UI.",
      cause: "Form submit event handler is missing standard preventDefault() calls.",
      fix: "Add event.preventDefault() at the very start of the form submit event handler.",
      whyItHappened:
        "HTML forms default to refreshing the page on submit. This interrupts and cancels pending JavaScript fetch operations.",
      howToAvoid: "Always call preventDefault() on submit events.",
    },
    {
      symptom: "The page display gets stuck on loading skeletons indefinitely on request failures.",
      cause: "Skeleton loaders are not toggled off in the catch or finally blocks on error.",
      fix: "Place the code that hides loading states inside a 'finally' block so it runs regardless of success or failure.",
      whyItHappened:
        "If an error is thrown, execution jumps straight to the catch block, skipping any hideLoading() calls placed at the end of the try block.",
      howToAvoid:
        "Write clean finally blocks for cleanup operations: try { ... } catch { ... } finally { hideLoading(); }",
    },
  ],

  // Section 10: Debugging Workflow
  debuggingWorkflow: [
    {
      tool: "Network Tab",
      scenario: "Analyze API request payloads, latency, and status codes.",
      steps: [
        "Open DevTools (F12) and select the Network panel.",
        "Trigger a search in the UI and look for the API fetch request in the list.",
        "Click the request to inspect the Headers, Response payload, and status codes.",
      ],
      whyThisWay:
        "The Network tab shows the raw HTTP communication, helping you diagnose API configuration errors.",
    },
    {
      tool: "Console",
      scenario: "Diagnose undefined recipe values or structure issues.",
      steps: [
        "Log the raw data response using console.log(JSON.stringify(data, null, 2)) inside the fetch function.",
        "Verify that your object property lookups match the API structure (e.g. data.meals vs data.recipes).",
        "Ensure array variables are not empty before accessing their properties.",
      ],
      whyThisWay:
        "Logging the formatted JSON body helps you see the exact property paths of the API schema.",
    },
  ],

  // Section 11: Verification Checklist
  verificationChecklist: {
    functional: [
      "Submitting search queries returns relevant meals from the API.",
      "Clicking a card opens the instructions modal overlay.",
      "Bookmarks can be added, removed, and viewed in the drawer.",
      "Modal closes correctly when pressing the Escape key.",
    ],
    responsive: [
      "Recipe card grid reorganizes cleanly on tablet and mobile viewports.",
      "Modal instructions fit on screen without vertical scrolling issues.",
    ],
    accessibility: [
      "Modal backdrop is dark and prevents background elements from receiving keyboard focus.",
      "All icons have corresponding aria-label descriptions.",
    ],
    performance: [
      "Loading skeletons display during API requests.",
      "Recipe thumbnail images use loading='lazy' attributes.",
    ],
    browserCompatibility: [
      "HTML5 Dialog is supported on modern versions of Chrome, Safari, and Firefox.",
      "Promises resolve correctly without throwing runtime exceptions.",
    ],
    codeOrganization: [
      "Async API requests are placed in clean, dedicated modules.",
      "Variable names are meaningful and easy to trace.",
    ],
    naming: [
      "BEM styling selectors are used for new components.",
      "HTTP constants are descriptive and capitalized.",
    ],
    completion: [
      "All features work offline using localStorage bookmarks.",
      "The code runs without console errors.",
    ],
  },

  // Section 12: Stretch Challenges
  stretchChallenges: [
    "Debounce the search input to automatically run queries while the user types.",
    "Implement search history tags that let users rerun previous searches with one click.",
    "Add ingredient check-off lists inside the instruction modal.",
    "Allow filtering search results by meal category (e.g., Vegetarian, Dessert).",
    "Add a random recipe generator button that fetches a random meal from the API.",
  ],

  // Section 13: Reflection
  reflectionQuestions: [
    "How do async/await operations prevent the UI thread from freezing?",
    "Why are HTML5 Dialog elements better than custom CSS div modals?",
    "What issues occur if you don't validate API response structures before rendering?",
  ],

  // Section 14: Resources
  resources: [
    {
      title: "MDN Web Docs: Fetch API Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
    },
    {
      title: "MDN Web Docs: Dialog element",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog",
    },
    { title: "web.dev: How to avoid race conditions", url: "https://web.dev/promises/" },
  ],

  // Section 15: Next Project
  nextProject: {
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    bridgeExplanation:
      "Now that you can run dynamic API requests, Project 4 introduces complex states. You will coordinate requests across multiple endpoints (for current conditions and weekly forecasts) and manage caching strategies to prevent redundant API calls.",
  },
};
