import { createFileRoute, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { LessonView } from "@/components/LessonView";
import { getLesson, LESSONS } from "@/data/curriculum";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/learn/javascript/$slug")({
  component: LessonPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-3xl font-black">Lesson not found</h1>
      <Link to="/learn/javascript" className="btn-accent mt-5 inline-flex">
        <ArrowLeft className="h-4 w-4" /> Back to JavaScript
      </Link>
    </div>
  ),
  head: ({ params }) => {
    const lesson = LESSONS.find((l) => l.slug === params.slug);
    return {
      meta: [
        { title: `${lesson?.title ?? "Lesson"} — JS:GO` },
        { name: "description", content: lesson?.description ?? "JavaScript lesson" },
      ],
    };
  },
});

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = getLesson(slug);
  if (!lesson) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-3xl font-black">Lesson not found</h1>
        <Link to="/learn/javascript" className="btn-accent mt-5 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to JavaScript
        </Link>
      </div>
    );
  }
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] border-r-2 border-border lg:block">
        <Sidebar />
      </aside>
      <LessonView lesson={lesson} />
    </div>
  );
}
