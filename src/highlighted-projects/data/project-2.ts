import { HighlightedProject } from "./index";

export const project2: HighlightedProject = {
  slug: "advanced-todo-app",
  projectNumber: 2,
  title: "Advanced Todo App",
  difficulty: "Beginner",
  estimatedTime: "6-8 Hours",
  technologiesUsed: [
    "HTML5",
    "CSS Flexbox",
    "JavaScript (ES6 Arrays & Objects)",
    "JSON Serialization",
  ],
  conceptCount: 16,
  objective:
    "Create a todo manager with task categories, filter tabs, dynamic progress bars, and localized persistence.",
  realWorldRelevance:
    "Todo apps are the standard test for state. They teach you how to sync in-memory data structures with DOM representation—the core mechanism of all modern frameworks.",

  // Section 1: Overview
  overview: {
    description:
      "An interactive task manager featuring inline editing, category tagging, progress bars, and local storage state persistence.",
    whyItExists:
      "To teach state-driven rendering. Instead of scraping text from HTML elements to update values, you will manage an in-memory array of objects and update the UI based on changes to that array.",
    realWorldUsage:
      "Project management tools and task trackers. Any dashboard that updates lists dynamically based on user input uses these patterns.",
    businessValue:
      "Web applications must remain responsive. Fast updates without page refreshes improve user engagement and reduce churn in productivity tools.",
    developerSkillsGained: [
      "State management using JavaScript arrays of objects.",
      "Synchronous UI rendering from an in-memory data source.",
      "Event delegation for dynamically generated DOM elements.",
      "JSON data serialization for local storage caches.",
    ],
    howItPreparesForReact:
      "React is built on the rule that UI is a function of state: UI = f(state). In React, you will use hooks like useState to manage arrays. This project builds that muscle by forcing you to write the render() loop that syncs your data structure to the screen.",
    expectedFolderStructure: `todo-app/
├── index.html
├── style.css
└── script.js`,
    expectedFinalUI:
      "A centered card component with a task input form, a progress bar showing completion percentage, filter buttons (All, Pending, Completed), a list of task items with toggle and delete buttons, and an edit mode trigger.",
  },

  // Section 2: Learning Objectives
  learningObjectives: [
    "Manage app state in a single source of truth (array of task objects).",
    "Implement a complete render function that recreates list items from data state.",
    "Use event delegation to handle click events on list elements created at runtime.",
    "Serialize and deserialize complex objects using JSON.stringify() and JSON.parse().",
  ],

  // Section 3: Final Project Preview
  finalProjectPreview: {
    mockupImageDescription:
      "The Todo App showing a progress bar at 66% completion, active tasks, category labels, and the input field.",
    annotatedComponents: [
      {
        name: "Progress Indicator Bar",
        description:
          "A progress bar element whose width updates dynamically based on the percentage of completed tasks.",
      },
      {
        name: "Filter Navigation Tabs",
        description:
          "Buttons that change the filter state (All, Active, Completed), updating the visible items without modifying the underlying data.",
      },
      {
        name: "Dynamic Todo List Container",
        description:
          "An empty UL element populated by JS template literals. Handlers are attached using event delegation.",
      },
      {
        name: "Inline Edit Input",
        description:
          "Double-clicking a task replaces its text label with an input field to edit the task title directly.",
      },
    ],
  },

  // Section 4: Concepts Covered
  conceptsCovered: {
    html: ["Forms and Submit events", "Input element types (text, checkbox)"],
    css: [
      "Flexbox layout structures",
      "CSS state classes (e.g. .completed, .editing)",
      "Progress bar styling",
    ],
    javascript: [
      "Array methods (map, filter, reduce)",
      "Object manipulation (destructuring, updating key values)",
      "Event Delegation (event.target, closest())",
      "UUID generation or timestamp indexing",
    ],
    browserApis: ["JSON serialization (JSON.stringify, JSON.parse)", "localStorage persistence"],
    accessibility: [
      "Keyboard accessibility for forms (submitting on Enter)",
      "ARIA roles for custom list items and action buttons",
    ],
    performance: [
      "DOM Fragment creation or batched innerHTML updates",
      "Limiting duplicate query selections",
    ],
    architecture: [
      "Unidirectional data flow (State -> Render -> DOM -> Action -> Update State -> Re-render)",
    ],
  },

  // Section 5: Prerequisites
  prerequisites: [
    { title: "JavaScript Arrays and Objects", url: "/learn/javascript" },
    { title: "HTML Form Handling", url: "/learn/html" },
    { title: "CSS Flexbox Foundations", url: "/learn/css" },
  ],

  // Section 6: Project Planning
  projectPlanning: {
    folderStructure: "A single root folder containing index.html, style.css, and script.js.",
    namingConventions:
      "Class names should use a '.todo' namespace (e.g. '.todo-container', '.todo-list', '.todo-item') to keep styles organized.",
    componentBreakdown: [
      "Form Component: Text input and add button.",
      "Progress Card: Computes completion percentage.",
      "Filter Row: Filter buttons.",
      "List Container: Displays list items dynamically.",
    ],
    dataFlow:
      "User adds task -> JS pushes task object to array -> saves to localStorage -> triggers render() -> UI updates.",
    stateFlow:
      "State is an array of objects: { id: number, text: string, completed: boolean, category: string }. Filters are managed by a string state: 'all' | 'pending' | 'completed'.",
    uiBreakdown:
      "List displays elements based on the active filter state. Editing state displays an input field inside the item card.",
    fileResponsibilities: [
      {
        file: "index.html",
        responsibility: "Defines the app layout, forms, and empty containers.",
      },
      {
        file: "style.css",
        responsibility:
          "Handles styling, layout alignment, transition states, and visual overrides.",
      },
      {
        file: "script.js",
        responsibility:
          "Manages state array, handles browser events, serializes data, and triggers page re-renders.",
      },
    ],
  },

  // Section 7: Step-by-Step Build Guide
  buildGuide: [
    {
      phaseNumber: 1,
      title: "Design the Data Model and State Structure",
      goal: "Define the structure of the data array and how changes will trigger rendering.",
      why: "A single source of truth prevents the UI from going out of sync with the underlying application data.",
      tasks: [
        "Create an empty array called 'todos' in script.js.",
        "Define the structure of a todo object with id, text, and completed keys.",
        "Write a placeholder renderTodos() function to log the active state.",
      ],
      expectedOutcome:
        "The application initializes with an empty data structure ready to accept task entries.",
      miniSyntaxExamples: [
        {
          code: `let todos = [];
const addTodo = (text) => {
  const todo = { id: Date.now(), text, completed: false };
  todos.push(todo);
  render();
};`,
          explanation:
            "Pushes a new object with a unique timestamp ID to the state array and triggers the render loop.",
        },
      ],
      architectureNotes:
        "Always modify the array data first, then call your render function to update the screen. Never modify the DOM directly inside event handlers.",
      commonMisconceptions:
        "Trying to keep state in both the HTML text and a JavaScript array leads to sync bugs. The JS array must be the only source of truth.",
    },
    {
      phaseNumber: 2,
      title: "Write the Unidirectional Render Loop",
      goal: "Create a render function that generates HTML from the todos array.",
      why: "Regenerating the list view from data makes it easy to update, filter, and sort tasks dynamically.",
      tasks: [
        "Clear the list container innerHTML on every render call.",
        "Loop through the todos array using map() or forEach().",
        "Generate task markup with template literals, applying a '.completed' class if needed.",
        "Append the elements to the list container.",
      ],
      expectedOutcome:
        "Adding objects to the todos array in the console automatically updates the list layout on the screen.",
      miniSyntaxExamples: [
        {
          code: `const render = () => {
  todoList.innerHTML = todos.map(todo => \`
    <li data-id="\${todo.id}" class="\${todo.completed ? 'completed' : ''}">
      <span>\${todo.text}</span>
      <button class="delete-btn">Delete</button>
    </li>
  \`).join('');
};`,
          explanation:
            "Maps the tasks array to HTML template strings, joins them, and updates the list container.",
        },
      ],
      architectureNotes:
        "Set custom data-id attributes on list items so you can easily match DOM elements back to their JS objects.",
      commonMisconceptions:
        "Clearing innerHTML sounds slow, but modern browsers optimize this. It is clean and prevent state sync bugs.",
    },
    {
      phaseNumber: 3,
      title: "Implement Event Delegation",
      goal: "Use a single event listener on the parent container to handle actions on dynamic items.",
      why: "Attaching listeners to individual items uses more memory and fails when new items are added to the list.",
      tasks: [
        "Attach a click listener to the parent UL element.",
        "Check event.target to identify which button was clicked.",
        "Extract the item ID using event.target.closest('li').dataset.id.",
        "Update the target object in the todos array and trigger render().",
      ],
      expectedOutcome:
        "Clicking delete or toggle buttons on newly created tasks executes the correct actions.",
      miniSyntaxExamples: [
        {
          code: `todoList.addEventListener('click', (e) => {
  const id = Number(e.target.closest('li').dataset.id);
  if (e.target.classList.contains('delete-btn')) {
    todos = todos.filter(t => t.id !== id);
    render();
  }
});`,
          explanation:
            "Captures clicks bubbling up from dynamic child buttons, matches the target, filters the array, and updates the view.",
        },
      ],
      architectureNotes:
        "Use Event.closest() to climb up the DOM tree and locate the parent list item holding the data-id attribute.",
      commonMisconceptions:
        "Adding event listeners inside the render loop leads to memory leaks and duplicate handlers. Always use delegation.",
    },
    {
      phaseNumber: 4,
      title: "State Filtering and Progress Tracking",
      goal: "Filter visible tasks and update progress metrics without changing the source array.",
      why: "Users need to filter tasks and see their progress to manage work effectively.",
      tasks: [
        "Calculate the percentage of completed tasks using Array.reduce() or filter().",
        "Update the progress bar width and label text dynamically.",
        "Filter the todos array based on the active tab selection before rendering.",
      ],
      expectedOutcome:
        "Adding or completing tasks updates the progress bar, and clicking filters shows only the selected tasks.",
      miniSyntaxExamples: [
        {
          code: `const progress = todos.length 
  ? (todos.filter(t => t.completed).length / todos.length) * 100 
  : 0;
progressBar.style.width = \`\${progress}%\`;`,
          explanation:
            "Calculates the percentage of completed items and updates the CSS width property.",
        },
      ],
      architectureNotes:
        "Do not modify the source todos array when filtering. Create a temporary array copy containing only the filtered items to render.",
      commonMisconceptions:
        "Saving filtered lists to localStorage deletes non-matching tasks. Always save the source array, not the filtered view.",
    },
  ],

  // Section 8: Engineering Notes
  engineeringNotes: {
    whyProfessionalApproach:
      "Unidirectional data flow makes applications predictable. When the UI matches the data state, debugging is much easier.",
    alternativeApproaches:
      "You could manipulate HTML elements directly (e.g. deleting an LI node on click). However, this scatters the state across the DOM, making features like progress tracking or local storage sync difficult to maintain.",
    tradeoffs:
      "Re-rendering the entire list on every change is fine for small apps. For large lists with thousands of items, this can cause input lag. Frameworks solve this by only updating changed DOM nodes.",
    whenNotToUse:
      "Do not use client-side rendering for server-driven applications where SEO is required for list items. The server should pre-render the markup.",
  },

  // Section 9: Common Mistakes
  commonMistakes: [
    {
      symptom: "All tasks disappear when the page reload, even though local storage code exists.",
      cause: "Array state is initialized as an empty array instead of loading from localStorage.",
      fix: "Initialize the state array by checking if the cached key exists first.",
      whyItHappened:
        "Setting todos = [] resets the application state before the load function can run.",
      howToAvoid:
        "Use a ternary assignment: let todos = JSON.parse(localStorage.getItem('todos')) || [];",
    },
    {
      symptom: "Target ID returns undefined or NaN when clicking action elements.",
      cause: "Target ID is read as a string but compared to numeric timestamps in the array.",
      fix: "Convert the parsed string ID to a Number before performing searches or filters.",
      whyItHappened:
        "HTML data attributes are always strings, but ID keys generated with Date.now() are numbers.",
      howToAvoid: "Cast dataset keys using Number() or parseInt().",
    },
  ],

  // Section 10: Debugging Workflow
  debuggingWorkflow: [
    {
      tool: "Breakpoints",
      scenario: "Verify why the filter state is not updating.",
      steps: [
        "Open DevTools, navigate to the Sources tab, and open script.js.",
        "Add a breakpoint inside the render() function where filtering occurs.",
        "Interact with the app and step through the execution line-by-line to inspect variable values.",
      ],
      whyThisWay:
        "Breakpoints let you pause execution and inspect variables in their active context, which is cleaner than console logs.",
    },
    {
      tool: "Console",
      scenario: "Check array structure and content after action events.",
      steps: [
        "Type 'console.table(todos)' in the Console tab.",
        "Verify that item keys and values match expectations.",
        "Ensure boolean properties are correctly stored.",
      ],
      whyThisWay:
        "console.table displays array data in a clear grid, making it easy to spot mismatched values.",
    },
  ],

  // Section 11: Verification Checklist
  verificationChecklist: {
    functional: [
      "Task creation form adds new items to the list.",
      "Clicking a checkbox updates the task completed state.",
      "Delete buttons remove items from the array and screen.",
      "Filter tabs correctly display matching tasks.",
    ],
    responsive: [
      "Inputs and buttons wrap on small screen widths.",
      "List text does not overflow card containers.",
    ],
    accessibility: [
      "Forms submit on press of the Enter key.",
      "Input elements have corresponding labels or ARIA descriptions.",
    ],
    performance: [
      "No duplicate DOM query selections exist inside loops.",
      "HTML strings are batched before updating innerHTML.",
    ],
    browserCompatibility: [
      "JSON parsing does not throw exceptions on older browsers.",
      "LocalStorage operates cleanly without blocking.",
    ],
    codeOrganization: [
      "State-updating helper functions are separated from UI render methods.",
      "Template strings use clean, formatted indentation.",
    ],
    naming: [
      "Logical variables names (e.g. completedCount vs tempVal).",
      "CSS state modifier classes match standard conventions.",
    ],
    completion: ["Page is completely free of template layout content.", "App works offline."],
  },

  // Section 12: Stretch Challenges
  stretchChallenges: [
    "Add category tags (e.g. Work, Personal) and filter tasks by category.",
    "Implement double-click inline editing to update task text in place.",
    "Add a drag-and-drop feature to manually reorder tasks.",
    "Build a 'Clear Completed' button that removes all checked tasks at once.",
    "Create a due date field for tasks and sort the list by nearest deadline.",
  ],

  // Section 13: Reflection
  reflectionQuestions: [
    "Why is keeping state in JavaScript better than reading from the DOM directly?",
    "How does the render loop prevent state sync errors?",
    "What issues might you run into as the state array grows to thousands of elements?",
  ],

  // Section 14: Resources
  resources: [
    {
      title: "MDN Web Docs: Array.prototype.filter()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
    },
    {
      title: "MDN Web Docs: Event Delegation",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation",
    },
    {
      title: "javascript.info: LocalStorage and SessionStorage",
      url: "https://javascript.info/localstorage",
    },
  ],

  // Section 15: Next Project
  nextProject: {
    title: "Recipe Finder",
    slug: "recipe-finder",
    bridgeExplanation:
      "Now that you can manage local state arrays, Project 3 introduces asynchronous programming. You will transition from offline storage to fetching data from live remote APIs using promises, async/await, and error handling wrappers.",
  },
};
