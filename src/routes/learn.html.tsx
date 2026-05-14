import { createFileRoute } from "@tanstack/react-router";
import { lessonsByTrack } from "@/data/curriculum";
import { CodeBlock } from "@/components/CodeBlock";

export const Route = createFileRoute("/learn/html")({
  component: HtmlPage,
  head: () => ({
    meta: [{ title: "HTML — JS:GO" }, { name: "description", content: "HTML fundamentals." }],
  }),
});

function HtmlPage() {
  const lessons = lessonsByTrack("html");
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">HTML</h1>
      <p className="mt-3 text-muted-foreground">The structure of every web page.</p>
      <div className="mt-8 space-y-10">
        {lessons.map((l) => (
          <section key={l.slug} id={l.slug} className="bento p-6 scroll-mt-20">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="chip">{l.phase}</span>
              <span className="chip">{l.difficulty}</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">{l.title}</h2>
            <p className="mt-2 text-muted-foreground">{l.description}</p>
            <div className="prose-doc mt-4">
              {l.body.map((b, i) => {
                if (b.type === "p") return <p key={i}>{b.text}</p>;
                if (b.type === "h") return <h3 key={i}>{b.text}</h3>;
                if (b.type === "list")
                  return (
                    <ul key={i}>
                      {b.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  );
                if (b.type === "code")
                  return <CodeBlock key={i} code={b.code} lang={b.lang} title={b.title} />;
                return null;
              })}
            </div>
            <p className="mt-3 text-sm font-semibold">{l.summary}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
