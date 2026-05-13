export interface Tip {
  slug: string;
  title: string;
  category: "Discipline" | "Productivity" | "Learning" | "Mindset";
  body: string;
  bullets?: string[];
}

export const TIPS: Tip[] = [
  {
    slug: "deep-work",
    title: "Deep Work — The Real Cheat Code",
    category: "Productivity",
    body: "Two hours of focused, undistracted coding beats eight hours of half-attention. Block time on your calendar. Phone in another room. One tab. One problem.",
    bullets: ["Pick ONE thing per session.", "Phone outside the room.", "One browser tab open.", "Use a real timer."],
  },
  {
    slug: "pomodoro",
    title: "Pomodoro — 25 / 5",
    category: "Productivity",
    body: "Work 25 minutes, break 5. After four rounds, take 20. The structure protects you from yourself.",
  },
  {
    slug: "active-recall",
    title: "Active Recall > Re-reading",
    category: "Learning",
    body: "Close the tab. Try to write the answer or build the thing without looking. The struggle IS the learning.",
    bullets: ["Build before reading the solution.", "Explain the topic in plain words.", "Teach an imaginary friend."],
  },
  {
    slug: "spaced-repetition",
    title: "Spaced Repetition",
    category: "Learning",
    body: "Review yesterday today. Review last week today. Review last month today. Memory needs reminders, not heroics.",
  },
  {
    slug: "tutorial-hell",
    title: "Escape Tutorial Hell",
    category: "Mindset",
    body: "Ratio: for every 30 minutes of tutorial, build 60 minutes without one. If you can copy the code but not write it from scratch, you do not know it yet.",
  },
  {
    slug: "read-the-docs",
    title: "How to Read Documentation",
    category: "Learning",
    body: "Skim → find the example → run it locally → tweak it → read the prose. Docs are reference material. Try first, read carefully second.",
  },
  {
    slug: "debugging-mindset",
    title: "The Debugging Mindset",
    category: "Mindset",
    body: "Bugs are not failures. They are conversations with the machine. Read the error literally. Reproduce reliably. Change one thing at a time.",
    bullets: [
      "Read the FULL error message slowly.",
      "Reproduce in 1 minute or you cannot fix it.",
      "Binary search the code: comment half out.",
      "Rubber-duck: explain it out loud.",
    ],
  },
  {
    slug: "consistency",
    title: "Consistency Beats Intensity",
    category: "Discipline",
    body: "30 minutes a day for 90 days is 45 hours of compound progress. 10 hours on Sunday once is forgotten by Wednesday.",
  },
  {
    slug: "goal-setting",
    title: "Set Outputs, Not Inputs",
    category: "Discipline",
    body: "Bad goal: 'study for an hour.' Good goal: 'ship a click counter that persists.' Hours lie. Artifacts do not.",
  },
  {
    slug: "interview-prep",
    title: "Interview Prep Habits",
    category: "Mindset",
    body: "1 problem a day. 30 minutes max. If stuck, read the solution, then re-do it from scratch tomorrow. Skill compounds.",
  },
];
