export interface Project {
  slug: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  concepts: string[];
  steps: string[];
  starter?: string;
  challenges: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "click-counter",
    title: "Click Counter",
    description: "Your first interactive widget — buttons, state, and the DOM.",
    difficulty: "Beginner",
    concepts: ["DOM selection", "Event listeners", "let / const"],
    steps: [
      "Create an index.html with a heading and a button.",
      "Add a <script> at the bottom.",
      "Select the button with querySelector.",
      "Add a click listener that increments a count and updates the heading.",
    ],
    challenges: ["Add a reset button.", "Persist the count in localStorage."],
  },
  {
    slug: "todo-app",
    title: "Todo App",
    description: "The classic — add, complete, delete, persist.",
    difficulty: "Beginner",
    concepts: ["Arrays", "map/filter", "localStorage", "Event delegation"],
    steps: [
      "Build the form (input + add button) and an empty <ul>.",
      "Keep a todos array in memory.",
      "Render the list from the array on every change.",
      "Save to localStorage; load on startup.",
    ],
    challenges: ["Add filters: all / active / done.", "Drag to reorder."],
  },
  {
    slug: "weather-app",
    title: "Weather App",
    description: "Practice fetch, async/await, and rendering API data.",
    difficulty: "Intermediate",
    concepts: ["fetch", "async/await", "Error handling"],
    steps: [
      "Pick a free weather API (Open-Meteo).",
      "Build a search input for a city name.",
      "Call the API in an async function with try/catch.",
      "Render temperature and conditions.",
    ],
    challenges: ["7-day forecast.", "Cache responses for 10 minutes."],
  },
  {
    slug: "markdown-previewer",
    title: "Markdown Previewer",
    description: "Type markdown on the left, see HTML on the right — instantly.",
    difficulty: "Intermediate",
    concepts: ["Input events", "Sanitization", "innerHTML"],
    steps: [
      "Two columns: textarea and a preview div.",
      "On input, parse markdown to HTML and render.",
      "Sanitize the result before injecting.",
    ],
    challenges: ["Syntax highlighting in code blocks.", "Export to .md file."],
  },
  {
    slug: "kanban-board",
    title: "Kanban Board",
    description: "Drag cards between columns. Built without any framework.",
    difficulty: "Advanced",
    concepts: ["Drag & Drop API", "State", "localStorage"],
    steps: [
      "Three columns: Todo / Doing / Done.",
      "Cards with draggable=true.",
      "Handle dragstart/dragover/drop to move cards.",
      "Persist on every change.",
    ],
    challenges: ["Add column reordering.", "Sync to a backend."],
  },
  {
    slug: "quiz-app",
    title: "Quiz App",
    description: "Multiple-choice quiz with score and review screen.",
    difficulty: "Intermediate",
    concepts: ["Arrays of objects", "Conditional rendering", "Timers"],
    steps: [
      "Define a questions array.",
      "Show one question at a time with options.",
      "Track score, then show a review screen.",
    ],
    challenges: ["Per-question countdown.", "Pull questions from a JSON file."],
  },
];
