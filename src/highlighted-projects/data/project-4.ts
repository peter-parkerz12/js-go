import { HighlightedProject } from "./index";

export const project4: HighlightedProject = {
  slug: "weather-dashboard",
  projectNumber: 4,
  title: "Weather Dashboard",
  difficulty: "Intermediate",
  estimatedTime: "10-12 Hours",
  technologiesUsed: [
    "HTML5",
    "CSS Grid",
    "Fetch API",
    "Geolocation API",
    "SVG Graphics",
    "Caching",
  ],
  conceptCount: 20,
  objective:
    "Build a dashboard that fetches weather forecasts, caches responses, and visualizes temperature changes using custom SVG charts.",
  realWorldRelevance:
    "Dashboards often merge user device APIs (like location) with data from multiple endpoints. Implementing custom charts and caching layers is essential for building fast, resource-efficient apps.",

  // Section 1: Overview
  overview: {
    description:
      "A weather application that uses browser location services, fetches forecast details from Open-Meteo, caches data in memory, and renders temperature trends using custom SVG charts.",
    whyItExists:
      "To master multi-endpoint API integration and dynamic SVG rendering. You will learn to coordinate parallel network requests, manage location permissions, and draw graphs directly in the DOM using scalable vector graphics.",
    realWorldUsage:
      "Enterprise monitoring panels, smart devices, and routing apps. Any layout that displays real-time metrics with custom visual representations uses these structures.",
    businessValue:
      "Reducing API calls directly lowers infrastructure costs. A local caching layer prevents redundant requests, protecting rate limits and speeding up load times for users.",
    developerSkillsGained: [
      "Accessing device hardware parameters via the Geolocation API.",
      "Coordinating parallel requests using Promise.all().",
      "Building a custom client-side caching layer for API responses.",
      "Drawing dynamic SVG path graphics from data structures.",
    ],
    howItPreparesForReact:
      "React dashboards require managing multiple dependent states (such as active city, coordinates, forecast models, and metrics). Solving data aggregation and memoizing values in vanilla JS builds the state coordination skills needed to use React hooks like useMemo and useEffect.",
    expectedFolderStructure: `weather-dashboard/
├── index.html
├── style.css
└── script.js`,
    expectedFinalUI:
      "A navigation search bar with a Geolocation trigger, a main container showing current conditions, an SVG trend graph showing temperature curves, a grid displaying the 7-day forecast, and a recent locations list.",
  },

  // Section 2: Learning Objectives
  learningObjectives: [
    "Query the Geolocation API to retrieve device latitude and longitude coordinates.",
    "Resolve multiple API calls in parallel using Promise.all() to prevent loading bottle-necks.",
    "Build a time-based cache structure in memory to store API responses.",
    "Generate and inject dynamic SVG path string definitions using JavaScript to draw data charts.",
  ],

  // Section 3: Final Project Preview
  finalProjectPreview: {
    mockupImageDescription:
      "The Weather Dashboard UI showing current metrics, geolocation buttons, a line chart tracking hourly temperatures, and cards for the 7-day forecast.",
    annotatedComponents: [
      {
        name: "GPS Location Button",
        description:
          "An action button that requests browser geolocation permissions to fetch weather data for the user's current location.",
      },
      {
        name: "Current Conditions Panel",
        description:
          "Displays current parameters (temperature, wind speed, humidity, UV index) with matching graphic status icons.",
      },
      {
        name: "SVG Line Chart Container",
        description:
          "A responsive SVG element where JavaScript dynamically generates line points (<polyline> or <path>) to plot hourly temperatures.",
      },
      {
        name: "7-Day Forecast Grid",
        description:
          "A row of layout cards showing the daily weather outlook, high/low temperatures, and precipitation probabilities.",
      },
    ],
  },

  // Section 4: Concepts Covered
  conceptsCovered: {
    html: [
      "Inline SVG elements (<svg>, <path>, <circle>, <text>)",
      "Form validation for city coordinates search",
    ],
    css: [
      "CSS Grid dashboard arrangements",
      "Responsive aspect-ratio rules for charts",
      "Dynamic background gradients matching weather states",
    ],
    javascript: [
      "Promise.all() for parallel execution",
      "Array mapping, sorting, and slicing",
      "Unix timestamp conversions (Epoch to ISO strings)",
      "Math calculations for graph coordinate scaling",
    ],
    browserApis: [
      "navigator.geolocation API",
      "Memory cache objects",
      "Fetch API options and headers",
    ],
    accessibility: [
      "Aria-live announcements for dynamic layout updates",
      "Adding title and desc tags inside SVG structures for screen readers",
    ],
    performance: [
      "In-memory data caching with expiration limits",
      "Debouncing window resize calculations to redraft SVG lines",
    ],
    architecture: [
      "Separating business math logic (data parsing, scaling) from display code (SVG drawing)",
    ],
  },

  // Section 5: Prerequisites
  prerequisites: [
    { title: "HTML SVG Graphics Basics", url: "/learn/html" },
    { title: "JavaScript Promises and Parallelism", url: "/learn/javascript" },
    { title: "Advanced CSS Layout and Grids", url: "/learn/css" },
  ],

  // Section 6: Project Planning
  projectPlanning: {
    folderStructure: "A single workspace folder containing index.html, style.css, and script.js.",
    namingConventions:
      "Namespaced dashboard classes (e.g. '.dash-container', '.dash-current', '.dash-chart', '.location-btn') for clarity.",
    componentBreakdown: [
      "Navigation Controller: Inputs, geolocation trigger.",
      "Metrics Block: Displays primary temperature data.",
      "SVG Canvas: Dynamic polyline line chart.",
      "Forecast Row: Multi-day grid forecast view.",
    ],
    dataFlow:
      "Resolve location coordinates -> check local memory cache -> if valid, load from cache -> else, run parallel API fetches -> cache results -> update DOM fields -> redraw SVG path.",
    stateFlow:
      "State structures: selectedCoordinates (object), weatherCache (object mapped by coordinates), currentUnitSystem (string), locationsHistory (array).",
    uiBreakdown:
      "Responsive dashboard layouts that rearrange layout boxes based on viewport widths. Chart elements redraw SVG lines on window resize.",
    fileResponsibilities: [
      {
        file: "index.html",
        responsibility:
          "Defines dashboard structure, wraps placeholder SVG canvas, and defines navigation inputs.",
      },
      {
        file: "style.css",
        responsibility:
          "Styles bento blocks, SVG lines, grid layouts, and color states matching weather conditions.",
      },
      {
        file: "script.js",
        responsibility:
          "Requests device location, handles cache layers, scales chart coordinates, and writes dynamic SVG elements.",
      },
    ],
  },

  // Section 7: Step-by-Step Build Guide
  buildGuide: [
    {
      phaseNumber: 1,
      title: "Query Geolocation Coordinates",
      goal: "Request and parse user GPS coordinates using the Geolocation API.",
      why: "Providing localized data on load improves user experience by delivering immediate, relevant information.",
      tasks: [
        "Create a button in HTML to trigger geolocation.",
        "Add a click listener that calls navigator.geolocation.getCurrentPosition().",
        "Implement error callbacks to handle situations where the user denies permission.",
        "Verify that coordinates (latitude and longitude) print to the console.",
      ],
      expectedOutcome:
        "Clicking the location button prompts the browser for GPS permission, printing coordinates on approval.",
      miniSyntaxExamples: [
        {
          code: `navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    loadWeatherData(latitude, longitude);
  },
  (err) => console.warn(\`Location error: \${err.message}\`)
);`,
          explanation:
            "Requests browser location permission, triggering the success callback with coordinates, or handling errors if permission is denied.",
        },
      ],
      architectureNotes:
        "Always implement fallback logic. If a user denies location access, fall back to a default location (like London or New York) so the app remains functional.",
      commonMisconceptions:
        "Assuming geolocation is instant. Network delays can slow down coordinate resolution, so you must display a loading indicator.",
    },
    {
      phaseNumber: 2,
      title: "Parallel Fetching with Promise.all",
      goal: "Fetch current weather and weekly forecast data in parallel.",
      why: "Awaiting multiple API calls sequentially slows down load times. Parallel fetches load all required data concurrently.",
      tasks: [
        "Define current weather and forecast endpoints pointing to Open-Meteo.",
        "Write fetch calls for both endpoints.",
        "Execute both fetches concurrently using Promise.all().",
        "Verify that both datasets print to the console together.",
      ],
      expectedOutcome:
        "Both network requests fire simultaneously, resolving together once the slower request completes.",
      miniSyntaxExamples: [
        {
          code: `const [currentRes, forecastRes] = await Promise.all([
  fetch(currentUrl),
  fetch(forecastUrl)
]);
const current = await currentRes.json();
const forecast = await forecastRes.json();`,
          explanation:
            "Initiates both requests at the same time, returning an array of resolved HTTP responses once both complete.",
        },
      ],
      architectureNotes:
        "If any request in Promise.all fails, the entire block rejects. Wrap individual calls or handle errors gracefully to prevent complete app failures.",
      commonMisconceptions:
        "Sequentially awaiting fetches (await fetch1, then await fetch2) creates a waterfall delay, doubling network load times.",
    },
    {
      phaseNumber: 3,
      title: "Build an In-Memory Cache Layer",
      goal: "Implement a time-based caching mechanism to store weather data.",
      why: "Weather data changes slowly. Caching responses for 10-15 minutes reduces unnecessary server hits and makes search loads instant.",
      tasks: [
        "Create a global cache object in JS.",
        "Generate cache keys by combining latitude and longitude parameters.",
        "Save API responses in the cache alongside a timestamp.",
        "Check keys and expiration times before running new fetches.",
      ],
      expectedOutcome:
        "Re-searching the same coordinates loads the data instantly without triggering new network requests.",
      miniSyntaxExamples: [
        {
          code: `const cache = {};
const checkCache = (key) => {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < 600000) {
    return cached.data;
  }
  return null;
};`,
          explanation:
            "Checks if a cache entry exists and is less than 10 minutes (600,000 ms) old, returning the data or null if expired.",
        },
      ],
      architectureNotes:
        "Keep cache keys clean. Round latitude and longitude coordinates to two decimal places to ensure search keys match consistently.",
      commonMisconceptions:
        "Saving cache objects indefinitely can cause memory issues. Set clear expiration timestamps on cached items.",
    },
    {
      phaseNumber: 4,
      title: "Render Dynamic SVG Temperature Charts",
      goal: "Plot temperature arrays dynamically inside an SVG container.",
      why: "Visualizing trends helps users process data quickly. Writing custom SVG math avoids the bundle weight of heavy chart libraries.",
      tasks: [
        "Add a responsive <svg> element to the HTML template.",
        "Extract the daily temperature array from the resolved forecast payload.",
        "Write a scaling function that maps temperature values to SVG canvas pixels.",
        "Generate a string of coordinates and inject them into an SVG polyline element.",
      ],
      expectedOutcome: "The SVG renders a line graph plotting forecast temperatures dynamically.",
      miniSyntaxExamples: [
        {
          code: `const points = temps.map((t, idx) => {
  const x = (idx / (temps.length - 1)) * width;
  const y = height - ((t - minTemp) / (maxTemp - minTemp)) * height;
  return \`\${x},\${y}\`;
}).join(' ');
polyline.setAttribute('points', points);`,
          explanation:
            "Maps index and temperature array values to x/y canvas coordinates, creating a points string to update an SVG polyline.",
        },
      ],
      architectureNotes:
        "Abstract coordinates calculations. Keep chart math modular, returning coordinates arrays that draw methods inject into DOM node attributes.",
      commonMisconceptions:
        "Setting static dimensions on SVG graphs. SVGs need viewBox attributes to auto-scale inside responsive layout containers.",
    },
  ],

  // Section 8: Engineering Notes
  engineeringNotes: {
    whyProfessionalApproach:
      "Custom SVG rendering keeps applications lightweight, avoiding heavy external graphing libraries. Parallel requests keep dashboard load times minimal.",
    alternativeApproaches:
      "You could use pre-built charting libraries. However, this imports megabytes of dependencies, slowing page loads for mobile users with spotty network connections.",
    tradeoffs:
      "An in-memory cache is deleted when the user closes the tab. To persist search data across sessions, you could cache responses in localStorage, though you must manage storage size limits.",
    whenNotToUse:
      "Do not use custom SVG calculations for complex interactive dashboards (e.g. stock charting portals). In these cases, dedicated canvas graphing libraries are much more performant.",
  },

  // Section 9: Common Mistakes
  commonMistakes: [
    {
      symptom: "The polyline line shoots off the top or bottom of the SVG canvas box.",
      cause:
        "Math coordinate scaling fails to account for temperatures dropping below freezing (0°C).",
      fix: "Calculate chart heights using relative bounds (max temperature minus min temperature) instead of using absolute bounds.",
      whyItHappened:
        "Dividing by absolute metrics triggers division-by-zero errors or maps negative values outside the viewport boundaries.",
      howToAvoid:
        "Always determine relative bounds: const range = max - min; const y = height - ((value - min) / range) * height;",
    },
    {
      symptom: "SVG graphs look blurry or fail to scale on mobile screen sizes.",
      cause:
        "SVG nodes are defined with hardcoded pixel widths and heights instead of viewBox settings.",
      fix: "Remove width and height attributes from the SVG tag, replacing them with a responsive 'viewBox=\"0 0 500 200\"' setup.",
      whyItHappened:
        "Hardcoded attributes lock layout boxes to static sizes, breaking layout containment rules.",
      howToAvoid: "Always define responsive SVG containers using viewBox attributes.",
    },
  ],

  // Section 10: Debugging Workflow
  debuggingWorkflow: [
    {
      tool: "Sources",
      scenario: "Debug coordinate scaling calculations.",
      steps: [
        "Open DevTools (F12) and select the Sources tab.",
        "Add a breakpoint inside the loop that maps temperatures to coordinate strings.",
        "Inspect x and y values for each step to ensure coordinates map within the viewBox bounds.",
      ],
      whyThisWay:
        "Inspecting coordinates during execution helps you catch scaling bugs before rendering the line.",
    },
    {
      tool: "Network Tab",
      scenario: "Verify that parallel request caching works.",
      steps: [
        "Open DevTools and select the Network panel.",
        "Search for a city, then search for it again 30 seconds later.",
        "Verify that the second search does not send new requests to the Network log, indicating cache hits.",
      ],
      whyThisWay:
        "Checking the Network logs is the only way to prove no redundant server calls are made.",
    },
  ],

  // Section 11: Verification Checklist
  verificationChecklist: {
    functional: [
      "GPS button loads localized weather metrics.",
      "7-day forecast cards display correct future projections.",
      "Parallel calls resolve concurrently without waterfalls.",
      "Cached search queries load instantly on repeat visits.",
    ],
    responsive: [
      "SVG graphics redraw properly when resizing the browser.",
      "Forecast panels wrap on mobile widths without breaking parent layout margins.",
    ],
    accessibility: [
      "Dynamic weather updates are announced to screen readers using aria-live.",
      "Dashboard text maintains high contrast ratios in all color themes.",
    ],
    performance: [
      "SVG points math runs efficiently without blocking inputs.",
      "Cache entries expire correctly after 10 minutes.",
    ],
    browserCompatibility: [
      "Geolocation requests fall back gracefully on insecure (HTTP) origins.",
      "SVGs render consistently across major layout engines.",
    ],
    codeOrganization: [
      "Cache interfaces are isolated from API requests.",
      "Drawing functions are clean and self-contained.",
    ],
    naming: [
      "SVG helper functions are named using clean verbs.",
      "Theme override classes use uniform BEM patterns.",
    ],
    completion: [
      "The app works correctly using default locations if geolocation access is denied.",
      "The console is free of layout or runtime errors.",
    ],
  },

  // Section 12: Stretch Challenges
  stretchChallenges: [
    "Add a toggle to switch temperatures between Fahrenheit and Celsius, recalculating SVG chart points.",
    "Draw an hourly weather trend graph in addition to the weekly chart.",
    "Display dynamic weather animations (e.g. rain, snow, clouds) inside the main panel.",
    "Implement persistent search history tags stored in localStorage.",
    "Add daily high/low markers on the SVG graph using SVG circles and text labels.",
  ],

  // Section 13: Reflection
  reflectionQuestions: [
    "How does caching API responses improve web application performance?",
    "Why does Promise.all speed up load times compared to sequential await calls?",
    "What are the benefits of drawing vector shapes with SVGs compared to using canvas grids?",
  ],

  // Section 14: Resources
  resources: [
    {
      title: "MDN Web Docs: Geolocation API Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API",
    },
    {
      title: "MDN Web Docs: SVG Paths Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths",
    },
    { title: "web.dev: Caching Web Assets", url: "https://web.dev/cache-api-quick-guide/" },
  ],

  // Section 15: Next Project
  nextProject: {
    title: "Expense Tracker",
    slug: "expense-tracker",
    bridgeExplanation:
      "Now that you have built multi-endpoint dashboards, Project 5 focuses on advanced math operations and structured data modifications. You will build an expense tracker that handles dynamic item additions, updates balance calculations, and exports files using CSV format configurations.",
  },
};
