import { HighlightedProject } from "./index";

export const project1: HighlightedProject = {
  slug: "portfolio-website",
  projectNumber: 1,
  title: "Portfolio Website",
  difficulty: "Beginner",
  estimatedTime: "4-6 Hours",
  technologiesUsed: ["HTML5", "CSS3 Grid/Flexbox", "Vanilla JS", "Semantic HTML"],
  conceptCount: 12,
  objective:
    "Build a responsive, semantic personal portfolio page with a theme switcher and project filter.",
  realWorldRelevance:
    "Every developer needs a portfolio. Building one from scratch teaches how the browser parses markup and applies styling rules before styling utilities hide the details.",

  // Section 1: Overview
  overview: {
    description:
      "A fast, clean portfolio page displaying your biography, skills checklist, filterable projects grid, and an accessible contact form.",
    whyItExists:
      "To master the foundations of layout design and browser interactions. Reading docs shows syntax; arranging boxes and handling click events manually builds a mental model of layout flows.",
    realWorldUsage:
      "High-performance digital resumes. Modern static pages rely on fast loading times and optimized layout engines to ensure recruiters and clients stay on the page.",
    businessValue:
      "Semantic markup translates directly to search engine visibility. If a crawler cannot parse your HTML structure, your page ranking drops, causing loss of potential conversions.",
    developerSkillsGained: [
      "Semantic HTML5 structures for accessibility and SEO.",
      "Responsive typography and layout scaling with custom properties.",
      "Flexible spacing structures with Flexbox and Grid.",
      "DOM selectors and class manipulation states in JavaScript.",
    ],
    howItPreparesForReact:
      "React code compiles down to plain DOM nodes. Writing clean, responsive DOM structures and managing toggling variables teaches state management fundamentals. In React, you will represent these exact configurations as state variables like [theme, setTheme] or [filter, setFilter].",
    expectedFolderStructure: `portfolio-website/
├── index.html
├── style.css
└── script.js`,
    expectedFinalUI:
      "A top navigation bar with page links and a theme toggle button, followed by a hero introduction, a skills block, a bento-style projects gallery with functional filters, a responsive contact form, and a footer.",
  },

  // Section 2: Learning Objectives
  learningObjectives: [
    "Define a clear semantic layout using header, nav, main, section, article, and footer.",
    "Implement a fluid layouts system using CSS Grid and Flexbox that scales without media queries.",
    "Declare and toggle CSS custom properties (variables) to implement light/dark themes.",
    "Manipulate the DOM dynamically using querySelector, addEventListener, and classList API.",
  ],

  // Section 3: Final Project Preview
  finalProjectPreview: {
    mockupImageDescription:
      "A screenshot of the Portfolio Website layout showing the hero panel, skills panel, filterable projects gallery, and dark theme enabled.",
    annotatedComponents: [
      {
        name: "Navbar Container",
        description:
          "Holds the brand logo, link elements, and the Theme Toggle button. Remains fixed to the top of the viewport.",
      },
      {
        name: "Skills Box",
        description:
          "A flexbox list displaying skill tags. Uses flex-wrap to automatically adjust tag configurations on small viewports.",
      },
      {
        name: "Project Filter Controls",
        description:
          "Group of buttons with custom data attributes that target and filter the cards grid on click.",
      },
      {
        name: "Projects Cards Grid",
        description:
          "CSS Grid container holding project cards. Uses repeat(auto-fit, minmax(300px, 1fr)) to adapt dynamically.",
      },
    ],
  },

  // Section 4: Concepts Covered
  conceptsCovered: {
    html: [
      "Semantic Tags (<header>, <nav>, <main>, <section>, <article>, <footer>)",
      "Data Attributes (data-category)",
    ],
    css: [
      "Custom Properties (:root definition, var() injection)",
      "Flexbox Axis Controls (justify-content, align-items, flex-wrap)",
      "CSS Grid Layout (grid-template-columns, repeat, auto-fit, minmax, gap)",
    ],
    javascript: [
      "document.querySelectorAll()",
      "Element.classList API (add, remove, toggle, contains)",
      "Array.prototype.forEach()",
      "Event Listeners (click, submit)",
    ],
    browserApis: [
      "localStorage.setItem() / localStorage.getItem()",
      "window.matchMedia('(prefers-color-scheme: dark)')",
    ],
    accessibility: [
      "Semantic headings nesting hierarchy (h1 -> h2 -> h3)",
      "aria-label and role tag properties on interactive nodes",
    ],
    performance: [
      'Image lazy loading (loading="lazy")',
      "Render blocking resource deferment (<script defer>)",
    ],
    architecture: [
      "Separation of concerns (HTML structural flow, CSS style layers, JS behavioral scripts)",
    ],
  },

  // Section 5: Prerequisites
  prerequisites: [
    { title: "HTML Basics", url: "/learn/html" },
    { title: "CSS Core Layouts", url: "/learn/css" },
    { title: "JavaScript Core Syntax", url: "/learn/javascript" },
  ],

  // Section 6: Project Planning
  projectPlanning: {
    folderStructure: `Ensure index.html, style.css, and script.js exist in the same root workspace folder. Load style.css via a <link> tag inside the <head> section, and link script.js with the 'defer' attribute at the bottom of the body.`,
    namingConventions:
      "Use Block-Element-Modifier (BEM) class naming logic (e.g., '.project-card', '.project-card__title', '.project-card--highlighted') to avoid stylesheet overrides.",
    componentBreakdown: [
      "Header Container: Sticky navbar, brand label, navigations links.",
      "Hero Panel: Profile title, brief pitch, call-to-action buttons.",
      "Skills Area: Tags showing technical proficiencies.",
      "Projects Panel: Row of filter category buttons, and the flex grid container hosting visual project cards.",
      "Form Panel: Text field elements, email label structures, error messages, and submit trigger.",
    ],
    dataFlow:
      "A category button click extracts the specific 'data-category' attribute. This string comparison filters the project grid, adding or removing a '.hidden' class on non-matching article nodes.",
    stateFlow:
      "The theme toggle state is tracked in the DOM by toggle-applying a '.dark' class on the documentElement (<html>). This changes the global CSS variables. The user selection is persisted in localStorage.",
    uiBreakdown:
      "Responsive styling is handled natively by declaring grid layouts with auto-fitting width columns. Flex wrapping allows text labels to flow downward without overflow issues.",
    fileResponsibilities: [
      {
        file: "index.html",
        responsibility:
          "Defines DOM nodes, structures layout nesting, links assets, and writes semantic descriptions.",
      },
      {
        file: "style.css",
        responsibility:
          "Defines root variables, layouts rules, grid columns, responsive rules, hover feedback, and dark theme override tokens.",
      },
      {
        file: "script.js",
        responsibility:
          "Attaches action listeners, extracts user filter selections, sets active states, and reads/writes local cache parameters.",
      },
    ],
  },

  // Section 7: Step-by-Step Build Guide
  buildGuide: [
    {
      phaseNumber: 1,
      title: "Write Structured Semantic HTML",
      goal: "Write an index.html file utilizing appropriate semantic sections.",
      why: "A clear DOM layout provides structure, increases accessibility score, and simplifies styling when nesting layouts.",
      tasks: [
        "Create index.html with a valid HTML5 skeleton.",
        "Add a header container with nav links pointing to section IDs.",
        "Create a main area enclosing sections for hero, skills, projects, and contact.",
        "Include labels and aria-label identifiers on interactive elements.",
      ],
      expectedOutcome:
        "A bare HTML structure that shows readable text sections and interactive elements (links, form fields, button toggles) aligned linearly.",
      miniSyntaxExamples: [
        {
          code: `<header>
  <nav aria-label="Main Navigation">
    <a href="#hero">About</a>
    <button id="theme-btn" aria-label="Toggle color theme">🌓</button>
  </nav>
</header>`,
          explanation:
            "Semantic layout element wrapping links and an accessible theme button toggle.",
        },
      ],
      architectureNotes:
        "Always place content elements inside layout structural tags. Avoid using div blocks where a section, nav, or main container is semantically correct.",
      commonMisconceptions:
        "Using divs for everything works in the browser, but it strips page metadata. Visually identical layouts can be completely broken for search indexing engines and screen readers.",
    },
    {
      phaseNumber: 2,
      title: "Establish Design Tokens with CSS Variables",
      goal: "Write styling logic utilizing CSS custom properties for variable tracking.",
      why: "Declarative variables prevent stylesheet duplication. Modifying theme options becomes as simple as updating core properties rather than overwriting dozens of classes.",
      tasks: [
        "Define variable properties in style.css under the :root selector.",
        "Define dark mode overrides inside a html.dark stylesheet selector.",
        "Set body background and font color references to point to these custom properties.",
      ],
      expectedOutcome:
        "A stylesheet using token references. The background and font colors change when manually applying a 'dark' class onto the root <html> tag.",
      miniSyntaxExamples: [
        {
          code: `:root {
  --bg-color: #ffffff;
  --text-color: #1a1a1a;
}
html.dark {
  --bg-color: #121212;
  --text-color: #f5f5f5;
}`,
          explanation:
            "Declaring variables under root scope and overriding them when the root element contains the dark class.",
        },
      ],
      architectureNotes:
        "Never mix hardcoded colors with tokens. If you use variables, assign every background, text, border, and accent color to a custom property.",
      commonMisconceptions:
        "Using separate CSS files for dark/light themes slows down page load times. Toggling variables on a single stylesheet is instantaneous.",
    },
    {
      phaseNumber: 3,
      title: "Responsive Grid Layouts",
      goal: "Create a fluid grid for project cards using CSS Grid layout.",
      why: "Traditional layouts required writing math-heavy media queries. CSS Grid handles dynamic space allocation automatically.",
      tasks: [
        "Apply display: grid on the projects grid container class.",
        "Configure grid-template-columns using auto-fit and minmax.",
        "Define margin and padding layouts on card items.",
        "Set flexbox rules on card content headers to align text tags.",
      ],
      expectedOutcome:
        "A responsive grid containing card layouts that adjust their column count based on screen width.",
      miniSyntaxExamples: [
        {
          code: `.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}`,
          explanation:
            "Fills the viewport with as many 300px columns as possible, expanding remaining space to fill the row.",
        },
      ],
      architectureNotes:
        "Avoid locking pixel heights on cards. Let content define card heights to prevent text from overflowing.",
      commonMisconceptions:
        "Grid layout is not just a replacement for tables. It handles two-dimensional placements, and is ideal for grids where columns change on resize.",
    },
    {
      phaseNumber: 4,
      title: "Interactive DOM Event Listeners",
      goal: "Bind JavaScript click events to execute project filters and theme state.",
      why: "Interactive features require binding DOM elements to active handler functions.",
      tasks: [
        "Select the filter buttons and card articles with querySelectorAll.",
        "Attach click handlers to category triggers using forEach.",
        "Match the data-category attribute of cards with the active button category.",
        "Apply a '.hidden' styling class on cards that do not match.",
      ],
      expectedOutcome:
        "Clicking a category button updates the visible cards, showing only items that match the active filter.",
      miniSyntaxExamples: [
        {
          code: `const category = button.dataset.category;
cards.forEach(card => {
  const match = category === 'all' || card.dataset.category === category;
  card.classList.toggle('hidden', !match);
});`,
          explanation:
            "classList.toggle applies the 'hidden' class if the second argument (the boolean expression) evaluates to true.",
        },
      ],
      architectureNotes:
        "Separate logic from presentation. JavaScript should toggle class attributes, letting CSS handle animations and visibility states.",
      commonMisconceptions:
        "Using inline onclick attributes in HTML mixes markup with logic. Use addEventListener in your JS files to keep code clean and maintainable.",
    },
    {
      phaseNumber: 5,
      title: "State Persistence with localStorage",
      goal: "Save and load the user theme preference using client-side cache APIs.",
      why: "Web applications feel premium when they remember user settings across page reloads.",
      tasks: [
        "Extract current theme state and save it in localStorage on toggle.",
        "Read theme parameters on page initialize.",
        "Query client device preferences (prefers-color-scheme) if no cache value exists.",
      ],
      expectedOutcome:
        "The page correctly loads in dark mode if the user previously selected it, even after refreshing the browser.",
      miniSyntaxExamples: [
        {
          code: `const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark');
}`,
          explanation:
            "Fetches the stored theme key. If it matches 'dark', applies the styling class to the root document node.",
        },
      ],
      architectureNotes:
        "Limit read and write operations. Read from storage once on load, and write only when the state changes to avoid unnecessary CPU cycles.",
      commonMisconceptions:
        "LocalStorage only stores text strings. If you need to store objects or arrays, serialize them with JSON.stringify and deserialize with JSON.parse.",
    },
  ],

  // Section 8: Engineering Notes
  engineeringNotes: {
    whyProfessionalApproach:
      "Professionals structure pages to load fast. Toggling CSS custom properties avoids layout thrashing, keeping interactions smooth.",
    alternativeApproaches:
      "Instead of toggling classes, you could manually change element styles in JavaScript. However, this scatters design tokens into logic files, making maintenance difficult.",
    tradeoffs:
      "Using client-side localStorage for theme caching means the client might see a brief color flash (light to dark) if the script loads late. This can be resolved by executing inline script checks in the document header.",
    whenNotToUse:
      "For dynamic data-driven grids (like database tables), client-side DOM filtering is slow. Server-side search APIs are better for filtering thousands of records.",
  },

  // Section 9: Common Mistakes
  commonMistakes: [
    {
      symptom: "Clicking theme switcher resets stylesheet properties or causes screen flash.",
      cause: "CSS variables are applied using body element targets instead of root scope.",
      fix: "Declare global properties under :root or html scopes, ensuring styles apply universally.",
      whyItHappened:
        "Setting properties on the body scope limits variables from reaching elements that resolve styles outside the body container (like background colors of root scrollbars).",
      howToAvoid: "Always attach core design tokens to the :root pseudo-class selector.",
    },
    {
      symptom: "Filter buttons don't update when clicked, or select wrong cards.",
      cause: "Matching strings do not align, or button selectors are missing query selectors.",
      fix: "Verify dataset properties match. Ensure button category parameters align with project item category attributes.",
      whyItHappened:
        "Typographical mismatches between data-category attributes (e.g. 'front-end' vs 'frontend') prevent the Javascript filter from matching correctly.",
      howToAvoid: "Use clean lowercase strings for class names and dataset values.",
    },
  ],

  // Section 10: Debugging Workflow
  debuggingWorkflow: [
    {
      tool: "Console",
      scenario: "Verify why filter click listener is not firing.",
      steps: [
        "Add a console.log statement inside the event listener function.",
        "Click the button and check if the message appears in the Console tab.",
        "If it doesn't appear, log the selected elements array to ensure they were correctly targeted.",
      ],
      whyThisWay:
        "Console logs are the fastest way to verify execution paths before digging into stack traces.",
    },
    {
      tool: "Application Tab",
      scenario: "Verify that theme preferences are correctly saved.",
      steps: [
        "Open DevTools (F12) and navigate to the Application panel.",
        "Expand Local Storage in the left sidebar and select the website origin.",
        "Click the theme toggle button and verify if the 'theme' key updates to 'dark' or 'light' in real time.",
      ],
      whyThisWay:
        "The Application tab provides a direct view of the client-side state, helping you debug persistence issues.",
    },
  ],

  // Section 11: Verification Checklist
  verificationChecklist: {
    functional: [
      "Theme toggle switches between light and dark modes.",
      "Filter buttons show/hide the correct project cards.",
      "Nav links jump to the correct page sections.",
    ],
    responsive: [
      "No horizontal scrollbars on mobile widths.",
      "Projects grid rearranges layout columns on window resize.",
    ],
    accessibility: [
      "All interactive elements are reachable via keyboard Tab navigation.",
      "Text labels pass contrast checks in both color themes.",
    ],
    performance: ["Images use loading='lazy' attributes.", "No console errors on load."],
    browserCompatibility: [
      "Layout renders correctly in Chrome, Firefox, and Safari.",
      "matchMedia successfully reads system dark mode preferences.",
    ],
    codeOrganization: [
      "Styling rules are separated from layout markup.",
      "JS code is organized into logical event handler functions.",
    ],
    naming: [
      "CSS class names are descriptive (BEM format).",
      "JavaScript variables use camelCase.",
    ],
    completion: [
      "All project requirements are met.",
      "No placeholder code or inline script handlers are used.",
    ],
  },

  // Section 12: Stretch Challenges
  stretchChallenges: [
    "Read client browser preferences automatically on first load using window.matchMedia.",
    "Add a smooth hover scale animation to the projects cards using CSS transitions.",
    "Create a 'Back to Top' button that appears only when scrolling down.",
    "Build a dynamic skills progress slider that animates elements into view.",
    "Validate the contact form fields dynamically using Javascript regular expressions before submitting.",
  ],

  // Section 13: Reflection
  reflectionQuestions: [
    "Why are CSS variables better than hardcoding styles?",
    "How does DOM class manipulation prepare you for state updates in React?",
    "What are the benefits of using semantic HTML over divs?",
  ],

  // Section 14: Resources
  resources: [
    {
      title: "MDN Web Docs: CSS Grid Layout",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
    },
    {
      title: "MDN Web Docs: classList API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
    },
    { title: "web.dev: Responsive Design", url: "https://web.dev/responsive-web-design-basics/" },
  ],

  // Section 15: Next Project
  nextProject: {
    title: "Advanced Todo App",
    slug: "advanced-todo-app",
    bridgeExplanation:
      "Now that you have mastered basic layouts and DOM elements, the next project introduces data collections. You will move from toggling static UI classes to managing dynamic data state in arrays, preparing you for how frameworks sync data models with layout views.",
  },
};
