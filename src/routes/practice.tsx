import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/practice")({
  component: Practice,
  head: () => ({
    meta: [
      { title: "Practice — JS:GO" },
      { name: "description", content: "Live HTML/CSS/JS playground." },
    ],
  }),
});

const DEFAULT_HTML = `<h1 id="t">Hello, JS:GO</h1>
<button id="b">Click me</button>`;
const DEFAULT_CSS = `body { font-family: system-ui; padding: 2rem; background: #0a0a0a; color: #fafafa; }
h1 { letter-spacing: -0.02em; }
button { padding: .6rem 1rem; border-radius: .5rem; border: 2px solid #a78bfa; background: transparent; color: #a78bfa; cursor: pointer; }`;
const DEFAULT_JS = `let n = 0;
document.getElementById("b").addEventListener("click", () => {
  n++;
  document.getElementById("t").textContent = "Clicked " + n + "x";
});`;

function Practice() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [tab, setTab] = useState<"html" | "css" | "js">("html");
  const [version, setVersion] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const srcDoc = useMemo(
    () =>
      `<!doctype html><html><head><style>${css}</style></head><body>${html}<script>try{${js}}catch(e){document.body.insertAdjacentHTML('beforeend','<pre style=\"color:#ef4444\">'+e+'</pre>')}<\/script></body></html>`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version],
  );

  useEffect(() => {
    const t = setTimeout(() => setVersion((v) => v + 1), 600);
    return () => clearTimeout(t);
  }, [html, css, js]);

  const reset = () => {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
  };
  const value = tab === "html" ? html : tab === "css" ? css : js;
  const setValue = tab === "html" ? setHtml : tab === "css" ? setCss : setJs;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Practice playground
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit. See it live. Break things on purpose.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setVersion((v) => v + 1)} className="btn-accent">
            <Play className="h-4 w-4" /> Run
          </button>
          <button onClick={reset} className="btn-ghost">
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="bento overflow-hidden p-0">
          <div className="flex border-b-2 border-border">
            {(["html", "css", "js"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  tab === t
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            className="block h-[45vh] w-full resize-none bg-[var(--color-code-bg)] p-4 font-mono text-xs text-zinc-200 outline-none sm:text-sm md:h-[60vh]"
          />
        </div>
        <div className="bento overflow-hidden p-0">
          <div className="border-b-2 border-border px-4 py-2 text-xs font-bold uppercase tracking-wider">
            Preview
          </div>
          <iframe
            ref={iframeRef}
            title="preview"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="h-[45vh] w-full bg-white md:h-[60vh]"
          />
        </div>
      </div>
    </div>
  );
}
