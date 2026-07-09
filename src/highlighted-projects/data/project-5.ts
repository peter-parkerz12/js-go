import { HighlightedProject } from "./index";

export const project5: HighlightedProject = {
  slug: "expense-tracker",
  projectNumber: 5,
  title: "Expense Tracker",
  difficulty: "Advanced",
  estimatedTime: "10-12 Hours",
  technologiesUsed: [
    "HTML5",
    "CSS Grid/Flexbox",
    "JavaScript Array Methods",
    "Blob API",
    "CSV Export",
  ],
  conceptCount: 22,
  objective:
    "Build a financial ledger that registers transactions, calculates balances, and exports records using the Blob API.",
  realWorldRelevance:
    "Business platforms rely on math operations and report exporting. Writing data reduction scripts and client-side file downloads is a highly valued skill.",

  // Section 1: Overview
  overview: {
    description:
      "A transaction ledger that calculates income and expense balances, filters history categories, and exports ledger data to downloadable CSV sheets.",
    whyItExists:
      "To master data reduction and file generation. You will learn to calculate ledger metrics using Array.reduce(), validate numeric inputs, and build downloadable files in memory using browser Blobs.",
    realWorldUsage:
      "Billing portals, bookkeeping software, and inventory logs. Any layout that calculates dynamic sums and exports reports uses these structures.",
    businessValue:
      "Allowing users to export their data increases the value of your app. Client-side file generation reduces server load and protects user privacy by processing files locally.",
    developerSkillsGained: [
      "Calculating values from object arrays using Array.reduce().",
      "Generating download links dynamically using the Blob API and URL.createObjectURL().",
      "Validating numeric text fields for currency calculations.",
      "Manipulating lists of items using filter overlays.",
    ],
    howItPreparesForReact:
      "React applications use selectors or utility functions to compute summary data (such as cart totals or transaction sums) from state arrays. Building these calculations in vanilla JS helps you understand state reduction concepts, preparing you to write efficient selectors in React.",
    expectedFolderStructure: `expense-tracker/
├── index.html
├── style.css
└── script.js`,
    expectedFinalUI:
      "A top balance summary card showing total balance, income, and expenses, a transaction form with category selectors, a history list table with filter buttons, and a CSV export trigger button.",
  },

  // Section 2: Learning Objectives
  learningObjectives: [
    "Calculate balances from transaction arrays using advanced Array.prototype.reduce() methods.",
    "Formulate and compile raw CSV text strings from arrays of JavaScript objects.",
    "Instantiate and download client-side files using the Blob API and temporary anchor links.",
    "Filter transaction tables dynamically without mutating the source dataset.",
  ],

  // Section 3: Final Project Preview
  finalProjectPreview: {
    mockupImageDescription:
      "The Expense Tracker UI displaying balance cards, the transaction input form, filter tabs, a ledger table, and the CSV Export button.",
    annotatedComponents: [
      {
        name: "Ledger Summary Cards",
        description:
          "Cards showing current balance, total income, and total expenses. Values recalculate on every ledger update.",
      },
      {
        name: "Transaction Form Panel",
        description:
          "Form inputs (text description, number amount, category selector, transaction type toggle) that validate data on submit.",
      },
      {
        name: "Ledger History Table",
        description:
          "A list of transaction items. Income is styled in green, and expenses are styled in red, with delete buttons for each item.",
      },
      {
        name: "CSV Export Button",
        description:
          "A button that converts transaction data to a CSV string and downloads the file instantly using the Blob API.",
      },
    ],
  },

  // Section 4: Concepts Covered
  conceptsCovered: {
    html: [
      "Form input controls (number constraints, min/max)",
      "HTML tables (<thead>, <tbody>, <tr>, <td>)",
    ],
    css: [
      "Grid alignments for status cards",
      "Dynamic text color styles for numbers (e.g. positive vs negative)",
      "Responsive table overflow wrappers",
    ],
    javascript: [
      "Array.reduce() for calculations",
      "Array.filter() and Array.forEach()",
      "Object destructuring and initial values",
      "Floating point math correction (number.toFixed(2))",
    ],
    browserApis: [
      "Blob API constructor",
      "URL.createObjectURL() references",
      "HTMLAnchorElement trigger downloads",
    ],
    accessibility: [
      "Tab order mapping across financial forms",
      "ARIA descriptions for balance recalculations",
    ],
    performance: [
      "Efficient string conversions for large files",
      "Reducing DOM updates by batching list items",
    ],
    architecture: ["Decoupling calculation utilities from DOM updates"],
  },

  // Section 5: Prerequisites
  prerequisites: [
    { title: "JavaScript Array Methods", url: "/learn/javascript" },
    { title: "HTML Forms and Inputs", url: "/learn/html" },
    { title: "CSS Flexbox and Grid Patterns", url: "/learn/css" },
  ],

  // Section 6: Project Planning
  projectPlanning: {
    folderStructure: "A single workspace folder containing index.html, style.css, and script.js.",
    namingConventions:
      "BEM conventions for styling classes (e.g. '.ledger', '.ledger-summary', '.ledger-table', '.export-btn').",
    componentBreakdown: [
      "Summary Panel: Total balance, income, and expense cards.",
      "Input Form: Numeric inputs, dropdown selectors.",
      "Transaction Table: Lists all inputs dynamically.",
      "Export Block: Trigger buttons.",
    ],
    dataFlow:
      "Submit transaction -> validate fields -> push to transaction array -> recalculate values using reduce -> update DOM tables -> download CSV data.",
    stateFlow:
      "State structures: transactionsList (array of objects), activeCategoryFilter (string), sortingDirection (string).",
    uiBreakdown:
      "Balance summaries update automatically, list elements color-code text values, and dynamic buttons generate and trigger file downloads.",
    fileResponsibilities: [
      {
        file: "index.html",
        responsibility:
          "Defines transaction inputs, summary card blocks, and empty ledger table tags.",
      },
      {
        file: "style.css",
        responsibility:
          "Styles tabular outputs, color states, layout alignments, and card containers.",
      },
      {
        file: "script.js",
        responsibility:
          "Validates inputs, processes calculations with reduce, maps arrays to CSV strings, and triggers browser downloads.",
      },
    ],
  },

  // Section 7: Step-by-Step Build Guide
  buildGuide: [
    {
      phaseNumber: 1,
      title: "Transaction Data Modeler",
      goal: "Design transaction structures and validate user input fields.",
      why: "Financial ledgers require clean validation to prevent numeric entry errors that corrupt calculations.",
      tasks: [
        "Create an index.html form with inputs for description, amount, and category.",
        "Add HTML validation attributes (required, step='0.01').",
        "Write a submit listener that intercepts form submission.",
        "Create a transaction object with a description, positive/negative amount, and timestamp ID.",
      ],
      expectedOutcome:
        "Submitting forms generates structured transaction objects in the console, rejecting invalid inputs.",
      miniSyntaxExamples: [
        {
          code: `const amount = parseFloat(amountInput.value);
const transaction = {
  id: Date.now(),
  description: descInput.value,
  amount: type === 'expense' ? -amount : amount,
  category: categorySelect.value
};`,
          explanation:
            "Converts the amount string to a decimal float, assigning a negative value for expenses to simplify ledger calculations.",
        },
      ],
      architectureNotes:
        "Always parse input values using parseFloat or parseInt before calculations. HTML input values are returned as strings, which can cause concatenation bugs.",
      commonMisconceptions:
        "Relying purely on HTML5 form validation. Always double-check validation in JavaScript to prevent bad data from corrupting your state.",
    },
    {
      phaseNumber: 2,
      title: "Aggregate Totals with Array.reduce()",
      goal: "Recalculate balances, total income, and total expenses whenever transaction lists change.",
      why: "Using Array.reduce() calculates totals in a single, predictable step, keeping financial summaries accurate.",
      tasks: [
        "Write updateCalculations() to process the transactions array.",
        "Use reduce() to compute total income and total expenses.",
        "Update the balance cards in the DOM with the calculated values.",
        "Format numeric strings using toFixed(2) to show correct currency values.",
      ],
      expectedOutcome:
        "Adding transactions updates the balance, income, and expense summary cards automatically.",
      miniSyntaxExamples: [
        {
          code: `const totals = transactions.reduce((acc, item) => {
  if (item.amount > 0) acc.income += item.amount;
  else acc.expense += Math.abs(item.amount);
  return acc;
}, { income: 0, expense: 0 });
const balance = totals.income - totals.expense;`,
          explanation:
            "Iterates through transactions using reduce, summing income and expenses into an accumulator object, then calculating the balance.",
        },
      ],
      architectureNotes:
        "Correct javascript floating-point arithmetic errors (like 0.1 + 0.2 = 0.30000000000000004) by rounding values with toFixed(2) before updating the DOM.",
      commonMisconceptions:
        "Using global loops (like for or while) to recalculate totals. Reduce is cleaner, more expressive, and standard for state calculations.",
    },
    {
      phaseNumber: 3,
      title: "Generate CSV Files with the Blob API",
      goal: "Convert the transactions array to a CSV string and compile it using the Blob API.",
      why: "Enabling users to export data locally improves utility and protects privacy by keeping calculations client-side.",
      tasks: [
        "Create headers (ID, Description, Amount, Category) for the CSV format.",
        "Map the transactions array to comma-separated text lines.",
        "Instantiate a Blob object containing this CSV string.",
        "Generate a download URL using URL.createObjectURL().",
      ],
      expectedOutcome:
        "Clicking export generates a CSV data URL, preparing the browser for download.",
      miniSyntaxExamples: [
        {
          code: `const csvRows = [
  ['ID', 'Description', 'Amount', 'Category'],
  ...transactions.map(t => [t.id, t.description, t.amount, t.category])
];
const csvContent = csvRows.map(r => r.join(',')).join('\\n');
const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });`,
          explanation:
            "Maps the transactions array to a grid structure, joins rows with commas, and instantiates a Blob of type text/csv.",
        },
      ],
      architectureNotes:
        "Ensure comma-containing descriptions (like 'Grocery, Target') are wrapped in double quotes to prevent breaking the CSV formatting.",
      commonMisconceptions:
        "Saving binary files directly to disk using plain script files. You must use Blobs to handle in-memory data exports.",
    },
    {
      phaseNumber: 4,
      title: "Trigger Client-Side File Downloads",
      goal: "Create a temporary anchor tag in JavaScript to trigger the CSV file download.",
      why: "Modern browsers require clicking a link to start file downloads, which you can automate in JavaScript.",
      tasks: [
        "Create an anchor element (<a>) in JavaScript.",
        "Set the 'href' attribute to the generated Blob URL.",
        "Assign a file name (e.g. 'transactions.csv') using the 'download' attribute.",
        "Append the anchor link to the body, trigger a click(), and remove the link immediately.",
      ],
      expectedOutcome:
        "Clicking the export button downloads a 'transactions.csv' file that opens in Excel or Google Sheets.",
      miniSyntaxExamples: [
        {
          code: `const link = document.createElement('a');
const url = URL.createObjectURL(blob);
link.setAttribute('href', url);
link.setAttribute('download', 'ledger.csv');
document.body.appendChild(link);
link.click();
document.body.removeChild(link);`,
          explanation:
            "Creates a temporary link, binds the Blob URL, sets the file name, simulates a user click to trigger download, and cleans up the DOM.",
        },
      ],
      architectureNotes:
        "Always call URL.revokeObjectURL(url) after download triggers to free up memory allocated for the file in the browser.",
      commonMisconceptions:
        "Forgetting to remove the temporary link from the DOM, which can bloat the document tree.",
    },
  ],

  // Section 8: Engineering Notes
  engineeringNotes: {
    whyProfessionalApproach:
      "Using the Blob API to download files locally is fast, secure, and works offline, avoiding the need for server-side file generation.",
    alternativeApproaches:
      "You could send transaction data to a backend server to generate and return a CSV file. However, this increases server load, costs, and bandwidth usage.",
    tradeoffs:
      "Local CSV export works well for flat datasets. For complex structures with nested objects, JSON export or structured PDF generators are better options.",
    whenNotToUse:
      "Do not use client-side file generation for large databases. Generating files with millions of rows in memory can crash the browser tab.",
  },

  // Section 9: Common Mistakes
  commonMistakes: [
    {
      symptom: "CSV columns are misaligned when fields contain commas or special characters.",
      cause:
        "Fields containing commas are written directly without quotes, breaking cell boundaries.",
      fix: "Sanitize strings, wrapping description values in double quotes before mapping rows.",
      whyItHappened:
        "CSV parsing engines treat commas as cell dividers. An unescaped comma shifts subsequent text to the next column.",
      howToAvoid: 'Escape commas: const escape = val => `"${String(val).replace(/"/g, \'""\')}"`;',
    },
    {
      symptom:
        "Recalculated totals show incorrect values or concatenate text strings (e.g. '0.00100200').",
      cause: "Form inputs are read as text strings instead of numeric floats before addition.",
      fix: "Ensure all currency fields are converted using parseFloat() before calculations.",
      whyItHappened:
        "The + operator concatenates strings in JavaScript, but adds numbers. String variables are combined ('10' + '20' = '1020') instead of summed.",
      howToAvoid: "Cast inputs to numbers: const num = Number(input.value) || 0;",
    },
  ],

  // Section 10: Debugging Workflow
  debuggingWorkflow: [
    {
      tool: "Console",
      scenario: "Verify accumulator states during reduce cycles.",
      steps: [
        "Add log statements inside the reduce callback to inspect the accumulator step-by-step.",
        "Verify that income and expense variables sum correctly on each iteration.",
        "Check that initial values are set correctly.",
      ],
      whyThisWay:
        "Logging the accumulator state helps you trace arithmetic bugs at specific array indexes.",
    },
    {
      tool: "Sources",
      scenario: "Debug Blob creation and download link triggers.",
      steps: [
        "Open DevTools (F12) and select the Sources tab.",
        "Set a breakpoint inside the export function where the Blob URL is generated.",
        "Step through execution and verify that the file name and URL string are correctly formatted.",
      ],
      whyThisWay:
        "Breakpoints let you inspect temporary elements (like the hidden anchor link) before they are removed from the DOM.",
    },
  ],

  // Section 11: Verification Checklist
  verificationChecklist: {
    functional: [
      "Submit forms add transaction cards to the list.",
      "Totals, income, and expense summaries calculate correctly.",
      "Export button downloads a CSV file with valid header labels.",
      "CSV rows display accurate values.",
    ],
    responsive: [
      "Table elements scroll horizontally on mobile screen widths without breaking parent cards.",
      "Ledger forms resize cleanly.",
    ],
    accessibility: [
      "All numeric values use matching descriptive labels for screen readers.",
      "Contrast ratios remain high in both light and dark themes.",
    ],
    performance: [
      "DOM nodes are batched to avoid rendering bottlenecks.",
      "Blob objects are cleaned up using revokeObjectURL.",
    ],
    browserCompatibility: [
      "Blob downloads work on modern browsers.",
      "Float parsing functions handle regional decimal separators gracefully.",
    ],
    codeOrganization: [
      "Math calculations are clean and decoupled from display code.",
      "Event listeners are consolidated using delegation.",
    ],
    naming: [
      "CSS ledger layout selectors are named descriptively.",
      "CSV export helpers use clean verbs.",
    ],
    completion: ["No placeholder content exists.", "The app works offline."],
  },

  // Section 12: Stretch Challenges
  stretchChallenges: [
    "Add sorting buttons to the ledger columns (sort by Date, Amount, or Category).",
    "Filter transactions dynamically by type (All, Income, Expense) using filter buttons.",
    "Parse imported CSV files using the FileReader API to load external transactions.",
    "Display category summaries using dynamic SVG charts.",
    "Set monthly spending limits, showing warning alerts when expenses exceed the threshold.",
  ],

  // Section 13: Reflection
  reflectionQuestions: [
    "Why is Array.reduce() preferred over for loops for calculations?",
    "How does the Blob API allow browsers to generate and download files without a backend?",
    "What issues occur if floating point numbers are not rounded during financial calculations?",
  ],

  // Section 14: Resources
  resources: [
    {
      title: "MDN Web Docs: Array.prototype.reduce()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
    },
    {
      title: "MDN Web Docs: Blob API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Blob",
    },
    { title: "web.dev: File Downloads", url: "https://web.dev/read-files/" },
  ],

  // Section 15: Next Project
  nextProject: {
    title: "Kanban Board",
    slug: "kanban-board",
    bridgeExplanation:
      "Now that you can manage data calculations and list states, the final project introduces advanced UI interactions. You will build a kanban board that coordinates complex states across columns, using browser Drag and Drop APIs to move tasks, simulating the core operations of modern project management tools.",
  },
};
