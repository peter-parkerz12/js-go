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
      { type: "p", text: "HTML (HyperText Markup Language) describes the structure of a page using tags. A browser reads those tags and turns them into the layout you see." },
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
      { type: "p", text: "A tag wraps content: <p>hi</p>. An element is the tag plus its content. Attributes (like lang, href, src) configure an element." },
    ],
    mistakes: ["Forgetting the doctype, which puts browsers in quirks mode.", "Skipping the viewport meta — your page will not be mobile-friendly."],
    bestPractices: ["One <h1> per page.", "Always set lang on <html>."],
    practice: ["Build a personal bio page with a heading, paragraph, and an image."],
    summary: "HTML uses tags to give a page structure. Start with the HTML5 boilerplate every time.",
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
      { type: "p", text: "Semantic tags describe meaning, not just appearance. Screen readers, search engines, and future-you will thank you." },
      { type: "code", lang: "html", code: `<header>...</header>
<nav>...</nav>
<main>
  <article>
    <h1>Title</h1>
    <section>...</section>
  </article>
  <aside>...</aside>
</main>
<footer>...</footer>` },
    ],
    bestPractices: ["Use <button> for actions, <a> for navigation.", "Wrap each page's primary content in one <main>."],
    summary: "Choose tags by meaning. Reach for <div> only when no semantic tag fits.",
  },
  {
    slug: "html-forms",
    track: "html",
    phase: "HTML Fundamentals",
    title: "Forms & Inputs",
    description: "Collect user input the right way with labels, validation, and accessibility built-in.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    prerequisites: ["html-basics"],
    objectives: ["Build accessible forms", "Use built-in validation", "Understand FormData"],
    tags: ["html", "forms"],
    body: [
      { type: "code", lang: "html", code: `<form id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="age">Age</label>
  <input id="age" name="age" type="number" min="13" required />

  <button type="submit">Sign up</button>
</form>` },
      { type: "p", text: "Always pair an <input> with a <label>. The browser handles required, type, min, max, pattern — for free." },
    ],
    summary: "Use the right input type and a real <label>. Most validation is already in the browser.",
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
      { type: "list", items: [
        "Every <img> needs alt text. Decorative images use alt=\"\".",
        "Every interactive element must be reachable with Tab.",
        "Color is not enough — pair color with text or icons.",
        "Use ARIA to enhance, not replace, native semantics.",
      ] },
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
      { type: "code", lang: "css", code: `/* element */
p { color: gray; }
/* class */
.card { padding: 1rem; }
/* id */
#hero { font-size: 3rem; }
/* attribute */
input[type="email"] { border-color: hotpink; }
/* pseudo-class */
button:hover { transform: translateY(-2px); }` },
      { type: "p", text: "Specificity is counted as (inline, id, class, element). A higher number wins. !important overrides everything — avoid it." },
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
      { type: "code", lang: "css", code: `*, *::before, *::after { box-sizing: border-box; }

.card {
  width: 320px;
  padding: 16px;
  border: 2px solid black;
  margin: 24px;
}` },
      { type: "p", text: "With border-box, width includes padding and border. With the default content-box, width is only the content — easy to make off-by-pixel mistakes." },
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
      { type: "code", lang: "css", code: `.row {
  display: flex;
  align-items: center;     /* vertical */
  justify-content: space-between; /* horizontal */
  gap: 1rem;
}` },
      { type: "p", text: "Flex containers control children with align-items, justify-content, and gap. Children control themselves with flex-grow, flex-shrink, flex-basis." },
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
      { type: "code", lang: "css", code: `.bento {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.tall { grid-row: span 2; }
.wide { grid-column: span 2; }` },
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
    analogy: "If HTML is the building and CSS is the paint, JavaScript is the electricity that turns the lights on.",
    body: [
      { type: "p", text: "JavaScript is a programming language created in 1995 by Brendan Eich. It runs in every browser, on servers (Node.js), and even on edge functions. It is the most-used language on the planet — for good reason." },
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
      { type: "callout", tone: "tip", text: "Open the browser DevTools console (F12) and type 1 + 1. Anything you can do in JS, you can try there." },
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
    objectives: ["Explain what an engine does", "Read a call stack", "Know what an execution context is"],
    tags: ["js", "engine"],
    analogy: "Think of the JS engine as a chef. The call stack is the order ticket queue. Each ticket (function call) is finished before the next is started.",
    body: [
      { type: "p", text: "A JavaScript engine (V8 in Chrome and Node, SpiderMonkey in Firefox, JavaScriptCore in Safari) reads your code, compiles it to fast machine code, and runs it." },
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
      { type: "p", text: "Every function call pushes a frame onto the call stack. When it returns, the frame pops off. JavaScript is single-threaded — only one frame runs at a time." },
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
      { type: "callout", tone: "tip", text: "Default to const. Switch to let only when you actually reassign. Never use var in new code." },
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
    mistakes: ["Using var and getting unexpected hoisting bugs.", "Reassigning a const (TypeError)."],
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
      { type: "p", text: "Primitives are copied by value. Objects (and arrays, functions) are passed by reference." },
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
    description: "Why \"5\" + 1 is \"51\" and why you should always use ===.",
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
      { type: "callout", tone: "warn", text: "Always use === and !==. Coercion has too many edge cases." },
    ],
    summary: "Use ===. Convert types explicitly with Number(), String(), Boolean().",
  },

  // ──────────────────── PHASE 3: FUNCTIONS ────────────────────
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
    summary: "Default to arrow functions. Use named declarations for top-level, reusable functions.",
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
    analogy: "A closure is a backpack. When a function leaves home, it carries the variables it needs with it.",
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
      { type: "p", text: "The inner arrow remembers count even after makeCounter has returned. That is a closure." },
      { type: "h", text: "Hoisting" },
      { type: "p", text: "Function declarations and var are hoisted to the top of their scope. let and const are not — accessing them too early throws a ReferenceError (the temporal dead zone)." },
    ],
    summary: "Closures = functions + the variables they captured. The basis for modules, callbacks, and React hooks.",
    related: ["functions", "modules"],
  },

  // ──────────────────── PHASE 4: ARRAYS ────────────────────
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
      { type: "callout", tone: "tip", text: "map/filter/reduce return NEW arrays. push/pop/sort mutate the original. Prefer immutable methods." },
    ],
    summary: "map = transform, filter = subset, reduce = combine. These three replace 90% of for loops.",
  },

  // ──────────────────── PHASE 5: OBJECTS ────────────────────
  {
    slug: "objects",
    track: "javascript",
    phase: "Objects",
    title: "Objects, Destructuring & Spread",
    description: "Modern object patterns: destructuring, spread/rest, optional chaining, nullish coalescing.",
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
    analogy: "The call stack is one cashier. The task queue is the line. The event loop calls the next person only when the cashier is free.",
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
    objectives: ["Read and write a Promise", "Use async/await with try/catch", "Run things in parallel with Promise.all"],
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
      { type: "callout", tone: "tip", text: "await pauses the function, not the page. Other code keeps running." },
    ],
    summary: "async/await = Promises that read like sync code. Wrap awaits in try/catch and parallelize with Promise.all.",
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
      { type: "p", text: "Under the hood there is no class — just objects linked to other objects via [[Prototype]]. class is friendlier syntax for the same thing." },
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
    summary: "Modules let you split code into files. Use named exports by default; default exports for the main thing of a file.",
  },

  // ──────────────────── PHASE 13–19 (compact lessons) ────────────────────
  {
    slug: "functional-programming",
    track: "javascript",
    phase: "Functional Programming",
    title: "Functional Patterns",
    description: "Immutability, composition, currying, partial application — used every day in React.",
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
    summary: "Pure functions + immutability = code that is easier to test, reason about, and change.",
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
      { type: "list", items: [
        "GET — read",
        "POST — create",
        "PUT — replace",
        "PATCH — partial update",
        "DELETE — remove",
      ] },
      { type: "code", lang: "js", code: `const data = JSON.parse('{"a":1}'); // string → object
const text = JSON.stringify(data);   // object → string` },
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
      { type: "p", text: "A bundler (Vite, esbuild) takes your many small files and produces a few optimized files for production." },
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
    objectives: ["Use top-level await in modules", "Use #private fields", "Know toSorted, toReversed, with"],
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
    summary: "JavaScript keeps shipping useful things. Learn the new immutable array methods first.",
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
      { type: "list", items: [
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
      ] },
      { type: "callout", tone: "tip", text: "Master these ten before opening a React tutorial. You will fly." },
    ],
    summary: "Arrow funcs, destructuring, spread, map, async/await, closures, modules. That is React's JavaScript.",
    related: ["functions", "arrays", "objects", "promises-async-await", "modules"],
  },
];

export const TRACKS = [
  { id: "html", title: "HTML", color: "var(--color-warning)", description: "Structure of the web." },
  { id: "css", title: "CSS", color: "var(--color-accent-2)", description: "Style, layout, motion." },
  { id: "javascript", title: "JavaScript", color: "var(--color-accent)", description: "Behavior. The big one." },
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
