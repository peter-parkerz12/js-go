import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Code2, Compass, Dumbbell, Search, Sparkles, Target, Trophy, Zap } from "lucide-react";
import { BentoCard } from "@/components/BentoCard";
import { CodeBlock } from "@/components/CodeBlock";
import { LESSONS, TRACKS } from "@/data/curriculum";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "JS:GO — Learn JavaScript from Zero to Pro" },
      { name: "description", content: "Premium docs + bento learning for HTML, CSS, and JavaScript. Beginner to advanced in 60–90 days." },
    ],
  }),
});

function Home() {
  const totalLessons = LESSONS.length;
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:py-16">
      {/* Hero */}
      <section className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" /> {totalLessons} lessons</span>
            <span className="chip">HTML · CSS · JavaScript</span>
            <span className="chip">60–90 day plan</span>
          </div>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Learn JavaScript.
            <br />
            <span className="bg-gradient-to-r from-accent to-[var(--color-accent-2)] bg-clip-text text-transparent">
              Zero fluff. Zero jargon.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            A premium documentation platform that teaches HTML, CSS, and modern JavaScript so well you will be ready for React or Next.js — without ever feeling lost.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/learn/javascript" className="btn-accent">
              Start learning <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/roadmap" className="btn-ghost">View roadmap</Link>
            <Link to="/projects" className="btn-ghost">Browse projects</Link>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="bento p-3">
            <CodeBlock
              title="quickstart.js"
              code={`// Welcome to JS:GO
const learn = (you) => {
  const path = ["html", "css", "javascript"];
  return path.reduce((skill, topic) => skill + master(topic), 0);
};

learn(you).then(ship); // → React-ready`}
            />
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {TRACKS.map((t) => (
          <Link
            key={t.id}
            to={t.id === "javascript" ? "/learn/javascript" : t.id === "html" ? "/learn/html" : "/learn/css"}
            className="bento bento-hover group p-6"
          >
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider" style={{ color: t.color }}>
              <span className="h-2 w-2 rounded-full" style={{ background: t.color }} /> Track
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">{t.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
              Open track <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </section>

      {/* Bento grid features */}
      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">Built for real learners</h2>
          <Link to="/about" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
            About →
          </Link>
        </div>
        <div className="grid auto-rows-[140px] grid-cols-1 gap-4 md:grid-cols-4">
          <BentoCard span="xl" title="0 → Pro Syllabus" description="Every JS topic, ordered for the fastest path from beginner to job-ready." icon={<BookOpen className="h-5 w-5" />} to="/learn/javascript" accent>
            <div className="mt-auto flex flex-wrap gap-1">
              {["Foundations", "Functions", "Async", "DOM", "OOP", "FP", "Modern JS"].map((p) => (
                <span key={p} className="rounded-full border-2 border-border bg-background/30 px-2 py-0.5 text-[10px] font-semibold">
                  {p}
                </span>
              ))}
            </div>
          </BentoCard>
          <BentoCard title="Live Practice" description="Playground with instant preview." icon={<Code2 className="h-5 w-5" />} to="/practice" />
          <BentoCard title="Search" description="Cmd/Ctrl + K, instant results." icon={<Search className="h-5 w-5" />} to="/bookmarks" />
          <BentoCard title="Roadmap" description="60–90 day plan from zero to React-ready." icon={<Compass className="h-5 w-5" />} to="/roadmap" span="wide" />
          <BentoCard title="Projects" description="Real builds you can ship." icon={<Dumbbell className="h-5 w-5" />} to="/projects" />
          <BentoCard title="Tips & Discipline" description="Deep work, recall, anti-tutorial-hell." icon={<Sparkles className="h-5 w-5" />} to="/tips" />
          <BentoCard title="Progress" description="Track lessons. Bookmark anything." icon={<Trophy className="h-5 w-5" />} to="/progress" />
          <BentoCard title="Productivity" description="Habits that compound." icon={<Zap className="h-5 w-5" />} to="/productivity" />
          <BentoCard title="20% for React" description="The JS that matters most for React." icon={<Target className="h-5 w-5" />} to="/learn/javascript/twenty-percent-for-react" span="wide" accent />
        </div>
      </section>

      {/* Roadmap preview */}
      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-black tracking-tight md:text-3xl">The path</h2>
        <ol className="grid gap-3 md:grid-cols-4">
          {[
            { n: "01", title: "HTML & CSS", body: "Structure, layout, responsive design." },
            { n: "02", title: "JavaScript Foundations", body: "Variables, types, functions, scope." },
            { n: "03", title: "DOM & Events", body: "Make pages interactive." },
            { n: "04", title: "Async & Fetch", body: "Promises, async/await, real APIs." },
            { n: "05", title: "OOP & FP", body: "Classes, prototypes, pure functions." },
            { n: "06", title: "Modern JS", body: "Modules, ES2024+, tooling." },
            { n: "07", title: "Projects", body: "Build, ship, repeat." },
            { n: "08", title: "React-Ready", body: "Step into frameworks with confidence." },
          ].map((s) => (
            <li key={s.n} className="bento p-5">
              <div className="font-mono text-xs text-muted-foreground">{s.n}</div>
              <div className="mt-1 font-extrabold">{s.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.body}</div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
