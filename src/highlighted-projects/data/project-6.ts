import { HighlightedProject } from "./index";

export const project6: HighlightedProject = {
  slug: "kanban-board",
  projectNumber: 6,
  title: "Kanban Board",
  difficulty: "Advanced",
  estimatedTime: "12-14 Hours",
  technologiesUsed: [
    "HTML5 Drag & Drop API",
    "CSS Flexbox/Grid",
    "JavaScript State",
    "LocalStorage Persistence",
  ],
  conceptCount: 24,
  objective:
    "Build a Kanban board with draggable task cards, column controls, drop zone markers, and local state persistence.",
  realWorldRelevance:
    "Interactive boards require robust event handling and state syncs. Mastering drag-and-drop patterns without frameworks teaches you how browser coordinates and drag states operate in production apps.",

  // Section 1: Overview
  overview: {
    description:
      "A multi-column project board with draggable cards, column managers, custom card creators, and localized drag-and-drop status syncing.",
    whyItExists:
      "To master advanced user interactions and coordinate drag states. Dragging requires managing dragstart, dragover, dragleave, and drop events, identifying drop containers, updating nested task states, and re-rendering cards.",
    realWorldUsage:
      "Collaborative boards (Trello, Jira, Linear) and content planners. Any app with drag-to-reorder cards or dashboard components uses these techniques.",
    businessValue:
      "Highly interactive interfaces improve productivity by making actions intuitive. A fast, responsive drag-and-drop board makes user management tasks simple and efficient.",
    developerSkillsGained: [
      "Managing drag lifecycles using the HTML5 Drag & Drop API.",
      "Manipulating nested objects within state arrays.",
      "Designing responsive flexbox dashboard layouts.",
      "Creating accessible dynamic keyboard fallback options.",
    ],
    howItPreparesForReact:
      "React drag-and-drop systems (like React Beautiful DND or @dnd-kit) wrap native browser APIs. Writing these event hooks manually helps you understand how dragging coordinates translate to state updates, preparing you for complex UI interactions in React.",
    expectedFolderStructure: `kanban-board/
├── index.html
├── style.css
└── script.js`,
    expectedFinalUI:
      "A columns container displaying responsive Kanban columns (Todo, Doing, Done), cards with priority indicators, drag target placeholders, dynamic card creators, and edit modals.",
  },

  // Section 2: Learning Objectives
  learningObjectives: [
    "Configure draggable cards using the HTML5 draggable='true' attribute.",
    "Handle dragenter, dragover, dragleave, and drop event lifecycles on columns.",
    "Update column keys on target task objects dynamically inside state arrays.",
    "Style drop indicators to give immediate feedback when cards hover over columns.",
  ],

  // Section 3: Final Project Preview
  finalProjectPreview: {
    mockupImageDescription:
      "The Kanban Board UI showing task cards moving between columns, visual drop markers, and card creation inputs.",
    annotatedComponents: [
      {
        name: "Draggable Card Elements",
        description:
          "Task cards with draggable='true' attributes. They store task IDs and pass them to drag data transfers.",
      },
      {
        name: "Column Drop Zones",
        description:
          "Vertical board containers that listen for drag events, adding drop classes to show active drop targets.",
      },
      {
        name: "Drop Guide Placeholder",
        description:
          "A dotted outline indicator showing where a dragged card will land if dropped in a column.",
      },
      {
        name: "New Column Form",
        description:
          "A top panel input that lets users add custom columns to the board dynamically.",
      },
    ],
  },

  // Section 4: Concepts Covered
  conceptsCovered: {
    html: [
      "Draggable attributes (draggable='true')",
      "Custom dataset tagging (data-id, data-column)",
    ],
    css: [
      "Flexbox layout columns",
      "Grab cursor states (.grabbing, .grab)",
      "Drop target indicators",
    ],
    javascript: [
      "Data Transfer API mapping (setData, getData)",
      "Dynamic column state updates",
      "Array filtering, splicing, and mapping",
      "Event target delegation",
    ],
    browserApis: [
      "Drag & Drop API lifecycles",
      "JSON data serialization",
      "localStorage persistence",
    ],
    accessibility: [
      "Keyboard controls (Enter/Space to select, arrows to move cards)",
      "ARIA drag-and-drop state attributes",
    ],
    performance: [
      "Preventing layout thrashing by caching element dimensions",
      "Throttling dragover calculation updates",
    ],
    architecture: ["Decoupling DOM drag positions from state-syncing operations"],
  },

  // Section 5: Prerequisites
  prerequisites: [
    { title: "HTML Drag and Drop API", url: "/learn/html" },
    { title: "JavaScript State Objects", url: "/learn/javascript" },
    { title: "Advanced CSS Layout and Flexbox", url: "/learn/css" },
  ],

  // Section 6: Project Planning
  projectPlanning: {
    folderStructure: "A single workspace folder containing index.html, style.css, and script.js.",
    namingConventions:
      "BEM conventions for styling classes (e.g. '.board', '.board-column', '.board-card', '.drop-indicator').",
    componentBreakdown: [
      "Board Container: Holds columns horizontally.",
      "Column Panel: Displays task lists vertically.",
      "Task Card: Draggable card layout.",
      "Column Controller: Add columns dynamically.",
    ],
    dataFlow:
      "Drag card -> save task ID in dataTransfer -> hover over column -> show drop marker -> drop card -> read task ID -> update task column state -> re-render board.",
    stateFlow:
      "State is an object containing columns and tasks: { columns: string[], tasks: { id: number, title: string, column: string, description: string }[] }.",
    uiBreakdown:
      "Columns display draggable task cards, changing borders or backgrounds to indicate active drop targets when cards hover over them.",
    fileResponsibilities: [
      {
        file: "index.html",
        responsibility: "Defines board grids, sets column wrappers, and links scripts.",
      },
      {
        file: "style.css",
        responsibility: "Styles board grids, sets drag indicators, grab cursors, and drop colors.",
      },
      {
        file: "script.js",
        responsibility:
          "Handles drag events, dataTransfer mappings, card state updates, and re-renders.",
      },
    ],
  },

  // Section 7: Step-by-Step Build Guide
  buildGuide: [
    {
      phaseNumber: 1,
      title: "Set Draggable Cards and State Models",
      goal: "Initialize state data structures and configure draggable task elements.",
      why: "Managing cards inside JS arrays first ensures task data matches card representations in the DOM.",
      tasks: [
        "Create index.html with a board container and hardcoded columns.",
        "Initialize the tasks state array with mock task objects.",
        "Add draggable='true' to card HTML templates.",
        "Verify that dragging card elements displays shadow previews.",
      ],
      expectedOutcome:
        "Cards drag across the screen, showing transparent preview overlays while drag cursor shapes update.",
      miniSyntaxExamples: [
        {
          code: `<div class="task-card" draggable="true" data-id="1">
  <h4>Design API</h4>
</div>`,
          explanation:
            "Adding draggable='true' tells the browser that this element can initiate dragging sequences.",
        },
      ],
      architectureNotes:
        "Always assign unique IDs to draggable cards so the JS code can identify which card is moving.",
      commonMisconceptions:
        "Forgetting to add draggable='true' to card nodes makes dragging impossible, even with event listeners attached.",
    },
    {
      phaseNumber: 2,
      title: "Handle Drag Start and Data Transfer Mapping",
      goal: "Track card data when dragging starts.",
      why: "The DataTransfer object passes task IDs between source cards and destination columns during drag actions.",
      tasks: [
        "Add a dragstart listener to the board container.",
        "Save the dragged card ID in the dataTransfer object using e.dataTransfer.setData().",
        "Apply a styling class (e.g. '.dragging') to the card to indicate it is active.",
      ],
      expectedOutcome:
        "Dragging cards prints their ID to the console, and cards show styled states during moves.",
      miniSyntaxExamples: [
        {
          code: `card.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.dataset.id);
  e.target.classList.add('dragging');
});`,
          explanation:
            "Saves the card ID in dataTransfer and applies a styling class when dragging begins.",
        },
      ],
      architectureNotes:
        "Remove dragging styles (like .dragging) inside dragend handlers to restore cards to their normal appearance when dragging finishes.",
      commonMisconceptions:
        "Trying to store large objects in dataTransfer. Only store simple IDs to keep memory usage low and prevent data corruption.",
    },
    {
      phaseNumber: 3,
      title: "Design Drop Zones and Handle DragOver",
      goal: "Configure column nodes to accept drops, showing visual drop markers.",
      why: "Browsers default to blocking drops on HTML elements. You must prevent this default behavior to create active drop zones.",
      tasks: [
        "Add dragover event listeners to column containers.",
        "Call e.preventDefault() in the dragover handler to enable dropping.",
        "Add dragenter and dragleave listeners to toggle drop indicator styles.",
      ],
      expectedOutcome:
        "Hovering dragged cards over columns highlights them, showing active drop targets.",
      miniSyntaxExamples: [
        {
          code: `column.addEventListener('dragover', (e) => {
  e.preventDefault();
  column.classList.add('drag-over');
});
column.addEventListener('dragleave', () => {
  column.classList.remove('drag-over');
});`,
          explanation:
            "Prevents default behavior to allow drops and toggles styling classes to highlight drop targets.",
        },
      ],
      architectureNotes:
        "Style drop zones dynamically. Use subtle dashed outlines or solid borders to highlight active drop targets.",
      commonMisconceptions:
        "Forgetting to call preventDefault() in the dragover handler blocks drops, preventing drop events from firing.",
    },
    {
      phaseNumber: 4,
      title: "Process Drops and Update State",
      goal: "Retrieve card IDs on drop, updating task column states and re-rendering the board.",
      why: "Processing drop events maps cards back to data structures, ensuring changes persist across sessions.",
      tasks: [
        "Add a drop listener to column containers.",
        "Retrieve the dragged card ID using e.dataTransfer.getData().",
        "Update the target task column in the state array.",
        "Remove hover styles and call render() to refresh the board UI.",
      ],
      expectedOutcome: "Dropping cards in columns moves them, updating states and saving changes.",
      miniSyntaxExamples: [
        {
          code: `column.addEventListener('drop', (e) => {
  const id = Number(e.dataTransfer.getData('text/plain'));
  const task = tasks.find(t => t.id === id);
  task.column = column.dataset.name;
  render();
});`,
          explanation:
            "Retrieves the card ID from dataTransfer on drop, updates the task column, and re-renders the board.",
        },
      ],
      architectureNotes:
        "Save states dynamically. Call saveToLocalStorage() inside the drop handler to persist board layouts immediately.",
      commonMisconceptions:
        "Updating the DOM directly without updating the JS state array creates sync bugs between the UI and your data.",
    },
  ],

  // Section 8: Engineering Notes
  engineeringNotes: {
    whyProfessionalApproach:
      "Writing custom drag-and-drop code keeps applications fast and responsive, avoiding the weight of heavy third-party libraries.",
    alternativeApproaches:
      "You could use pre-built dragging libraries. However, this imports extra dependencies, slowing page loads for mobile users with spotty connections.",
    tradeoffs:
      "The native Drag & Drop API has limited support on mobile devices. To support touch inputs, you must implement touch event handlers (touchstart, touchmove, touchend) or use polyfills.",
    whenNotToUse:
      "Do not write custom drag-and-drop code for complex layouts (e.g. nestable list structures). In these cases, dedicated libraries handle coordinate calculations much more reliably.",
  },

  // Section 9: Common Mistakes
  commonMistakes: [
    {
      symptom: "Cards bounce back to their original columns and fail to drop.",
      cause: "The dragover event handler is missing standard preventDefault() calls.",
      fix: "Add e.preventDefault() to the dragover listener on columns.",
      whyItHappened:
        "Browsers treat elements as invalid drop zones by default. Preventing this default behavior enables drops.",
      howToAvoid: "Always call preventDefault() on dragover events.",
    },
    {
      symptom: "Hover styles apply to child elements, causing display issues.",
      cause:
        "Dragenter and dragleave events fire on cards inside columns, triggering hover styles incorrectly.",
      fix: "Track drag counts in variables, toggling classes only when the count changes relatives to column boundaries.",
      whyItHappened:
        "Browsers fire drag events on child elements, which can toggle classes on parent columns incorrectly.",
      howToAvoid:
        "Use transparent pointer-events on child cards during dragging, or track parent entry states.",
    },
  ],

  // Section 10: Debugging Workflow
  debuggingWorkflow: [
    {
      tool: "Console",
      scenario: "Verify drag event lifecycle states.",
      steps: [
        "Add log statements inside the dragstart, dragover, and drop event handlers.",
        "Verify that dataTransfer sets and retrieves card IDs correctly.",
        "Check that task objects update column parameters on drop.",
      ],
      whyThisWay:
        "Console logs help you trace the sequence of drag events to find where actions fail.",
    },
    {
      tool: "Sources",
      scenario: "Debug drop target coordinate matching.",
      steps: [
        "Open DevTools (F12) and select the Sources tab.",
        "Add a breakpoint inside the drop listener where column states update.",
        "Verify that column dataset names match task object parameters.",
      ],
      whyThisWay:
        "Step-by-step debugging lets you inspect variables on drop to catch bugs before rendering.",
    },
  ],

  // Section 11: Verification Checklist
  verificationChecklist: {
    functional: [
      "Task cards drag cleanly across the board.",
      "Dropping cards in columns moves tasks.",
      "New columns can be added dynamically.",
      "Card changes persist across page reloads.",
    ],
    responsive: [
      "Board columns fit horizontally on desktop and stack vertically on mobile.",
      "Card descriptions wrap correctly.",
    ],
    accessibility: [
      "Board supports keyboard alternatives for dragging tasks.",
      "Draggable elements have descriptive labels.",
    ],
    performance: [
      "Dragging is smooth and lag-free.",
      "Data changes save to localStorage without UI delays.",
    ],
    browserCompatibility: [
      "Drag-and-drop features work on modern browsers.",
      "App falls back gracefully on mobile touch devices.",
    ],
    codeOrganization: [
      "Drag handlers are organized and easy to maintain.",
      "DOM rendering is decoupled from drag logic.",
    ],
    naming: [
      "BEM class selectors are used consistently.",
      "Variables names are clear and descriptive.",
    ],
    completion: ["All requirements are met.", "No placeholder content exists."],
  },

  // Section 12: Stretch Challenges
  stretchChallenges: [
    "Implement touch events (touchstart, touchmove, touchend) to support dragging on mobile devices.",
    "Add a search bar to filter cards by title or tag dynamically.",
    "Display card counts at the top of each column.",
    "Add color selectors to categorize card priorities (High, Medium, Low).",
    "Allow users to edit card descriptions and titles inside a modal dialog on click.",
  ],

  // Section 13: Reflection
  reflectionQuestions: [
    "Why does the browser block drops on elements by default?",
    "How does the DataTransfer API pass variables during dragging?",
    "What issues might you run into when syncing board state in multi-user real-time apps?",
  ],

  // Section 14: Resources
  resources: [
    {
      title: "MDN Web Docs: HTML Drag and Drop API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API",
    },
    {
      title: "MDN Web Docs: DataTransfer API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer",
    },
    { title: "web.dev: Drag and Drop Interfaces", url: "https://web.dev/drag-and-drop/" },
  ],

  // Section 15: Next Project
  nextProject: null,
};
