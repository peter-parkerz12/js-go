import { useState, useMemo } from "react";
import { Check, Copy } from "lucide-react";

const KEYWORDS = {
  js: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|new|this|super|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|delete|void|null|undefined|true|false|yield|static|get|set)\b/g,
  ts: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|new|this|super|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|delete|void|null|undefined|true|false|yield|static|get|set|interface|type|enum|namespace|public|private|protected|readonly|implements)\b/g,
};

const TYPES_JS =
  /\b(string|number|boolean|object|symbol|bigint|any|unknown|never|void|Array|Object|Promise|Map|Set|Date|Math|JSON|console|document|window|localStorage)\b/g;

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightJs(code: string) {
  // Tokenize comments + strings first to avoid double-highlighting
  const tokens: { type: string; text: string }[] = [];
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    const rest = code.slice(i);
    // line comment
    let m = rest.match(/^\/\/[^\n]*/);
    if (m) {
      tokens.push({ type: "comment", text: m[0] });
      i += m[0].length;
      continue;
    }
    // block comment
    m = rest.match(/^\/\*[\s\S]*?\*\//);
    if (m) {
      tokens.push({ type: "comment", text: m[0] });
      i += m[0].length;
      continue;
    }
    // template literal
    if (ch === "`") {
      const end = rest.slice(1).search(/`/);
      const len = end === -1 ? rest.length : end + 2;
      tokens.push({ type: "string", text: rest.slice(0, len) });
      i += len;
      continue;
    }
    // string
    if (ch === '"' || ch === "'") {
      const re = new RegExp(`^${ch}(?:\\\\.|[^${ch}\\\\])*${ch}`);
      m = rest.match(re);
      if (m) {
        tokens.push({ type: "string", text: m[0] });
        i += m[0].length;
        continue;
      }
    }
    // number
    m = rest.match(/^-?\d+(\.\d+)?n?\b/);
    if (m) {
      tokens.push({ type: "number", text: m[0] });
      i += m[0].length;
      continue;
    }
    // identifier
    m = rest.match(/^[A-Za-z_$][\w$]*/);
    if (m) {
      tokens.push({ type: "ident", text: m[0] });
      i += m[0].length;
      continue;
    }
    tokens.push({ type: "punct", text: ch });
    i++;
  }
  const KW = KEYWORDS.js;
  return tokens
    .map((t, idx) => {
      const safe = escapeHtml(t.text);
      if (t.type === "comment")
        return `<span style="color:var(--color-code-comment)">${safe}</span>`;
      if (t.type === "string") return `<span style="color:var(--color-code-string)">${safe}</span>`;
      if (t.type === "number") return `<span style="color:var(--color-code-number)">${safe}</span>`;
      if (t.type === "ident") {
        if (new RegExp(KW.source).test(t.text))
          return `<span style="color:var(--color-code-keyword);font-weight:600">${safe}</span>`;
        if (TYPES_JS.test(t.text)) {
          TYPES_JS.lastIndex = 0;
          return `<span style="color:var(--color-code-type)">${safe}</span>`;
        }
        const next = tokens[idx + 1];
        if (next && next.text === "(")
          return `<span style="color:var(--color-code-fn)">${safe}</span>`;
        return `<span style="color:var(--color-code-var)">${safe}</span>`;
      }
      return `<span style="color:var(--color-code-punct)">${safe}</span>`;
    })
    .join("");
}

function highlightHtml(code: string) {
  const safe = escapeHtml(code);
  return safe
    .replace(
      /(&lt;\/?)([a-zA-Z][\w-]*)/g,
      `$1<span style="color:var(--color-code-keyword);font-weight:600">$2</span>`,
    )
    .replace(
      /([a-zA-Z-]+)=(&quot;[^&]*&quot;|"[^"]*")/g,
      `<span style="color:var(--color-code-fn)">$1</span>=<span style="color:var(--color-code-string)">$2</span>`,
    )
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, `<span style="color:var(--color-code-comment)">$1</span>`);
}

function highlightCss(code: string) {
  let safe = escapeHtml(code);
  safe = safe.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    `<span style="color:var(--color-code-comment)">$1</span>`,
  );
  safe = safe.replace(
    /([.#]?[a-zA-Z_-][\w-]*)\s*(\{)/g,
    `<span style="color:var(--color-code-keyword);font-weight:600">$1</span> $2`,
  );
  safe = safe.replace(/([a-z-]+)(\s*:)/g, `<span style="color:var(--color-code-fn)">$1</span>$2`);
  safe = safe.replace(
    /(:\s*)([^;{}\n]+)/g,
    (_, a, b) => `${a}<span style="color:var(--color-code-string)">${b}</span>`,
  );
  return safe;
}

interface Props {
  code: string;
  lang?: "js" | "ts" | "html" | "css";
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, lang = "js", title, showLineNumbers = true }: Props) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => {
    if (lang === "html") return highlightHtml(code);
    if (lang === "css") return highlightCss(code);
    return highlightJs(code);
  }, [code, lang]);

  const lines = code.split("\n");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="my-5 max-w-full overflow-hidden rounded-xl border-2 border-border bg-[var(--color-code-bg)] text-[11px] shadow-[6px_6px_0_0_var(--color-border)] sm:text-[12px] md:text-[13px]">
      <div className="flex items-center justify-between gap-3 border-b-2 border-border bg-black/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          {title && <span className="ml-3 font-mono text-xs text-zinc-400">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {lang}
          </span>
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-300 transition hover:bg-zinc-800"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[var(--color-success)]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <pre className="font-mono leading-relaxed">
          <code className="grid">
            {lines.map((line, i) => (
              <div key={i} className="grid min-w-0 grid-cols-[auto_1fr] items-start">
                {showLineNumbers && (
                  <span className="select-none border-r border-zinc-800 px-3 py-0.5 text-right text-zinc-600">
                    {i + 1}
                  </span>
                )}
                <span
                  className="px-4 py-0.5 text-zinc-200"
                  // single-line html string already escaped per token
                  dangerouslySetInnerHTML={{
                    __html: (() => {
                      // Re-highlight per line so layout is grid-aligned
                      if (lang === "html") return highlightHtml(line) || "&nbsp;";
                      if (lang === "css") return highlightCss(line) || "&nbsp;";
                      return highlightJs(line) || "&nbsp;";
                    })(),
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
        {/* fallback to ensure html constant is referenced (also useful for SEO) */}
        <span hidden dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
