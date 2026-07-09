export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "tip" | "warn" | "info"; text: string }
  | { type: "code"; lang: "js" | "ts" | "html" | "css"; code: string; title?: string };

export interface Lesson {
  slug: string;
  track: "html" | "css" | "javascript";
  phase: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  prerequisites: string[];
  objectives: string[];
  tags: string[];
  analogy?: string;
  body: Block[];
  mistakes?: string[];
  bestPractices?: string[];
  practice?: string[];
  quiz?: { q: string; choices: string[]; answer: number; explain: string }[];
  summary: string;
  related?: string[];
}

const c = (lang: Block & { type: "code" }) => lang;

export const LESSONS: Lesson[] = [
  // ──────────────────────────── HTML ────────────────────────────
  {
    slug: "html-basics",
    track: "html",
    phase: "HTML Fundamentals",
    title: "HTML Basics — Your First Page",
    description: "Tags, elements, attributes, and the structure of every web page.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    prerequisites: [],
    objectives: [
      "Understand what HTML is and why it exists",
      "Write a valid HTML5 document from scratch",
      "Use the most common tags correctly",
    ],
    tags: ["html", "fundamentals"],
    analogy:
      "HTML is the skeleton of a webpage. CSS is the skin and clothes. JavaScript is the muscles that move it.",
    body: [
      {
        type: "p",
        text: "HTML (HyperText Markup Language) describes the structure of a page using tags. A browser reads those tags and turns them into the layout you see.",
      },
      { type: "h", text: "The minimal HTML5 document" },
      {
        type: "code",
        lang: "html",
        title: "index.html",
        code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, web</h1>
    <p>I am learning HTML.</p>
  </body>
</html>`,
      },
      { type: "h", text: "Tags, elements, attributes" },
      {
        type: "p",
        text: "A tag wraps content: <p>hi</p>. An element is the tag plus its content. Attributes (like lang, href, src) configure an element.",
      },
    ],
    mistakes: [
      "Forgetting the doctype, which puts browsers in quirks mode.",
      "Skipping the viewport meta — your page will not be mobile-friendly.",
    ],
    bestPractices: ["One <h1> per page.", "Always set lang on <html>."],
    practice: ["Build a personal bio page with a heading, paragraph, and an image."],
    summary:
      "HTML uses tags to give a page structure. Start with the HTML5 boilerplate every time.",
    related: ["semantic-html", "html-forms"],
  },
  {
    slug: "semantic-html",
    track: "html",
    phase: "HTML Fundamentals",
    title: "Semantic HTML",
    description: "Use the right tag for the right job — for accessibility, SEO, and clarity.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    prerequisites: ["html-basics"],
    objectives: ["Replace generic <div> with meaningful tags", "Improve accessibility for free"],
    tags: ["html", "a11y", "seo"],
    body: [
      {
        type: "p",
        text: "Semantic tags describe meaning, not just appearance. Screen readers, search engines, and future-you will thank you.",
      },
      {
        type: "code",
        lang: "html",
        code: `<header>...</header>
<nav>...</nav>
<main>
  <article>
    <h1>Title</h1>
    <section>...</section>
  </article>
  <aside>...</aside>
</main>
<footer>...</footer>`,
      },
    ],
    bestPractices: [
      "Use <button> for actions, <a> for navigation.",
      "Wrap each page's primary content in one <main>.",
    ],
    summary: "Choose tags by meaning. Reach for <div> only when no semantic tag fits.",
  },
  {
    slug: "html-forms",
    track: "html",
    phase: "HTML Fundamentals",
    title: "Forms & Inputs",
    description:
      "Collect user input the right way with labels, validation, and accessibility built-in.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    prerequisites: ["html-basics"],
    objectives: ["Build accessible forms", "Use built-in validation", "Understand FormData"],
    tags: ["html", "forms"],
    body: [
      {
        type: "code",
        lang: "html",
        code: `<form id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="age">Age</label>
  <input id="age" name="age" type="number" min="13" required />

  <button type="submit">Sign up</button>
</form>`,
      },
      {
        type: "p",
        text: "Always pair an <input> with a <label>. The browser handles required, type, min, max, pattern — for free.",
      },
    ],
    summary:
      "Use the right input type and a real <label>. Most validation is already in the browser.",
  },
  {
    slug: "html-accessibility",
    track: "html",
    phase: "HTML Fundamentals",
    title: "Accessibility Essentials",
    description: "Build pages that work for everyone — keyboard users, screen readers, and beyond.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    prerequisites: ["semantic-html"],
    objectives: ["Add alt text", "Use ARIA only when needed", "Check keyboard navigation"],
    tags: ["html", "a11y"],
    body: [
      {
        type: "list",
        items: [
          'Every <img> needs alt text. Decorative images use alt="".',
          "Every interactive element must be reachable with Tab.",
          "Color is not enough — pair color with text or icons.",
          "Use ARIA to enhance, not replace, native semantics.",
        ],
      },
    ],
    summary: "Accessible HTML is just well-written HTML. Use semantic tags and label everything.",
  },

  // ──────────────────────────── CSS ────────────────────────────
  {
    slug: "css-selectors",
    track: "css",
    phase: "CSS Fundamentals",
    title: "Selectors & Specificity",
    description: "Target elements precisely and predict which rule wins.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    prerequisites: [],
    objectives: ["Use class, id, attribute, pseudo-class selectors", "Read specificity scores"],
    tags: ["css", "fundamentals"],
    body: [
      {
        type: "code",
        lang: "css",
        code: `/* element */
p { color: gray; }
/* class */
.card { padding: 1rem; }
/* id */
#hero { font-size: 3rem; }
/* attribute */
input[type="email"] { border-color: hotpink; }
/* pseudo-class */
button:hover { transform: translateY(-2px); }`,
      },
      {
        type: "p",
        text: "Specificity is counted as (inline, id, class, element). A higher number wins. !important overrides everything — avoid it.",
      },
    ],
    summary: "Prefer classes. Reach for id and !important rarely.",
  },
  {
    slug: "css-box-model",
    track: "css",
    phase: "CSS Fundamentals",
    title: "The Box Model",
    description: "Every element is a box: content, padding, border, margin.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    prerequisites: ["css-selectors"],
    objectives: ["Understand box-sizing", "Predict element width"],
    tags: ["css", "layout"],
    body: [
      {
        type: "code",
        lang: "css",
        code: `*, *::before, *::after { box-sizing: border-box; }

.card {
  width: 320px;
  padding: 16px;
  border: 2px solid black;
  margin: 24px;
}`,
      },
      {
        type: "p",
        text: "With border-box, width includes padding and border. With the default content-box, width is only the content — easy to make off-by-pixel mistakes.",
      },
    ],
    summary: "Set box-sizing: border-box globally. Your math will always work.",
  },
  {
    slug: "css-flexbox",
    track: "css",
    phase: "CSS Fundamentals",
    title: "Flexbox",
    description: "1D layout for nav bars, cards, toolbars, and centering anything.",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    prerequisites: ["css-box-model"],
    objectives: ["Align and distribute items", "Build a responsive nav"],
    tags: ["css", "flexbox"],
    body: [
      {
        type: "code",
        lang: "css",
        code: `.row {
  display: flex;
  align-items: center;     /* vertical */
  justify-content: space-between; /* horizontal */
  gap: 1rem;
}`,
      },
      {
        type: "p",
        text: "Flex containers control children with align-items, justify-content, and gap. Children control themselves with flex-grow, flex-shrink, flex-basis.",
      },
    ],
    summary: "Flexbox = one-dimensional layouts. Reach for it first.",
  },
  {
    slug: "css-grid",
    track: "css",
    phase: "CSS Fundamentals",
    title: "CSS Grid",
    description: "2D layout for full page structures and complex bento layouts.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    prerequisites: ["css-flexbox"],
    objectives: ["Build a bento-style dashboard", "Use auto-fit and minmax"],
    tags: ["css", "grid"],
    body: [
      {
        type: "code",
        lang: "css",
        code: `.bento {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.tall { grid-row: span 2; }
.wide { grid-column: span 2; }`,
      },
    ],
    summary: "Grid for 2D layouts. Combine with flexbox inside cells.",
  },

  // ──────────────────── JAVASCRIPT — PHASE 1 ────────────────────
  {
    slug: "what-is-javascript",
    track: "javascript",
    phase: "Foundations",
    title: "What is JavaScript?",
    description: "The language that makes the web interactive — a beginner-friendly tour.",
    difficulty: "Beginner",
    estimatedTime: "6 min",
    prerequisites: [],
    objectives: [
      "Understand what JS does in a browser",
      "Know where JS runs (browser, Node, edge)",
      "Run your first script",
    ],
    tags: ["js", "intro"],
    analogy:
      "If HTML is the building and CSS is the paint, JavaScript is the electricity that turns the lights on.",
    body: [
      {
        type: "p",
        text: "JavaScript is a programming language created in 1995 by Brendan Eich. It runs in every browser, on servers (Node.js), and even on edge functions. It is the most-used language on the planet — for good reason.",
      },
      { type: "h", text: "Run your first line" },
      {
        type: "code",
        lang: "html",
        code: `<!doctype html>
<html>
  <body>
    <h1 id="t">Hi</h1>
    <script>
      document.getElementById("t").textContent = "Hello from JavaScript!";
    </script>
  </body>
</html>`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "Open the browser DevTools console (F12) and type 1 + 1. Anything you can do in JS, you can try there.",
      },
    ],
    summary: "JavaScript runs everywhere and powers interactivity on every modern website.",
    related: ["how-js-works", "variables"],
  },
  {
    slug: "how-js-works",
    track: "javascript",
    phase: "Foundations",
    title: "How JavaScript Actually Works",
    description: "Engines, the call stack, execution context — a clear mental model.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    prerequisites: ["what-is-javascript"],
    objectives: [
      "Explain what an engine does",
      "Read a call stack",
      "Know what an execution context is",
    ],
    tags: ["js", "engine"],
    analogy:
      "Think of the JS engine as a chef. The call stack is the order ticket queue. Each ticket (function call) is finished before the next is started.",
    body: [
      {
        type: "p",
        text: "A JavaScript engine (V8 in Chrome and Node, SpiderMonkey in Firefox, JavaScriptCore in Safari) reads your code, compiles it to fast machine code, and runs it.",
      },
      { type: "h", text: "The call stack" },
      {
        type: "code",
        lang: "js",
        code: `function greet(name) {
  return "Hi " + name;
}
function main() {
  const msg = greet("Sam");  // pushed on stack
  console.log(msg);
}
main(); // main() then greet() then back to main()`,
      },
      {
        type: "p",
        text: "Every function call pushes a frame onto the call stack. When it returns, the frame pops off. JavaScript is single-threaded — only one frame runs at a time.",
      },
    ],
    summary: "JS = engine + stack + a single thread of execution. We will add async on top later.",
  },
  {
    slug: "variables",
    track: "javascript",
    phase: "Foundations",
    title: "Variables: let, const, var",
    description: "How to store values — and which keyword to reach for.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    prerequisites: ["what-is-javascript"],
    objectives: ["Declare with const by default", "Use let for reassignment", "Avoid var"],
    tags: ["js", "variables"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `const name = "Ada";        // cannot be reassigned
let score = 0;             // can be reassigned
score = 10;

// avoid var — function-scoped, hoisted, surprising
var legacy = "old code";`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "Default to const. Switch to let only when you actually reassign. Never use var in new code.",
      },
      { type: "h", text: "Block scope" },
      {
        type: "code",
        lang: "js",
        code: `if (true) {
  const inside = 1;
}
// console.log(inside); // ReferenceError — block-scoped`,
      },
    ],
    mistakes: [
      "Using var and getting unexpected hoisting bugs.",
      "Reassigning a const (TypeError).",
    ],
    bestPractices: ["const by default, let when needed, var never."],
    summary: "const → let → (never var). Block scope keeps your code predictable.",
  },
  {
    slug: "data-types",
    track: "javascript",
    phase: "Foundations",
    title: "Data Types",
    description: "Strings, numbers, booleans, null, undefined, symbol, bigint — and objects.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    prerequisites: ["variables"],
    objectives: ["Name the 7 primitives", "Understand reference vs value", "Use typeof"],
    tags: ["js", "types"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `typeof "hi";       // "string"
typeof 42;         // "number"
typeof 9007199254740993n; // "bigint"
typeof true;       // "boolean"
typeof undefined;  // "undefined"
typeof null;       // "object"  ← historic bug
typeof Symbol();   // "symbol"
typeof {a:1};      // "object"
typeof function(){}; // "function"`,
      },
      {
        type: "p",
        text: "Primitives are copied by value. Objects (and arrays, functions) are passed by reference.",
      },
      {
        type: "code",
        lang: "js",
        code: `let a = 1;
let b = a;       // copy
b = 2;
a; // 1

const x = { n: 1 };
const y = x;     // same reference
y.n = 99;
x.n; // 99`,
      },
    ],
    summary: "7 primitives + objects. Primitives are copied; objects share references.",
  },
  {
    slug: "type-coercion",
    track: "javascript",
    phase: "Foundations",
    title: "Type Coercion & Equality",
    description: 'Why "5" + 1 is "51" and why you should always use ===.',
    difficulty: "Beginner",
    estimatedTime: "8 min",
    prerequisites: ["data-types"],
    objectives: ["Predict implicit conversions", "Use === and !=="],
    tags: ["js", "types"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `"5" + 1;   // "51"  (number → string, concatenation)
"5" - 1;   // 4     (string → number)
true + 1;  // 2
[] + [];   // ""
[] + {};   // "[object Object]"

1 == "1";  // true   (coerces, surprising)
1 === "1"; // false  (strict, predictable)`,
      },
      {
        type: "callout",
        tone: "warn",
        text: "Always use === and !==. Coercion has too many edge cases.",
      },
    ],
    summary: "Use ===. Convert types explicitly with Number(), String(), Boolean().",
  },

  // ──────────────────── PHASE 3: OPERATORS ────────────────────
  {
    slug: "operators",
    track: "javascript",
    phase: "Operators",
    title: "Operators: Arithmetic, Comparison, Logical",
    description: "The symbols that make JavaScript do math, compare, and decide.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    prerequisites: ["variables"],
    objectives: [
      "Use arithmetic operators correctly",
      "Choose == vs ===",
      "Master logical operators",
    ],
    tags: ["js", "operators"],
    analogy: "Operators are the verbs of programming. They tell values what to do with each other.",
    body: [
      { type: "h", text: "Arithmetic Operators" },
      {
        type: "code",
        lang: "js",
        code: `5 + 3;    // 8  (addition)
10 - 4;   // 6  (subtraction)
3 * 7;    // 21 (multiplication)
20 / 4;   // 5  (division)
15 % 4;   // 3  (modulo - remainder)
2 ** 3;   // 8  (exponentiation)`,
      },
      { type: "h", text: "Assignment Operators" },
      {
        type: "code",
        lang: "js",
        code: `let x = 5;    // assign
x += 3;      // x = x + 3 → 8
x -= 2;      // x = x - 2 → 6
x *= 4;      // x = x * 4 → 24
x /= 3;      // x = x / 3 → 8
x %= 5;      // x = x % 5 → 3
x **= 2;     // x = x ** 2 → 9`,
      },
      { type: "h", text: "Comparison Operators" },
      {
        type: "code",
        lang: "js",
        code: `5 == "5";   // true  (loose equality, coerces)
5 === "5";  // false (strict equality, no coercion)
5 != "5";   // false
5 !== "5";  // true

10 > 5;     // true
10 >= 10;   // true
3 < 7;      // true
3 <= 2;     // false`,
      },
      {
        type: "callout",
        tone: "warn",
        text: "Always use === and !==. == and != cause bugs through unexpected coercion.",
      },
      { type: "h", text: "Logical Operators" },
      {
        type: "code",
        lang: "js",
        code: `true && false;  // false (AND - both must be true)
true || false;  // true  (OR - at least one true)
!true;          // false (NOT - flips the value)

// Short-circuit evaluation
const user = { name: "Ada" };
const displayName = user.name || "Anonymous"; // "Ada"
const admin = user.isAdmin && "Admin";        // false`,
      },
      { type: "h", text: "Nullish Coalescing & Optional Chaining" },
      {
        type: "code",
        lang: "js",
        code: `// Nullish coalescing (??) - only null/undefined trigger fallback
const theme = user.theme ?? "light"; // "light" if theme is null/undefined

// Optional chaining (?.) - safe property access
const city = user?.address?.city; // undefined if user or address is null`,
      },
      { type: "h", text: "Bitwise Operators" },
      {
        type: "code",
        lang: "js",
        code: `5 & 3;   // 1  (bitwise AND)
5 | 3;   // 7  (bitwise OR)
5 ^ 3;   // 6  (bitwise XOR)
~5;      // -6 (bitwise NOT)
5 << 1;  // 10 (left shift)
5 >> 1;  // 2  (right shift)`,
      },
      { type: "h", text: "Other Operators" },
      {
        type: "code",
        lang: "js",
        code: `// typeof
typeof "hello"; // "string"
typeof 42;      // "number"

// instanceof
[] instanceof Array;  // true

// in
"name" in user;       // true if user has name property

// delete
delete user.age;      // removes property

// void
void 0;               // undefined (useful for IIFEs)

// comma
let a = (1, 2, 3);    // a = 3 (returns last value)`,
      },
    ],
    mistakes: [
      "Using == instead of ===",
      "Forgetting that && and || short-circuit",
      "Confusing nullish coalescing with logical OR",
    ],
    bestPractices: [
      "Use === for equality",
      "Use ?. for safe property access",
      "Use ?? for null/undefined defaults",
    ],
    practice: ["Write expressions using different operators", "Debug operator precedence issues"],
    summary: "Master operators to control data flow. Always ===, often && and ||, sometimes ??.",
  },

  // ──────────────────── PHASE 4: CONTROL FLOW ────────────────────
  {
    slug: "control-flow",
    track: "javascript",
    phase: "Control Flow",
    title: "Control Flow: if, switch, loops",
    description: "Make decisions and repeat actions — the logic of programming.",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    prerequisites: ["operators"],
    objectives: [
      "Use if/else for decisions",
      "Choose switch for multiple options",
      "Master all loop types",
    ],
    tags: ["js", "control-flow"],
    analogy:
      "Control flow is the traffic director. It decides which path your code takes and how many times to loop.",
    body: [
      { type: "h", text: "Statements vs Expressions" },
      {
        type: "p",
        text: "Statements do things (if, for). Expressions produce values (1 + 2, func()). Most JavaScript is expressions.",
      },
      { type: "h", text: "if / else if / else" },
      {
        type: "code",
        lang: "js",
        code: `const age = 25;

if (age < 18) {
  console.log("Too young");
} else if (age < 65) {
  console.log("Working age");
} else {
  console.log("Retired");
}

// Ternary operator (expression)
const status = age >= 18 ? "adult" : "minor";`,
      },
      { type: "h", text: "switch Statement" },
      {
        type: "code",
        lang: "js",
        code: `const day = "monday";

switch (day) {
  case "monday":
    console.log("Start of work week");
    break;
  case "friday":
    console.log("TGIF!");
    break;
  case "saturday":
  case "sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Midweek");
}

// Modern alternative with if/else
if (day === "monday") {
  // ...
}`,
      },
      { type: "h", text: "for Loop" },
      {
        type: "code",
        lang: "js",
        code: `// Traditional for
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// for...of (iterables)
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

// for...in (object properties)
const user = { name: "Ada", age: 30 };
for (const key in user) {
  console.log(key, user[key]);
}`,
      },
      { type: "h", text: "while and do...while" },
      {
        type: "code",
        lang: "js",
        code: `// while - check condition first
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}

// do...while - run at least once
do {
  console.log("Runs once");
} while (false);`,
      },
      { type: "h", text: "break and continue" },
      {
        type: "code",
        lang: "js",
        code: `// break - exit loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break; // stops at 5
  console.log(i);
}

// continue - skip iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue; // skips 2
  console.log(i); // 0, 1, 3, 4
}`,
      },
      { type: "h", text: "Labels" },
      {
        type: "code",
        lang: "js",
        code: `// Label for nested loops
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer; // breaks outer loop
    console.log(i, j);
  }
}`,
      },
    ],
    mistakes: [
      "Forgetting break in switch cases",
      "Infinite loops with while(true)",
      "Using for...in on arrays (use for...of)",
    ],
    bestPractices: [
      "Use for...of for arrays",
      "Use for...in for objects",
      "Prefer for...of over traditional for when possible",
    ],
    practice: [
      "Implement FizzBuzz with loops",
      "Convert if/else chains to switch",
      "Use break/continue in nested loops",
    ],
    summary:
      "if/else for decisions, for...of for arrays, while for unknown iterations. break/continue control flow.",
  },

  // ──────────────────── PHASE 5: FUNCTIONS ────────────────────
  {
    slug: "functions",
    track: "javascript",
    phase: "Functions",
    title: "Functions",
    description: "Reusable blocks of behavior — declarations, expressions, parameters, return.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    prerequisites: ["variables"],
    objectives: ["Declare functions three ways", "Use default and rest parameters"],
    tags: ["js", "functions"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `// Declaration (hoisted)
function add(a, b) { return a + b; }

// Expression
const sub = function (a, b) { return a - b; };

// Arrow (concise + lexical this)
const mul = (a, b) => a * b;

// Defaults + rest
function greet(name = "friend", ...titles) {
  return \`Hello \${titles.join(" ")} \${name}\`;
}
greet("Ada", "Dr.", "Prof."); // "Hello Dr. Prof. Ada"`,
      },
    ],
    summary:
      "Default to arrow functions. Use named declarations for top-level, reusable functions.",
  },
  {
    slug: "scope-and-closures",
    track: "javascript",
    phase: "Functions",
    title: "Scope, Hoisting & Closures",
    description: "How JavaScript decides which variable you mean — and the superpower it unlocks.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    prerequisites: ["functions"],
    objectives: [
      "Explain lexical scope",
      "Spot a closure in real code",
      "Use closures to keep private state",
    ],
    tags: ["js", "closures", "scope"],
    analogy:
      "A closure is a backpack. When a function leaves home, it carries the variables it needs with it.",
    body: [
      {
        type: "code",
        lang: "js",
        code: `function makeCounter() {
  let count = 0;            // private — kept alive by closure
  return () => ++count;
}
const next = makeCounter();
next(); // 1
next(); // 2
next(); // 3`,
      },
      {
        type: "p",
        text: "The inner arrow remembers count even after makeCounter has returned. That is a closure.",
      },
      { type: "h", text: "Hoisting" },
      {
        type: "p",
        text: "Function declarations and var are hoisted to the top of their scope. let and const are not — accessing them too early throws a ReferenceError (the temporal dead zone).",
      },
    ],
    summary:
      "Closures = functions + the variables they captured. The basis for modules, callbacks, and React hooks.",
    related: ["functions", "modules"],
  },
  {
    slug: "recursion-iife",
    track: "javascript",
    phase: "Functions",
    title: "Recursion & IIFE",
    description: "Functions that call themselves and immediately invoked function expressions.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    prerequisites: ["functions"],
    objectives: ["Write recursive functions", "Use IIFE for encapsulation"],
    tags: ["js", "functions", "recursion"],
    analogy:
      "Recursion is like Russian nesting dolls. Each call contains a smaller version of itself.",
    body: [
      { type: "h", text: "Recursion" },
      {
        type: "code",
        lang: "js",
        code: `// Factorial: n! = n * (n-1) * ... * 1
function factorial(n) {
  if (n <= 1) return 1;        // base case
  return n * factorial(n - 1); // recursive call
}
factorial(5); // 120

// Fibonacci
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
fib(6); // 8`,
      },
      {
        type: "callout",
        tone: "warn",
        text: "Every recursive function needs a base case to stop infinite recursion.",
      },
      { type: "h", text: "IIFE (Immediately Invoked Function Expression)" },
      {
        type: "code",
        lang: "js",
        code: `// Traditional IIFE
(function() {
  const private = "secret";
  console.log(private);
})(); // "secret"
// private is not accessible outside

// Arrow IIFE
(() => {
  console.log("Runs immediately");
})();

// With parameters
((name) => console.log(\`Hi \${name}\`))("Ada");`,
      },
      {
        type: "p",
        text: "IIFEs create private scope before ES6 modules. Still useful for one-off initialization.",
      },
    ],
    mistakes: [
      "Forgetting base case in recursion",
      "Stack overflow from deep recursion",
      "Trying to access IIFE variables outside",
    ],
    bestPractices: [
      "Use recursion for tree traversal, factorial, etc.",
      "Consider iterative solutions for deep recursion",
      "Use IIFE for module patterns",
    ],
    practice: [
      "Implement recursive sum of array",
      "Convert loop to recursion",
      "Create IIFE module",
    ],
    summary:
      "Recursion solves problems by breaking them into smaller identical problems. IIFE creates private scope immediately.",
  },
  {
    slug: "this-call-apply-bind",
    track: "javascript",
    phase: "Functions",
    title: "this, call, apply, bind",
    description:
      "The most confusing part of JavaScript — what 'this' refers to and how to control it.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    prerequisites: ["functions"],
    objectives: [
      "Understand this binding rules",
      "Use call/apply/bind to set this",
      "Master arrow vs regular functions",
    ],
    tags: ["js", "functions", "this"],
    analogy:
      "'this' is like a pronoun. It refers to whoever called the function, unless you explicitly set it.",
    body: [
      { type: "h", text: "this Binding Rules" },
      {
        type: "code",
        lang: "js",
        code: `// 1. Global context
console.log(this); // window (in browser)

// 2. Object method
const user = {
  name: "Ada",
  greet() { return \`Hi, I'm \${this.name}\`; }
};
user.greet(); // "Hi, I'm Ada"

// 3. Constructor
function Person(name) {
  this.name = name;
}
const ada = new Person("Ada"); // this = new object

// 4. Event handler
btn.addEventListener("click", function() {
  console.log(this); // the button element
});`,
      },
      { type: "h", text: "Arrow Functions & this" },
      {
        type: "code",
        lang: "js",
        code: `const user = {
  name: "Ada",
  greet: () => \`Hi, I'm \${this.name}\`,     // this = window (lexical)
  greet2() { return \`Hi, I'm \${this.name}\`; } // this = user
};
user.greet();  // "Hi, I'm " (this.name undefined)
user.greet2(); // "Hi, I'm Ada"`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "Arrow functions don't have their own this. They inherit from parent scope.",
      },
      { type: "h", text: "call, apply, bind" },
      {
        type: "code",
        lang: "js",
        code: `function greet(greeting) {
  return \`\${greeting}, I'm \${this.name}\`;
}

const ada = { name: "Ada" };
const eve = { name: "Eve" };

// call - invoke with this and args
greet.call(ada, "Hello");    // "Hello, I'm Ada"
greet.call(eve, "Hi");       // "Hi, I'm Eve"

// apply - same as call but args as array
greet.apply(ada, ["Hello"]); // "Hello, I'm Ada"

// bind - returns new function with bound this
const greetAda = greet.bind(ada);
greetAda("Hey");             // "Hey, I'm Ada"
greetAda.call(eve, "Nope");  // still "Nope, I'm Ada"`,
      },
      {
        type: "p",
        text: "call/apply invoke immediately. bind creates a new function with permanent this.",
      },
    ],
    mistakes: [
      "Using arrow function when you need this",
      "Losing this in callbacks",
      "Confusing call/apply (apply takes array)",
    ],
    bestPractices: [
      "Use arrow functions by default",
      "Use bind for event handlers",
      "Use call/apply for borrowing methods",
    ],
    practice: [
      "Fix broken this in object methods",
      "Use bind to create specialized functions",
      "Implement method borrowing",
    ],
    summary: "this = caller (except arrows). call/apply/bind control it explicitly.",
  },
  {
    slug: "higher-order-functions",
    track: "javascript",
    phase: "Functions",
    title: "Higher-Order Functions & Callbacks",
    description: "Functions that take functions as arguments or return functions.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    prerequisites: ["functions"],
    objectives: [
      "Write functions that accept callbacks",
      "Create functions that return functions",
      "Understand pure functions",
    ],
    tags: ["js", "functions", "fp"],
    analogy:
      "Higher-order functions are function factories. They produce or consume other functions.",
    body: [
      { type: "h", text: "Functions as Arguments (Callbacks)" },
      {
        type: "code",
        lang: "js",
        code: `function processArray(arr, callback) {
  const result = [];
  for (const item of arr) {
    result.push(callback(item));
  }
  return result;
}

const numbers = [1, 2, 3];
const doubled = processArray(numbers, n => n * 2); // [2, 4, 6]

// Built-in examples
numbers.map(n => n * 2);
numbers.filter(n => n > 1);
numbers.find(n => n === 2);`,
      },
      { type: "h", text: "Functions as Return Values" },
      {
        type: "code",
        lang: "js",
        code: `function createMultiplier(factor) {
  return (number) => number * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5);  // 10
triple(5);  // 15`,
      },
      { type: "h", text: "Pure Functions" },
      {
        type: "code",
        lang: "js",
        code: `// Pure: same input → same output, no side effects
const add = (a, b) => a + b;

// Impure: depends on external state
let counter = 0;
const impureAdd = (n) => counter += n;

// Impure: side effect
const log = (msg) => console.log(msg);

// Pure alternative
const pureLog = (msg) => msg; // just return, let caller log`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "Pure functions are predictable, testable, and composable.",
      },
    ],
    mistakes: [
      "Callback hell (deep nesting)",
      "Forgetting to return in callbacks",
      "Side effects in pure functions",
    ],
    bestPractices: [
      "Keep callbacks simple",
      "Use promises/async for complex async callbacks",
      "Prefer pure functions",
    ],
    practice: [
      "Implement custom map/filter",
      "Create function factories",
      "Refactor impure functions",
    ],
    summary:
      "Higher-order functions enable abstraction. Callbacks handle async. Pure functions are reliable.",
  },
  {
    slug: "strings",
    track: "javascript",
    phase: "Strings",
    title: "Strings: Methods, Unicode & Regular Expressions",
    description: "Text manipulation, character encoding, and pattern matching with regex.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    prerequisites: ["variables"],
    objectives: [
      "Use string methods effectively",
      "Handle Unicode correctly",
      "Write basic regular expressions",
    ],
    tags: ["js", "strings", "regex"],
    analogy:
      "Strings are like sentences. Methods are grammar rules. Regex is the thesaurus that finds patterns.",
    body: [
      { type: "h", text: "Template Literals" },
      {
        type: "code",
        lang: "js",
        code: `const name = "Ada";
const age = 30;

// Multi-line strings
const bio = \`Name: \${name}
Age: \${age}\`;

// Expressions
const sum = \`1 + 1 = \${1 + 1}\`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? \`<mark>\${values[i]}</mark>\` : ''), '');
}
highlight\`Hello \${name}, you are \${age} years old\`;`,
      },
      { type: "h", text: "Escape Sequences" },
      {
        type: "code",
        lang: "js",
        code: `"Line 1\\nLine 2";     // newline
"Path\\\\to\\\\file";    // backslash
"She said \\"Hi\\"";     // quotes
"\\u00A9";              // © (Unicode)
"\\x41";                // A (hex)`,
      },
      { type: "h", text: "String Methods" },
      {
        type: "code",
        lang: "js",
        code: `const str = "Hello, World!";

// Length
str.length; // 13

// Case conversion
str.toUpperCase(); // "HELLO, WORLD!"
str.toLowerCase(); // "hello, world!"

// Finding
str.indexOf("World");    // 7
str.includes("Hello");   // true
str.startsWith("Hello"); // true
str.endsWith("!");       // true

// Extracting
str.slice(7, 12);        // "World"
str.substring(7, 12);    // "World"
str.substr(7, 5);        // "World"

// Replacing
str.replace("World", "JavaScript"); // "Hello, JavaScript!"
str.replaceAll("l", "L");           // "HeLLo, WorLd!"

// Splitting & joining
"apple,banana,cherry".split(",");   // ["apple", "banana", "cherry"]
["a", "b", "c"].join("-");           // "a-b-c"

// Trimming
"  hello  ".trim();      // "hello"
"  hello  ".trimStart(); // "hello  "
"  hello  ".trimEnd();   // "  hello"`,
      },
      { type: "h", text: "Unicode & Normalization" },
      {
        type: "code",
        lang: "js",
        code: `// Unicode code points
"🚀".codePointAt(0);     // 128640
String.fromCodePoint(128640); // "🚀"

// Normalization (combining characters)
const cafe1 = "caf\\u00e9"; // é (single character)
const cafe2 = "cafe\\u0301"; // e + combining acute
cafe1 === cafe2; // false
cafe1.normalize() === cafe2.normalize(); // true`,
      },
      { type: "h", text: "Regular Expressions" },
      {
        type: "code",
        lang: "js",
        code: `// Creating regex
const regex1 = /hello/i;        // literal, case-insensitive
const regex2 = new RegExp("hello", "i"); // constructor

// Testing
regex1.test("HELLO world"); // true

// Matching
"hello world".match(/l+/g); // ["ll", "l"]

// Replacing with regex
"123-456-7890".replace(/\\d{3}-\\d{3}-\\d{4}/, "***-***-****");

// Common patterns
/\\d+/.test("123");        // digits
/\\w+/.test("hello");      // word chars
/\\s+/.test(" ");          // whitespace
/[a-z]+/i.test("Hello");   // letters`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "Use regex literals (/pattern/flags) for static patterns. Use RegExp constructor for dynamic patterns.",
      },
    ],
    mistakes: [
      "Forgetting to escape special regex chars",
      "Using == instead of === with strings",
      "Confusing slice/substring/substr",
    ],
    bestPractices: [
      "Use template literals for complex strings",
      "Normalize Unicode when comparing",
      "Test regex patterns separately",
    ],
    practice: [
      "Parse a CSV string",
      "Validate email format with regex",
      "Implement string utilities",
    ],
    summary:
      "Strings are immutable sequences. Use methods for manipulation, regex for patterns, Unicode for internationalization.",
  },
  {
    slug: "numbers",
    track: "javascript",
    phase: "Numbers",
    title: "Numbers, Math & BigInt",
    description: "Arithmetic, precision issues, Math API, and arbitrary-precision integers.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    prerequisites: ["variables"],
    objectives: ["Handle floating-point precision", "Use Math methods", "Work with BigInt"],
    tags: ["js", "numbers", "math"],
    analogy: "Numbers are like money. Precision matters. BigInt handles the really big bills.",
    body: [
      { type: "h", text: "Number Basics" },
      {
        type: "code",
        lang: "js",
        code: `typeof 42;        // "number"
typeof 3.14;      // "number"
typeof Infinity;  // "number"
typeof -Infinity; // "number"
typeof NaN;       // "number"`,
      },
      { type: "h", text: "NaN & Infinity" },
      {
        type: "code",
        lang: "js",
        code: `0 / 0;           // NaN
1 / 0;            // Infinity
-1 / 0;           // -Infinity

isNaN(NaN);       // true
isNaN("hello");   // true (coerces!)
Number.isNaN("hello"); // false (no coercion)

isFinite(42);     // true
isFinite(Infinity); // false
isFinite("42");   // false`,
      },
      { type: "h", text: "Math Object" },
      {
        type: "code",
        lang: "js",
        code: `Math.PI;        // 3.141592653589793
Math.E;         // 2.718281828459045

Math.round(3.7); // 4
Math.floor(3.7); // 3
Math.ceil(3.2);  // 4
Math.trunc(3.9); // 3

Math.max(1, 5, 3); // 5
Math.min(1, 5, 3); // 1

Math.random();     // 0 to <1
Math.abs(-5);      // 5
Math.sqrt(16);     // 4
Math.pow(2, 3);    // 8`,
      },
      { type: "h", text: "BigInt" },
      {
        type: "code",
        lang: "js",
        code: `const big = 123456789012345678901234567890n;
typeof big; // "bigint"

// Operations
big + 1n;    // 123456789012345678901234567891n
big * 2n;    // 246913578024691357802469135780n

// Cannot mix with regular numbers
big + 1;     // TypeError

// Convert
BigInt(123); // 123n
Number(big); // may lose precision`,
      },
      { type: "h", text: "Precision Issues" },
      {
        type: "code",
        lang: "js",
        code: `0.1 + 0.2; // 0.30000000000000004
0.1 + 0.2 === 0.3; // false!

// Solutions
(0.1 + 0.2).toFixed(1); // "0.3"
Math.round((0.1 + 0.2) * 10) / 10; // 0.3

// For money, use integers (cents)
const price = 199; // $1.99
const total = price * 1.08; // tax`,
      },
      { type: "h", text: "Random Numbers" },
      {
        type: "code",
        lang: "js",
        code: `// Random between 0 and <1
Math.random();

// Random integer 0 to 9
Math.floor(Math.random() * 10);

// Random integer 1 to 10
Math.floor(Math.random() * 10) + 1;

// Random in range
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomBetween(5, 15); // 5 to 15`,
      },
    ],
    mistakes: [
      "Comparing floats with ===",
      "Using Math.round for money",
      "Mixing BigInt with Number",
    ],
    bestPractices: [
      "Use Number.isNaN() over isNaN()",
      "Store money as integers",
      "Use toFixed() for display",
    ],
    practice: [
      "Implement random dice roller",
      "Fix floating-point comparison",
      "Create BigInt calculator",
    ],
    summary:
      "Numbers are 64-bit floats. Use BigInt for big integers. Watch precision with money/floats.",
  },

  // ──────────────────── PHASE 8: ARRAYS ────────────────────
  {
    slug: "arrays",
    track: "javascript",
    phase: "Arrays",
    title: "Arrays — The Essential Methods",
    description: "map, filter, reduce, find — the four you will use every single day.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    prerequisites: ["functions"],
    objectives: ["Pick the right array method", "Avoid mutating originals"],
    tags: ["js", "arrays"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);       // [2,4,6,8,10]
nums.filter(n => n % 2);    // [1,3,5]
nums.reduce((a, n) => a + n, 0); // 15
nums.find(n => n > 3);      // 4
nums.some(n => n > 4);      // true
nums.every(n => n > 0);     // true`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "map/filter/reduce return NEW arrays. push/pop/sort mutate the original. Prefer immutable methods.",
      },
    ],
    summary:
      "map = transform, filter = subset, reduce = combine. These three replace 90% of for loops.",
  },

  // ──────────────────── PHASE 5: OBJECTS ────────────────────
  {
    slug: "objects",
    track: "javascript",
    phase: "Objects",
    title: "Objects, Destructuring & Spread",
    description:
      "Modern object patterns: destructuring, spread/rest, optional chaining, nullish coalescing.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    prerequisites: ["data-types"],
    objectives: ["Destructure cleanly", "Spread to clone and merge", "Use ?. and ??"],
    tags: ["js", "objects"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `const user = { name: "Ada", address: { city: "London" } };

// Destructuring with rename + default
const { name: fullName, age = 0 } = user;

// Optional chaining + nullish coalescing
const city = user?.address?.city ?? "Unknown";

// Spread to merge / clone
const updated = { ...user, age: 30 };`,
      },
    ],
    summary: "Destructure to unpack, spread to combine, ?. for safe access, ?? for true defaults.",
  },
  {
    slug: "dates-internationalization",
    track: "javascript",
    phase: "Dates & Internationalization",
    title: "Dates, Intl & Time Zones",
    description: "Working with dates, formatting for different locales, and handling time zones.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    prerequisites: ["variables"],
    objectives: [
      "Create and manipulate dates",
      "Format dates for different locales",
      "Handle time zones",
    ],
    tags: ["js", "dates", "intl"],
    analogy:
      "Dates are like addresses. They need formatting for different countries, just like addresses do.",
    body: [
      { type: "h", text: "Date Object" },
      {
        type: "code",
        lang: "js",
        code: `// Current date/time
const now = new Date();
now.toISOString(); // "2024-01-15T10:30:00.000Z"

// Specific date
const birthday = new Date(1990, 0, 15); // Jan 15, 1990
const fromString = new Date("2024-01-15T10:30:00Z");

// Getters
now.getFullYear();   // 2024
now.getMonth();      // 0-11
now.getDate();       // 1-31
now.getDay();        // 0-6 (Sun=0)
now.getHours();      // 0-23

// Setters
now.setFullYear(2025);
now.setMonth(5);     // June

// Timestamps
Date.now();          // milliseconds since 1970
now.getTime();       // same
now.valueOf();       // same`,
      },
      { type: "h", text: "Date Formatting" },
      {
        type: "code",
        lang: "js",
        code: `const date = new Date("2024-01-15T14:30:00Z");

// Basic formatting
date.toLocaleDateString();     // "1/15/2024" (US)
date.toLocaleTimeString();     // "2:30:00 PM" (US)
date.toLocaleString();         // "1/15/2024, 2:30:00 PM"

// With locale
date.toLocaleDateString("de-DE"); // "15.1.2024"
date.toLocaleDateString("ja-JP"); // "2024/1/15"

// Custom format
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
date.toLocaleDateString("en-US", options);
// "Monday, January 15, 2024"`,
      },
      { type: "h", text: "Intl.DateTimeFormat" },
      {
        type: "code",
        lang: "js",
        code: `const date = new Date("2024-01-15T14:30:00Z");

// Reusable formatter
const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short"
});
formatter.format(date); // "Monday, January 15, 2024 at 2:30 PM"

// Relative time
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
rtf.format(-1, "day");    // "yesterday"
rtf.format(2, "hour");    // "in 2 hours"

// Time zones
const tzFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  dateStyle: "full",
  timeStyle: "full"
});
tzFormatter.format(date); // shows in NY time`,
      },
      { type: "h", text: "Intl.NumberFormat" },
      {
        type: "code",
        lang: "js",
        code: `const num = 1234567.89;

// Currency
new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
}).format(num); // "$1,234,567.89"

// Percent
new Intl.NumberFormat("en-US", {
  style: "percent"
}).format(0.15); // "15%"

// Units
new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "liter"
}).format(5); // "5 L"

// Compact
new Intl.NumberFormat("en-US", {
  notation: "compact"
}).format(1500000); // "1.5M"`,
      },
      { type: "h", text: "Intl.Collator" },
      {
        type: "code",
        lang: "js",
        code: `// Locale-aware sorting
const collator = new Intl.Collator("en");
["zebra", "apple", "Banana"].sort(collator.compare);
// ["apple", "Banana", "zebra"]

// Case-insensitive
const caseInsensitive = new Intl.Collator("en", {
  sensitivity: "base"
});
["Apple", "banana", "Cherry"].sort(caseInsensitive.compare);
// ["Apple", "banana", "Cherry"] (preserves original case)

// German sorting
const german = new Intl.Collator("de");
["äpfel", "Zebra", "apfel"].sort(german.compare);
// ["äpfel", "apfel", "Zebra"]`,
      },
      {
        type: "callout",
        tone: "warn",
        text: "Date objects are mutable. Use new Date(date) to clone. Avoid Date.parse() — use new Date(string).",
      },
    ],
    mistakes: [
      "Using Date.parse() for ISO strings",
      "Assuming local timezone",
      "Mutating date objects directly",
    ],
    bestPractices: [
      "Use ISO strings for dates",
      "Specify timeZone in Intl formatters",
      "Clone dates before modifying",
    ],
    practice: [
      "Build a date picker component",
      "Format dates for multiple locales",
      "Calculate age from birthday",
    ],
    summary:
      "Use Date for dates, Intl.* for formatting. Always specify locales and time zones explicitly.",
  },

  // ──────────────────── PHASE 8 — DOM ────────────────────
  {
    slug: "dom-basics",
    track: "javascript",
    phase: "DOM & Browser APIs",
    title: "The DOM — Selecting & Changing Elements",
    description: "How JavaScript talks to the page.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    prerequisites: ["functions"],
    objectives: ["Select elements", "Change text, attributes, classes", "Create new elements"],
    tags: ["js", "dom"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `const btn  = document.querySelector("#go");
const list = document.querySelectorAll("li");

btn.textContent = "Click me";
btn.classList.add("primary");
btn.dataset.role = "cta";

const li = document.createElement("li");
li.textContent = "New item";
document.querySelector("ul").append(li);`,
      },
    ],
    summary: "querySelector + classList + textContent will get you very far.",
  },
  {
    slug: "events",
    track: "javascript",
    phase: "DOM & Browser APIs",
    title: "Events & Delegation",
    description: "How to listen, and the one trick that scales: event delegation.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    prerequisites: ["dom-basics"],
    objectives: ["Use addEventListener", "Stop propagation when needed", "Delegate at the parent"],
    tags: ["js", "dom", "events"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `// One listener for many children
document.querySelector("ul").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  li.classList.toggle("done");
});`,
      },
    ],
    summary: "Listen on the parent, branch on e.target.closest(). One handler instead of hundreds.",
  },

  // ──────────────────── PHASE 11: ASYNC ────────────────────
  {
    slug: "event-loop",
    track: "javascript",
    phase: "Asynchronous JavaScript",
    title: "The Event Loop, Explained Simply",
    description: "Why setTimeout(fn, 0) is not actually 0, and how JS stays responsive.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    prerequisites: ["how-js-works"],
    objectives: ["Explain stack + task queue + microtasks", "Predict execution order"],
    tags: ["js", "async", "event-loop"],
    analogy:
      "The call stack is one cashier. The task queue is the line. The event loop calls the next person only when the cashier is free.",
    body: [
      {
        type: "code",
        lang: "js",
        code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 1, 4, 3, 2  — microtasks (Promises) run BEFORE the next macrotask (setTimeout)`,
      },
    ],
    summary: "Sync first, then microtasks, then a macrotask — repeat. That is the loop.",
  },
  {
    slug: "promises-async-await",
    track: "javascript",
    phase: "Asynchronous JavaScript",
    title: "Promises & async/await",
    description: "The modern way to handle anything that takes time.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    prerequisites: ["event-loop"],
    objectives: [
      "Read and write a Promise",
      "Use async/await with try/catch",
      "Run things in parallel with Promise.all",
    ],
    tags: ["js", "async", "promises"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `async function loadUser(id) {
  try {
    const res  = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(res.statusText);
    const user = await res.json();
    return user;
  } catch (err) {
    console.error("loadUser failed:", err);
    return null;
  }
}

// Run in parallel
const [a, b] = await Promise.all([loadUser(1), loadUser(2)]);`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "await pauses the function, not the page. Other code keeps running.",
      },
    ],
    summary:
      "async/await = Promises that read like sync code. Wrap awaits in try/catch and parallelize with Promise.all.",
  },
  {
    slug: "fetch-api",
    track: "javascript",
    phase: "Asynchronous JavaScript",
    title: "Fetching Data with fetch()",
    description: "Talk to APIs the modern way — including JSON, headers, errors, and aborts.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    prerequisites: ["promises-async-await"],
    objectives: ["GET and POST JSON", "Handle non-2xx", "Cancel with AbortController"],
    tags: ["js", "async", "fetch"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `const ctrl = new AbortController();
setTimeout(() => ctrl.abort(), 5000);

const res = await fetch("https://api.example.com/items", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "ada" }),
  signal: ctrl.signal,
});
if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const data = await res.json();`,
      },
    ],
    summary: "fetch returns a Promise. Always check res.ok and parse with res.json().",
  },

  // ──────────────────── PHASE 12: ADVANCED ────────────────────
  {
    slug: "prototypes-classes",
    track: "javascript",
    phase: "Advanced JavaScript",
    title: "Prototypes & Classes",
    description: "How JavaScript inheritance really works under the hood.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    prerequisites: ["objects", "scope-and-closures"],
    objectives: ["Read a prototype chain", "Use class syntax", "Understand it is sugar"],
    tags: ["js", "oop", "prototypes"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound.\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks.\`; }
}
new Dog("Rex").speak(); // "Rex barks."`,
      },
      {
        type: "p",
        text: "Under the hood there is no class — just objects linked to other objects via [[Prototype]]. class is friendlier syntax for the same thing.",
      },
    ],
    summary: "class is sugar over prototypes. Use it; just know what is happening underneath.",
  },
  {
    slug: "modules",
    track: "javascript",
    phase: "Advanced JavaScript",
    title: "ES Modules",
    description: "import / export — how modern JavaScript files share code.",
    difficulty: "Intermediate",
    estimatedTime: "8 min",
    prerequisites: ["functions"],
    objectives: ["Use named and default exports", "Understand dynamic import"],
    tags: ["js", "modules"],
    body: [
      {
        type: "code",
        lang: "js",
        title: "math.js",
        code: `export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }`,
      },
      {
        type: "code",
        lang: "js",
        title: "main.js",
        code: `import multiply, { add } from "./math.js";

// Code-split a heavy module
const { default: Chart } = await import("./chart.js");`,
      },
    ],
    summary:
      "Modules let you split code into files. Use named exports by default; default exports for the main thing of a file.",
  },

  // ──────────────────── PHASE 13–19 (compact lessons) ────────────────────
  {
    slug: "functional-programming",
    track: "javascript",
    phase: "Functional Programming",
    title: "Functional Patterns",
    description:
      "Immutability, composition, currying, partial application — used every day in React.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    prerequisites: ["arrays", "scope-and-closures"],
    objectives: ["Avoid mutation", "Compose small functions", "Curry for reuse"],
    tags: ["js", "fp"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `// Pure: same input, same output, no side effects
const double = x => x * 2;

// Composition
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const shout = pipe(s => s.trim(), s => s.toUpperCase(), s => s + "!");
shout("  hello "); // "HELLO!"

// Currying
const add = a => b => a + b;
const add5 = add(5);
add5(3); // 8`,
      },
    ],
    summary:
      "Pure functions + immutability = code that is easier to test, reason about, and change.",
  },
  {
    slug: "error-handling",
    track: "javascript",
    phase: "Error Handling",
    title: "try / catch / finally & Custom Errors",
    description: "Handle failure on purpose instead of by accident.",
    difficulty: "Intermediate",
    estimatedTime: "8 min",
    prerequisites: ["functions"],
    objectives: ["Use try/catch around risky code", "Throw meaningful errors"],
    tags: ["js", "errors"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

try {
  if (!email.includes("@")) throw new ValidationError("email", "bad email");
} catch (err) {
  if (err instanceof ValidationError) showFieldError(err.field, err.message);
  else throw err;
}`,
      },
    ],
    summary: "Throw typed errors. Catch only what you can handle. Re-throw the rest.",
  },
  {
    slug: "browser-apis",
    track: "javascript",
    phase: "Browser APIs",
    title: "Storage, Observers, Workers",
    description: "Tour of the web platform: localStorage, IntersectionObserver, Web Workers.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    prerequisites: ["dom-basics"],
    objectives: ["Persist with localStorage", "Lazy-load with IntersectionObserver"],
    tags: ["js", "browser-apis"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `// Persist
localStorage.setItem("theme", "dark");
const t = localStorage.getItem("theme");

// Lazy reveal
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) e.target.classList.add("show");
});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));`,
      },
    ],
    summary: "The browser ships hundreds of APIs. Reach for the platform before adding a library.",
  },
  {
    slug: "json-rest",
    track: "javascript",
    phase: "Networking",
    title: "JSON, REST & HTTP Methods",
    description: "Speak the language of the web: GET, POST, PUT, PATCH, DELETE.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    prerequisites: ["fetch-api"],
    objectives: ["Pick the right HTTP method", "Send and parse JSON"],
    tags: ["js", "http"],
    body: [
      {
        type: "list",
        items: [
          "GET — read",
          "POST — create",
          "PUT — replace",
          "PATCH — partial update",
          "DELETE — remove",
        ],
      },
      {
        type: "code",
        lang: "js",
        code: `const data = JSON.parse('{"a":1}'); // string → object
const text = JSON.stringify(data);   // object → string`,
      },
    ],
    summary: "REST = nouns in URLs, verbs in HTTP methods. JSON is the data format.",
  },
  {
    slug: "tooling",
    track: "javascript",
    phase: "Tooling",
    title: "npm, package.json, Bundlers",
    description: "How modern projects actually get built and shipped.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    prerequisites: [],
    objectives: ["Read package.json", "Understand what a bundler does"],
    tags: ["js", "tooling"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `// package.json (excerpt)
{
  "scripts": { "dev": "vite", "build": "vite build" },
  "dependencies": { "react": "^19.0.0" },
  "devDependencies": { "vite": "^7.0.0" }
}`,
      },
      {
        type: "p",
        text: "A bundler (Vite, esbuild) takes your many small files and produces a few optimized files for production.",
      },
    ],
    summary: "npm installs packages. Vite bundles them. Scripts in package.json run everything.",
  },
  {
    slug: "modern-js",
    track: "javascript",
    phase: "Modern JavaScript",
    title: "Modern JavaScript (ES2024+)",
    description: "Top-level await, private class fields, new array methods, structuredClone.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    prerequisites: ["modules"],
    objectives: [
      "Use top-level await in modules",
      "Use #private fields",
      "Know toSorted, toReversed, with",
    ],
    tags: ["js", "modern"],
    body: [
      {
        type: "code",
        lang: "js",
        code: `// Top-level await (in modules)
const config = await fetch("/config.json").then(r => r.json());

// Private fields
class Account {
  #balance = 0;
  deposit(n) { this.#balance += n; }
}

// Immutable array methods
const a = [3, 1, 2];
a.toSorted();   // [1,2,3]  (a is unchanged)
a.toReversed(); // [2,1,3]
a.with(0, 99);  // [99,1,2]

// Deep clone built-in
const copy = structuredClone({ a: { b: 1 } });`,
      },
    ],
    summary:
      "JavaScript keeps shipping useful things. Learn the new immutable array methods first.",
  },
  {
    slug: "advanced-language-features",
    track: "javascript",
    phase: "Advanced Language Features",
    title: "Symbol, Iterators, Generators & Collections",
    description:
      "Advanced JavaScript features: unique identifiers, custom iteration, async generators, and modern collections.",
    difficulty: "Advanced",
    estimatedTime: "20 min",
    prerequisites: ["objects", "functions"],
    objectives: [
      "Use Symbol for unique properties",
      "Create custom iterators",
      "Work with Sets/Maps",
      "Understand WeakMap/WeakSet",
    ],
    tags: ["js", "advanced", "iterators", "generators"],
    analogy:
      "These are the power tools. You don't need them every day, but when you do, they're indispensable.",
    body: [
      { type: "h", text: "Symbol" },
      {
        type: "code",
        lang: "js",
        code: `// Unique identifiers
const sym1 = Symbol("description");
const sym2 = Symbol("description");
sym1 === sym2; // false

// Well-known symbols
Symbol.iterator;    // for...of
Symbol.toStringTag; // Object.prototype.toString
Symbol.species;     // constructor inheritance

// Symbol properties
const user = { name: "Ada" };
const id = Symbol("id");
user[id] = 123;
user[id]; // 123
Object.keys(user); // ["name"] - symbols are hidden

// Global registry
const globalSym = Symbol.for("shared");
Symbol.for("shared") === globalSym; // true`,
      },
      { type: "h", text: "Iterators & for...of" },
      {
        type: "code",
        lang: "js",
        code: `// Custom iterator
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    return {
      next: () => ({
        value: current,
        done: current++ > this.to
      })
    };
  }
};

for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Built-in iterators
for (const char of "hello") console.log(char);
for (const entry of Object.entries(user)) console.log(entry);`,
      },
      { type: "h", text: "Generators" },
      {
        type: "code",
        lang: "js",
        code: `// Generator function
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next(); // { value: 0, done: false }
fib.next(); // { value: 1, done: false }
fib.next(); // { value: 1, done: false }

// Async generators
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 100));
  }
}

for await (const num of asyncRange(1, 3)) {
  console.log(num); // 1, 2, 3 (with delays)
}`,
      },
      { type: "h", text: "Set" },
      {
        type: "code",
        lang: "js",
        code: `const set = new Set([1, 2, 3, 1, 2]);
set.size; // 3 (duplicates removed)

set.add(4);
set.has(2); // true
set.delete(1);
set.clear();

// Operations
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// Union
new Set([...a, ...b]); // {1, 2, 3, 4}

// Intersection
new Set([...a].filter(x => b.has(x))); // {2, 3}

// Difference
new Set([...a].filter(x => !b.has(x))); // {1}`,
      },
      { type: "h", text: "Map" },
      {
        type: "code",
        lang: "js",
        code: `const map = new Map();
map.set("name", "Ada");
map.set("age", 30);
map.get("name"); // "Ada"
map.has("age");  // true
map.size;        // 2

// Any key type
const objKey = {};
map.set(objKey, "value");
map.get(objKey); // "value"

// Iteration
for (const [key, value] of map) {
  console.log(key, value);
}

// Convert
const obj = Object.fromEntries(map);
const map2 = new Map(Object.entries(obj));`,
      },
      { type: "h", text: "WeakMap & WeakSet" },
      {
        type: "code",
        lang: "js",
        code: `// WeakMap - keys are weakly referenced
const weakMap = new WeakMap();
let obj = { data: "important" };
weakMap.set(obj, "metadata");

obj = null; // obj can be garbage collected
// weakMap entry is automatically removed

// Use cases: private data, caching
const privates = new WeakMap();
class Counter {
  constructor() {
    privates.set(this, 0);
  }
  increment() {
    const count = privates.get(this) + 1;
    privates.set(this, count);
  }
}

// WeakSet - values are weakly referenced
const weakSet = new WeakSet();
const obj1 = {};
weakSet.add(obj1);
weakSet.has(obj1); // true`,
      },
      { type: "h", text: "Reflect & Proxy" },
      {
        type: "code",
        lang: "js",
        code: `// Reflect - programmatic meta-operations
const obj = { a: 1 };
Reflect.has(obj, "a");        // true
Reflect.get(obj, "a");        // 1
Reflect.set(obj, "b", 2);     // obj.b = 2
Reflect.deleteProperty(obj, "a"); // delete obj.a

// Proxy - intercept operations
const handler = {
  get(target, prop) {
    console.log(\`Getting \${prop}\`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(\`Setting \${prop} to \${value}\`);
    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy(obj, handler);
proxy.a;      // "Getting a"
proxy.b = 3;  // "Setting b to 3"`,
      },
    ],
    mistakes: [
      "Using objects as Map keys (use Map)",
      "Forgetting Symbol properties are hidden",
      "Infinite loops in generators",
    ],
    bestPractices: [
      "Use Map over objects for complex keys",
      "Use WeakMap for private data",
      "Use Proxy for validation/logging",
    ],
    practice: [
      "Implement LRU cache with Map",
      "Create observable object with Proxy",
      "Build custom collection with Symbol.iterator",
    ],
    summary:
      "Symbol for uniqueness, iterators for custom loops, generators for sequences, collections for advanced data structures.",
  },
  {
    slug: "memory-management",
    track: "javascript",
    phase: "Memory Management",
    title: "Memory Management & Performance",
    description: "How JavaScript manages memory, garbage collection, and avoiding memory leaks.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    prerequisites: ["objects", "functions"],
    objectives: ["Understand stack vs heap", "Identify memory leaks", "Use performance tools"],
    tags: ["js", "memory", "performance"],
    analogy:
      "Memory is like a closet. Stack is your daily clothes. Heap is storage. GC is the cleaner who removes unused items.",
    body: [
      { type: "h", text: "Stack vs Heap" },
      {
        type: "code",
        lang: "js",
        code: `// Stack: primitives, function calls
function add(a, b) {
  const sum = a + b; // sum on stack
  return sum;
}
const result = add(1, 2); // result on stack

// Heap: objects, arrays, functions
const user = { name: "Ada" }; // user reference on stack, object on heap
const arr = [1, 2, 3];       // arr reference on stack, array on heap

// Closures capture heap references
function makeCounter() {
  let count = 0; // on heap (closure)
  return () => ++count;
}`,
      },
      { type: "h", text: "Garbage Collection" },
      {
        type: "code",
        lang: "js",
        code: `// Mark-and-sweep algorithm
// 1. Mark reachable objects
// 2. Sweep unmarked objects

let obj = { data: "important" };
obj = null; // obj becomes unreachable, GC collects it

// Circular references
const a = {};
const b = {};
a.ref = b;
b.ref = a;
a = null;
b = null; // Both collectable despite cycle

// WeakMap prevents cycles
const cache = new WeakMap();
let key = {};
cache.set(key, "data");
key = null; // cache entry auto-removed`,
      },
      { type: "h", text: "Memory Leaks" },
      {
        type: "code",
        lang: "js",
        code: `// 1. Forgotten timers
const timer = setInterval(() => console.log("leak"), 1000);
// Forgot: clearInterval(timer);

// 2. Event listeners
element.addEventListener("click", handler);
// Forgot: element.removeEventListener("click", handler);

// 3. Closures holding references
function leak() {
  const largeData = new Array(1000000);
  return () => console.log(largeData.length); // holds largeData
}

// 4. DOM references
const elements = document.querySelectorAll("div");
// If elements removed from DOM but still referenced, memory leaks

// 5. Global variables
window.myData = { huge: "object" };
// Never cleaned up`,
      },
      { type: "h", text: "Performance Basics" },
      {
        type: "code",
        lang: "js",
        code: `// Memory profiling
// Chrome DevTools: Memory tab
// - Heap snapshot
// - Allocation timeline
// - Garbage collection

// Performance monitoring
console.time("operation");
heavyOperation();
console.timeEnd("operation");

// Memory usage
if (performance.memory) {
  console.log(\`Used: \${performance.memory.usedJSHeapSize} bytes\`);
  console.log(\`Total: \${performance.memory.totalJSHeapSize} bytes\`);
}

// Optimize loops
// Bad: O(n²)
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // ...
  }
}

// Good: cache length
const len = arr.length;
for (let i = 0; i < len; i++) {
  // ...
}`,
      },
      { type: "h", text: "Optimization Techniques" },
      {
        type: "code",
        lang: "js",
        code: `// Object pooling
const pool = [];
function getVector(x, y) {
  return pool.pop() || { x, y };
}
function releaseVector(vec) {
  pool.push(vec);
}

// Memoization
const memo = new Map();
function fibonacci(n) {
  if (memo.has(n)) return memo.get(n);
  const result = n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  memo.set(n, result);
  return result;
}

// Lazy loading
const heavyModule = () => import("./heavy.js");

// Debouncing
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}`,
      },
    ],
    mistakes: [
      "Creating circular references",
      "Forgetting to clean up event listeners",
      "Holding references to removed DOM elements",
    ],
    bestPractices: [
      "Use WeakMap/WeakSet for caches",
      "Clean up timers and listeners",
      "Profile memory usage regularly",
    ],
    practice: [
      "Fix a memory leak in event handlers",
      "Implement object pooling",
      "Profile a memory-intensive operation",
    ],
    summary:
      "Stack for locals, heap for objects. GC cleans unreachable objects. Watch for leaks in closures, events, and globals.",
  },
  {
    slug: "testing-fundamentals",
    track: "javascript",
    phase: "Testing",
    title: "Testing Fundamentals with Vitest",
    description: "Unit testing, test-driven development, and testing best practices.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    prerequisites: ["functions"],
    objectives: [
      "Write unit tests",
      "Use describe/it blocks",
      "Test async code",
      "Mock dependencies",
    ],
    tags: ["js", "testing", "vitest"],
    analogy: "Tests are like quality control inspectors. They catch bugs before they reach users.",
    body: [
      { type: "h", text: "Why Test?" },
      {
        type: "list",
        items: [
          "Catch bugs early",
          "Document expected behavior",
          "Enable refactoring with confidence",
          "Prevent regressions",
          "Improve code design",
        ],
      },
      { type: "h", text: "Vitest Setup" },
      {
        type: "code",
        lang: "js",
        code: `// Install: npm install -D vitest
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}

// vite.config.js
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});`,
      },
      { type: "h", text: "Basic Tests" },
      {
        type: "code",
        lang: "js",
        code: `// math.test.js
import { describe, it, expect } from "vitest";

describe("Math functions", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("handles negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
  });

  it("throws on invalid input", () => {
    expect(() => add("2", 3)).toThrow();
  });
});`,
      },
      { type: "h", text: "Matchers" },
      {
        type: "code",
        lang: "js",
        code: `// Equality
expect(result).toBe(5);           // ===
expect(result).toEqual({a: 1});   // deep equal
expect(result).toStrictEqual(obj); // no coercion

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Numbers
expect(count).toBeGreaterThan(0);
expect(price).toBeCloseTo(19.99, 2);

// Strings
expect(name).toMatch(/Ada/);
expect(email).toMatch(/^[^@]+@[^@]+$/);

// Arrays/Objects
expect(arr).toContain("item");
expect(obj).toHaveProperty("name", "Ada");
expect(users).toHaveLength(3);

// Exceptions
expect(() => risky()).toThrow();
expect(() => risky()).toThrow("error message");`,
      },
      { type: "h", text: "Testing Async Code" },
      {
        type: "code",
        lang: "js",
        code: `// Promises
it("resolves with data", async () => {
  const data = await fetchUser(1);
  expect(data.name).toBe("Ada");
});

// Async/await in test
it("handles async operations", async () => {
  await expect(fetchData()).resolves.toHaveProperty("success");
  await expect(badRequest()).rejects.toThrow("404");
});

// Callbacks
it("calls callback with result", () => {
  const callback = vi.fn();
  processData(data, callback);
  expect(callback).toHaveBeenCalledWith(expectedResult);
});`,
      },
      { type: "h", text: "Mocking" },
      {
        type: "code",
        lang: "js",
        code: `import { vi, describe, it, expect } from "vitest";

// Mock functions
const mockFn = vi.fn();
mockFn("hello");
expect(mockFn).toHaveBeenCalledWith("hello");

// Mock modules
vi.mock("./api", () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: "Ada" })),
}));

// Spy on methods
const obj = {
  method: () => "original",
};
const spy = vi.spyOn(obj, "method");
obj.method();
expect(spy).toHaveBeenCalled();

// Mock timers
vi.useFakeTimers();
setTimeout(() => console.log("done"), 1000);
vi.advanceTimersByTime(1000); // instantly executes`,
      },
      { type: "h", text: "Test Structure" },
      {
        type: "code",
        lang: "js",
        code: `// Arrange - setup
const user = { name: "Ada", age: 30 };

// Act - execute
const result = formatUser(user);

// Assert - verify
expect(result).toBe("Ada (30)");

// Test lifecycle
describe("User service", () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  afterEach(() => {
    service.cleanup();
  });

  it("creates user", () => {
    // test here
  });
});`,
      },
      { type: "h", text: "TDD: Test-Driven Development" },
      {
        type: "list",
        items: [
          "Write test first (it will fail)",
          "Write minimal code to pass test",
          "Refactor while keeping tests green",
          "Repeat for each feature",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Tests are executable documentation. Write them as if explaining to future-you.",
      },
    ],
    mistakes: [
      "Testing implementation details",
      "Not testing edge cases",
      "Mocking everything (test integration too)",
    ],
    bestPractices: [
      "Test behavior, not implementation",
      "Use descriptive test names",
      "Keep tests fast and isolated",
    ],
    practice: [
      "Write tests for a calculator function",
      "Test async API calls",
      "Mock external dependencies",
    ],
    summary:
      "Tests catch bugs, document behavior, and enable fearless refactoring. Use Vitest for modern, fast testing.",
  },
  // ──────────────────── 20% for React ────────────────────
  {
    slug: "twenty-percent-for-react",
    track: "javascript",
    phase: "Modern JavaScript",
    title: "The 20% of JS That Powers 80% of React",
    description: "If you only learn these, React will feel almost easy.",
    difficulty: "Intermediate",
    estimatedTime: "8 min",
    prerequisites: ["arrays", "objects", "promises-async-await", "modules"],
    objectives: ["Identify the JS features React leans on hardest"],
    tags: ["js", "react-prep"],
    body: [
      {
        type: "list",
        items: [
          "Arrow functions — every component and handler.",
          "Destructuring — props and hooks like const [count, setCount] = useState(0).",
          "Spread / rest — passing props, immutable updates.",
          "Template literals — class names and dynamic strings.",
          "map / filter — rendering lists.",
          "Optional chaining + nullish coalescing — safe data access.",
          "Modules (import/export) — every file.",
          "Promises + async/await — data fetching, effects.",
          "Closures — useState and useEffect rely on them.",
          "Ternary + && short-circuit — conditional JSX.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Master these ten before opening a React tutorial. You will fly.",
      },
    ],
    summary:
      "Arrow funcs, destructuring, spread, map, async/await, closures, modules. That is React's JavaScript.",
    related: ["functions", "arrays", "objects", "promises-async-await", "modules"],
  },
  {
    slug: "project-counter",
    track: "javascript",
    phase: "Real Projects",
    title: "Counter App — Your First Interactive App",
    description:
      "Build a counter with increment/decrement buttons, local storage persistence, and keyboard shortcuts.",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    prerequisites: ["dom-basics", "events"],
    objectives: [
      "Create interactive UI",
      "Handle user events",
      "Persist state with localStorage",
      "Add keyboard shortcuts",
    ],
    tags: ["js", "project", "dom", "localStorage"],
    body: [
      { type: "h", text: "Project Overview" },
      {
        type: "p",
        text: "A counter app teaches the fundamentals of interactive web development: DOM manipulation, event handling, and state persistence.",
      },
      { type: "h", text: "Features to Implement" },
      {
        type: "list",
        items: [
          "Increment and decrement buttons",
          "Display current count",
          "Reset to zero",
          "Persist count in localStorage",
          "Keyboard shortcuts (arrow keys)",
          "Visual feedback on interactions",
        ],
      },
      { type: "h", text: "HTML Structure" },
      {
        type: "code",
        lang: "html",
        code: `<div class="counter">
  <h1>Counter</h1>
  <div class="count">0</div>
  <div class="buttons">
    <button id="decrement">-</button>
    <button id="reset">Reset</button>
    <button id="increment">+</button>
  </div>
  <div class="instructions">
    Use buttons or arrow keys ← → to change count
  </div>
</div>`,
      },
      { type: "h", text: "JavaScript Implementation" },
      {
        type: "code",
        lang: "js",
        code: `// Get DOM elements
const countDisplay = document.querySelector('.count');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

// State
let count = 0;

// Load from localStorage
count = parseInt(localStorage.getItem('counter')) || 0;
updateDisplay();

// Functions
function updateDisplay() {
  countDisplay.textContent = count;
  localStorage.setItem('counter', count);
}

function increment() {
  count++;
  updateDisplay();
}

function decrement() {
  count--;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}

// Event listeners
incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
resetBtn.addEventListener('click', reset);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') increment();
  if (e.key === 'ArrowLeft') decrement();
  if (e.key === ' ') reset(); // Spacebar
});`,
      },
      { type: "h", text: "CSS Styling" },
      {
        type: "code",
        lang: "css",
        code: `.counter {
  text-align: center;
  max-width: 300px;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  margin: 2rem 0;
  color: #333;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  border: 2px solid #333;
  background: white;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

button:hover {
  background: #333;
  color: white;
}

button:active {
  transform: scale(0.95);
}

.instructions {
  color: #666;
  font-size: 0.9rem;
  margin-top: 2rem;
}`,
      },
      { type: "h", text: "Enhancements" },
      {
        type: "list",
        items: [
          "Add animation when count changes",
          "Implement step size (increment by 5, 10, etc.)",
          "Add sound effects",
          "Create multiple counters",
          "Add count history/log",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Start simple, then add features incrementally. Test each addition thoroughly.",
      },
    ],
    mistakes: [
      "Forgetting to update display after state changes",
      "Not handling localStorage errors",
      "Adding listeners multiple times",
    ],
    bestPractices: [
      "Separate concerns (state, UI, events)",
      "Use semantic HTML",
      "Handle edge cases (invalid localStorage)",
    ],
    practice: ["Add a maximum/minimum limit", "Implement undo functionality", "Add count presets"],
    summary:
      "Counter app demonstrates core web development: state management, DOM manipulation, events, and persistence.",
  },
  {
    slug: "project-todo-app",
    track: "javascript",
    phase: "Real Projects",
    title: "Todo App — Task Management System",
    description:
      "Build a complete todo application with add, edit, delete, filter, and local storage.",
    difficulty: "Intermediate",
    estimatedTime: "60 min",
    prerequisites: ["arrays", "objects", "dom-basics", "events"],
    objectives: [
      "Manage complex state",
      "Implement CRUD operations",
      "Use array methods",
      "Filter and search",
    ],
    tags: ["js", "project", "crud", "arrays"],
    body: [
      { type: "h", text: "Project Overview" },
      {
        type: "p",
        text: "A todo app is the perfect project for learning data manipulation, state management, and user interactions.",
      },
      { type: "h", text: "Features" },
      {
        type: "list",
        items: [
          "Add new todos",
          "Mark todos complete/incomplete",
          "Edit todo text",
          "Delete todos",
          "Filter by status (all/active/completed)",
          "Clear completed todos",
          "Persist to localStorage",
          "Show remaining count",
        ],
      },
      { type: "h", text: "Data Structure" },
      {
        type: "code",
        lang: "js",
        code: `// Todo item structure
const todo = {
  id: Date.now(), // unique identifier
  text: "Learn JavaScript",
  completed: false,
  createdAt: new Date(),
};

// App state
let todos = [];
let filter = 'all'; // 'all', 'active', 'completed'`,
      },
      { type: "h", text: "Core Functions" },
      {
        type: "code",
        lang: "js",
        code: `// Add todo
function addTodo(text) {
  const todo = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date(),
  };
  todos.push(todo);
  saveTodos();
  render();
}

// Toggle completion
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

// Delete todo
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

// Edit todo
function editTodo(id, newText) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = newText.trim();
    saveTodos();
    render();
  }
}

// Filter todos
function getFilteredTodos() {
  switch (filter) {
    case 'active': return todos.filter(t => !t.completed);
    case 'completed': return todos.filter(t => t.completed);
    default: return todos;
  }
}`,
      },
      { type: "h", text: "Rendering" },
      {
        type: "code",
        lang: "js",
        code: `function render() {
  const filteredTodos = getFilteredTodos();
  const todoList = document.getElementById('todo-list');

  todoList.innerHTML = filteredTodos.map(todo => \`
    <li class="todo-item \${todo.completed ? 'completed' : ''}" data-id="\${todo.id}">
      <input type="checkbox" \${todo.completed ? 'checked' : ''}>
      <span class="todo-text">\${todo.text}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </li>
  \`).join('');

  updateCount();
}

// Update remaining count
function updateCount() {
  const remaining = todos.filter(t => !t.completed).length;
  document.getElementById('count').textContent = \`\${remaining} item\${remaining !== 1 ? 's' : ''} left\`;
}`,
      },
      { type: "h", text: "Event Handling" },
      {
        type: "code",
        lang: "js",
        code: `// Add todo form
document.getElementById('add-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('add-input');
  if (input.value.trim()) {
    addTodo(input.value);
    input.value = '';
  }
});

// Todo list events (event delegation)
document.getElementById('todo-list').addEventListener('click', (e) => {
  const li = e.target.closest('.todo-item');
  if (!li) return;

  const id = parseInt(li.dataset.id);

  if (e.target.matches('input[type="checkbox"]')) {
    toggleTodo(id);
  } else if (e.target.classList.contains('delete-btn')) {
    deleteTodo(id);
  } else if (e.target.classList.contains('edit-btn')) {
    // Implement edit mode
  }
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    render();
  });
});`,
      },
      { type: "h", text: "Persistence" },
      {
        type: "code",
        lang: "js",
        code: `function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved).map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt), // Convert back to Date
    }));
  }
}

// Load on startup
loadTodos();
render();`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "Use array methods (map, filter, find) extensively. Event delegation keeps code clean.",
      },
    ],
    mistakes: [
      "Mutating state directly",
      "Not saving after state changes",
      "Inefficient re-renders",
    ],
    bestPractices: [
      "Keep state immutable",
      "Use event delegation",
      "Separate concerns (data, UI, events)",
    ],
    practice: ["Add due dates", "Implement drag-and-drop reordering", "Add categories/tags"],
    summary:
      "Todo app covers CRUD operations, filtering, persistence, and complex state management.",
  },
];

export const TRACKS = [
  {
    id: "html",
    title: "HTML",
    color: "var(--color-warning)",
    description: "Structure of the web.",
  },
  {
    id: "css",
    title: "CSS",
    color: "var(--color-accent-2)",
    description: "Style, layout, motion.",
  },
  {
    id: "javascript",
    title: "JavaScript",
    color: "var(--color-accent)",
    description: "Behavior. The big one.",
  },
] as const;

export function lessonsByTrack(track: "html" | "css" | "javascript") {
  return LESSONS.filter((l) => l.track === track);
}

export function lessonsByPhase(track: "html" | "css" | "javascript") {
  const list = lessonsByTrack(track);
  const map = new Map<string, Lesson[]>();
  for (const l of list) {
    if (!map.has(l.phase)) map.set(l.phase, []);
    map.get(l.phase)!.push(l);
  }
  return Array.from(map.entries());
}

export function getLesson(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}

export function neighbors(slug: string) {
  const list = LESSONS.filter((l) => l.track === "javascript");
  const i = list.findIndex((l) => l.slug === slug);
  return { prev: list[i - 1], next: list[i + 1] };
}
