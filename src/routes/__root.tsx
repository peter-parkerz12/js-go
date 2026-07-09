import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { OfflineBanner } from "@/components/OfflineBanner";
import { UpdatePrompt } from "@/components/UpdatePrompt";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="bento max-w-md p-8 text-center">
        <div className="font-mono text-7xl font-black tracking-tight">404</div>
        <h2 className="mt-3 text-xl font-bold">Lesson not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That page does not exist. Head back and pick another path.
        </p>
        <Link to="/" className="btn-accent mt-5 inline-flex">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="bento max-w-md p-8 text-center">
        <h1 className="text-xl font-bold">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-5 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-brutal"
          >
            Try again
          </button>
          <Link to="/" className="btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JS:GO — Learn JavaScript from Zero to Pro" },
      {
        name: "description",
        content:
          "Premium documentation and learning platform for HTML, CSS, and JavaScript. Beginner to advanced in 60–90 days.",
      },
      { name: "author", content: "JS:GO" },
      { name: "theme-color", content: "#7c3aed" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { property: "og:title", content: "JS:GO — Learn JavaScript from Zero to Pro" },
      {
        property: "og:description",
        content: "Beginner to advanced JavaScript. Bento UI, dark neo-brutalism, real projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/icons/mysvg.svg" },
      { rel: "apple-touch-icon", href: "/icons/mysvg.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <OfflineBanner />
      <main className="min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
      <footer
        className="mt-16 border-t-2 border-border py-8 text-center text-xs text-muted-foreground"
        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
      >
        <span className="font-mono">JS:GO</span> · built to make you fluent in JavaScript ·
        <Link to="/about" className="ml-1 underline hover:text-foreground">
          about
        </Link>
      </footer>
      <UpdatePrompt />
    </QueryClientProvider>
  );
}
