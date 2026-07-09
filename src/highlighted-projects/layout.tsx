import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Target,
  Hammer,
  Folder,
  Layers,
  BookOpenCheck,
  ChevronLeft,
} from "lucide-react";
import { HighlightedProject, HIGHLIGHTED_PROJECTS } from "./data";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { CollapsibleSection } from "./components/CollapsibleSection";
import { ScrollProgressBar, ProjectCompletion } from "./components/ProgressIndicator";
import { TableOfContents } from "./components/TableOfContents";
import { CodeBlock } from "@/components/CodeBlock";

export function ProjectLayout({ project }: { project: HighlightedProject }) {
  const formatCodeLang = (lang: string): "js" | "html" | "css" => {
    const l = lang.toLowerCase();
    if (l === "html") return "html";
    if (l === "css") return "css";
    return "js";
  };

  return (
    <div className="relative min-h-screen">
      {/* 1. Scroll reading progress bar */}
      <ScrollProgressBar />

      <div className="mx-auto max-w-[1400px] px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs projectTitle={project.title} />
        </div>

        {/* Page Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-border pb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="chip">Project {project.projectNumber} of 6</span>
                <span className="chip">
                  <Target className="h-3.5 w-3.5" /> {project.difficulty}
                </span>
                <span className="chip">
                  <Clock className="h-3.5 w-3.5" /> {project.estimatedTime}
                </span>
              </div>
              <h1 className="text-3xl font-black md:text-5xl tracking-tight flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-border bg-accent text-accent-foreground shadow-[3px_3px_0_0_var(--color-border)]">
                  <Hammer className="h-6 w-6" />
                </span>
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.objective}</p>
            </div>
            {/* Completion Persistence */}
            <ProjectCompletion slug={project.slug} />
          </div>
        </header>

        {/* Two Column Layout: Sticky outline TOC + Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main content column */}
          <main className="space-y-6">
            {/* Section 1: Overview */}
            <div id="section-container-overview">
              <CollapsibleSection
                id="overview"
                title="Overview"
                sectionNumber={1}
                defaultOpen={true}
              >
                <p className="text-lg font-medium text-foreground">
                  {project.overview.description}
                </p>

                <h4 className="font-extrabold mt-6 mb-2">Why It Exists</h4>
                <p>{project.overview.whyItExists}</p>

                <h4 className="font-extrabold mt-6 mb-2">Real-World Usage & Business Value</h4>
                <p>{project.overview.realWorldUsage}</p>
                <div className="my-4 rounded-xl border-2 border-border bg-accent/5 p-4 border-l-4 border-l-accent">
                  <strong>Business Value:</strong> {project.overview.businessValue}
                </div>

                <h4 className="font-extrabold mt-6 mb-2">Developer Skills Gained</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {project.overview.developerSkillsGained.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>

                <h4 className="font-extrabold mt-6 mb-2">How it Prepares You for React</h4>
                <p className="bg-muted p-4 rounded-xl border border-border">
                  {project.overview.howItPreparesForReact}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl border-2 border-border bg-card">
                    <h5 className="font-extrabold flex items-center gap-2 mb-2 text-sm text-[var(--color-accent-2)]">
                      <Folder className="h-4 w-4" /> Expected Folder Structure
                    </h5>
                    <pre className="font-mono text-xs p-3 rounded bg-black/40 text-zinc-300 whitespace-pre">
                      {project.overview.expectedFolderStructure}
                    </pre>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-border bg-card">
                    <h5 className="font-extrabold flex items-center gap-2 mb-2 text-sm text-[var(--color-accent-2)]">
                      <Layers className="h-4 w-4" /> Expected Final UI
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {project.overview.expectedFinalUI}
                    </p>
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 2: Learning Objectives */}
            <div id="section-container-objectives">
              <CollapsibleSection id="objectives" title="Learning Objectives" sectionNumber={2}>
                <p className="mb-4">By the end of this project, you will be able to:</p>
                <ul className="space-y-3">
                  {project.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/30 font-mono text-[10px] font-bold">
                        ✓
                      </span>
                      <span className="text-sm md:text-base">{obj}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            </div>

            {/* Section 3: Final Project Preview */}
            <div id="section-container-preview">
              <CollapsibleSection id="preview" title="Final Project Preview" sectionNumber={3}>
                <div className="bento p-5 border-l-4 border-l-accent bg-accent/5 mb-6 text-sm">
                  <strong>Visual Layout Guide:</strong>{" "}
                  {project.finalProjectPreview.mockupImageDescription}
                </div>
                <h4 className="font-extrabold mb-3">Key Functional Elements</h4>
                <div className="space-y-4">
                  {project.finalProjectPreview.annotatedComponents.map((comp, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border bg-muted/50">
                      <strong className="text-foreground text-sm block mb-1">■ {comp.name}</strong>
                      <p className="text-xs text-muted-foreground">{comp.description}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 4: Concepts Covered */}
            <div id="section-container-concepts">
              <CollapsibleSection id="concepts" title="Concepts Covered" sectionNumber={4}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.conceptsCovered).map(([category, items]) => {
                    if (items.length === 0) return null;
                    const displayLabel =
                      category === "html"
                        ? "HTML5"
                        : category === "css"
                          ? "CSS3 Styling"
                          : category === "javascript"
                            ? "JavaScript ES6+"
                            : category === "browserApis"
                              ? "Browser Web APIs"
                              : category === "accessibility"
                                ? "A11y Accessibility"
                                : category === "performance"
                                  ? "Performance Controls"
                                  : "Architecture & Patterns";

                    return (
                      <div key={category} className="p-4 rounded-xl border border-border bg-card">
                        <h5 className="font-extrabold text-sm mb-3 border-b border-border pb-1 text-foreground">
                          {displayLabel}
                        </h5>
                        <ul className="space-y-2">
                          {items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 5: Prerequisites */}
            <div id="section-container-prerequisites">
              <CollapsibleSection id="prerequisites" title="Prerequisites" sectionNumber={5}>
                <p className="mb-4">
                  Before starting, make sure you have read and understood the following curriculum
                  pages:
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.prerequisites.map((prereq, idx) => (
                    <Link
                      key={idx}
                      to={prereq.url}
                      className="btn-ghost flex items-center gap-2 text-xs py-2 px-3 border-2 border-border shadow-[2px_2px_0_0_var(--color-border)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                    >
                      <BookOpen className="h-4 w-4 text-[var(--color-accent-2)]" />
                      <span>{prereq.title}</span>
                    </Link>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 6: Project Planning */}
            <div id="section-container-planning">
              <CollapsibleSection id="planning" title="Project Planning" sectionNumber={6}>
                <h4 className="font-extrabold mb-2 text-sm text-[var(--color-accent-2)]">
                  Folder Setup & Loading
                </h4>
                <p className="mb-4">{project.projectPlanning.folderStructure}</p>

                <h4 className="font-extrabold mb-2 text-sm text-[var(--color-accent-2)]">
                  Naming Guidelines
                </h4>
                <p className="mb-4">{project.projectPlanning.namingConventions}</p>

                <h4 className="font-extrabold mb-2 text-sm text-[var(--color-accent-2)]">
                  Visual Layout Breakdown
                </h4>
                <p className="mb-4">{project.projectPlanning.uiBreakdown}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-border bg-muted/40">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Component Hierarchy
                    </h5>
                    <ul className="list-disc pl-5 text-xs space-y-1">
                      {project.projectPlanning.componentBreakdown.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-muted/40">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Data & State Flow
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong>Data:</strong> {project.projectPlanning.dataFlow}
                      <br />
                      <br />
                      <strong>State:</strong> {project.projectPlanning.stateFlow}
                    </p>
                  </div>
                </div>

                <h4 className="font-extrabold mb-3">File Responsibilities</h4>
                <div className="overflow-x-auto rounded-xl border-2 border-border shadow-[4px_4px_0_0_var(--color-border)]">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-muted border-b-2 border-border font-bold">
                        <th className="p-3 border-r-2 border-border">File Name</th>
                        <th className="p-3">Core Scope & Responsibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.projectPlanning.fileResponsibilities.map((item, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted/30">
                          <td className="p-3 border-r-2 border-border font-mono font-bold text-[var(--color-accent-2)]">
                            {item.file}
                          </td>
                          <td className="p-3 text-muted-foreground">{item.responsibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 7: Step-by-Step Build Guide */}
            <div id="section-container-build">
              <CollapsibleSection id="build" title="Step-by-Step Build Guide" sectionNumber={7}>
                <p className="mb-6 text-muted-foreground">
                  Follow these development phases sequentially. Do not copy-paste code; focus on the
                  architectural mechanics.
                </p>

                <div className="space-y-8">
                  {project.buildGuide.map((phase) => (
                    <div
                      key={phase.phaseNumber}
                      className="relative pl-6 md:pl-8 border-l-2 border-border/60"
                    >
                      {/* Phase Dot Marker */}
                      <span className="absolute -left-[13px] top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-border bg-background text-[10px] font-black">
                        {phase.phaseNumber}
                      </span>

                      <h4 className="font-black text-lg md:text-xl text-foreground flex flex-wrap items-center gap-2">
                        <span>
                          Phase {phase.phaseNumber}: {phase.title}
                        </span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 bg-muted/40 p-4 rounded-xl border border-border">
                        <div>
                          <strong className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                            Development Goal
                          </strong>
                          <p className="text-xs">{phase.goal}</p>
                        </div>
                        <div>
                          <strong className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                            Why this sequence
                          </strong>
                          <p className="text-xs text-muted-foreground">{phase.why}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <strong className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                          Phase Tasks Checklist
                        </strong>
                        <ul className="space-y-1.5">
                          {phase.tasks.map((task, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs text-muted-foreground"
                            >
                              <input
                                type="checkbox"
                                id={`phase-${phase.phaseNumber}-task-${idx}`}
                                className="mt-0.5 cursor-pointer rounded border-border text-accent focus:ring-ring"
                              />
                              <label
                                htmlFor={`phase-${phase.phaseNumber}-task-${idx}`}
                                className="cursor-pointer"
                              >
                                {task}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {phase.miniSyntaxExamples.map((ex, idx) => (
                        <div key={idx} className="mt-4">
                          <strong className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                            Code Pattern Example
                          </strong>
                          <CodeBlock
                            code={ex.code}
                            title={ex.explanation}
                            lang={formatCodeLang(project.technologiesUsed[0])}
                          />
                        </div>
                      ))}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                        <div className="p-3 rounded-lg border border-border/80 bg-accent/5">
                          <strong className="text-accent block mb-1">Architecture Notes</strong>
                          <p className="text-muted-foreground">{phase.architectureNotes}</p>
                        </div>
                        <div className="p-3 rounded-lg border border-border/80 bg-destructive/5">
                          <strong className="text-[var(--color-destructive)] block mb-1">
                            Common Misconceptions
                          </strong>
                          <p className="text-muted-foreground">{phase.commonMisconceptions}</p>
                        </div>
                      </div>

                      <div className="mt-4 text-xs font-semibold text-foreground bg-card border border-border px-3 py-2 rounded-md inline-block">
                        Expected Outcome:{" "}
                        <span className="text-muted-foreground font-normal">
                          {phase.expectedOutcome}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 8: Engineering Notes */}
            <div id="section-container-engineering">
              <CollapsibleSection id="engineering" title="Engineering Notes" sectionNumber={8}>
                <div className="space-y-5">
                  <div>
                    <h4 className="font-extrabold text-sm text-[var(--color-accent-2)] mb-1">
                      Professional Production Approach
                    </h4>
                    <p>{project.engineeringNotes.whyProfessionalApproach}</p>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[var(--color-accent-2)] mb-1">
                      Alternative Approaches
                    </h4>
                    <p>{project.engineeringNotes.alternativeApproaches}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <strong className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                        Tradeoffs & Analysis
                      </strong>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {project.engineeringNotes.tradeoffs}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <strong className="text-[var(--color-destructive)] text-xs uppercase tracking-wider block mb-2">
                        When NOT to use this model
                      </strong>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {project.engineeringNotes.whenNotToUse}
                      </p>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 9: Common Mistakes */}
            <div id="section-container-mistakes">
              <CollapsibleSection id="mistakes" title="Common Mistakes" sectionNumber={9}>
                <div className="space-y-6">
                  {project.commonMistakes.map((mistake, idx) => (
                    <div
                      key={idx}
                      className="bento p-5 border-l-4 border-l-[var(--color-destructive)] bg-destructive/5 text-sm"
                    >
                      <strong className="text-foreground block text-base mb-1">
                        ✕ Bug Symptom: {mistake.symptom}
                      </strong>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                            Root Cause
                          </span>
                          <p className="text-xs">{mistake.cause}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-success)] block">
                            Code Fix
                          </span>
                          <p className="text-xs">{mistake.fix}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-border/40 text-xs text-muted-foreground">
                        <div>
                          <strong>Why it happened:</strong> {mistake.whyItHappened}
                        </div>
                        <div>
                          <strong>How to prevent:</strong> {mistake.howToAvoid}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 10: Debugging Workflow */}
            <div id="section-container-debugging">
              <CollapsibleSection id="debugging" title="Debugging Workflow" sectionNumber={10}>
                <p className="mb-4 text-muted-foreground">
                  Instead of guessing solutions, use the browser developer console toolsets
                  systematically:
                </p>
                <div className="space-y-4">
                  {project.debuggingWorkflow.map((flow, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="chip bg-accent/20 text-foreground font-mono text-xs">
                          {flow.tool}
                        </span>
                        <strong className="text-sm font-bold">{flow.scenario}</strong>
                      </div>
                      <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1 my-2">
                        {flow.steps.map((step, sIdx) => (
                          <li key={sIdx}>{step}</li>
                        ))}
                      </ol>
                      <p className="text-[11px] bg-muted/60 p-2 rounded text-muted-foreground">
                        <strong>Why this works:</strong> {flow.whyThisWay}
                      </p>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 11: Verification Checklist */}
            <div id="section-container-checklist">
              <CollapsibleSection id="checklist" title="Verification Checklist" sectionNumber={11}>
                <p className="mb-4 text-muted-foreground">
                  Run a complete QA review. Ensure all items are checked before launching:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.verificationChecklist).map(([key, items]) => {
                    const label = key.toUpperCase();
                    return (
                      <div key={key} className="p-4 rounded-xl border border-border bg-muted/30">
                        <span className="text-[10px] font-bold tracking-wider text-muted-foreground block mb-2">
                          {label}
                        </span>
                        <ul className="space-y-1.5">
                          {items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-muted-foreground"
                            >
                              <input
                                type="checkbox"
                                id={`checklist-${key}-${idx}`}
                                className="mt-0.5 cursor-pointer rounded border-border"
                              />
                              <label htmlFor={`checklist-${key}-${idx}`} className="cursor-pointer">
                                {item}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 12: Stretch Challenges */}
            <div id="section-container-stretch">
              <CollapsibleSection id="stretch" title="Stretch Challenges" sectionNumber={12}>
                <div className="bento p-5 border-l-4 border-l-[var(--color-accent-2)] bg-[var(--color-accent-2)]/5 mb-4 text-sm font-medium">
                  Take the builder code further. These 5 challenges are optional, have no solutions,
                  and test true engineering ability.
                </div>
                <ol className="space-y-3">
                  {project.stretchChallenges.map((challenge, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-lg border border-border bg-card flex items-start gap-3"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-accent/15 text-foreground font-mono text-xs font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-sm pt-0.5 text-muted-foreground">{challenge}</p>
                    </li>
                  ))}
                </ol>
              </CollapsibleSection>
            </div>

            {/* Section 13: Reflection */}
            <div id="section-container-reflection">
              <CollapsibleSection id="reflection" title="Reflection Questions" sectionNumber={13}>
                <p className="mb-4">
                  Retain lessons by answering these conceptual design questions:
                </p>
                <div className="space-y-4">
                  {project.reflectionQuestions.map((question, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border bg-card">
                      <strong className="text-sm text-foreground block mb-2">{question}</strong>
                      <textarea
                        placeholder="Write down your engineering logic here..."
                        className="w-full text-xs p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y min-h-[80px]"
                      />
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 14: Resources */}
            <div id="section-container-resources">
              <CollapsibleSection id="resources" title="Resources" sectionNumber={14}>
                <p className="mb-4 text-muted-foreground">
                  Utilize verified documentation references for further reading. No third-party
                  blogs or video channels are listed:
                </p>
                <div className="flex flex-col gap-2">
                  {project.resources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg border-2 border-border bg-card flex items-center justify-between text-xs hover:bg-muted font-bold transition shadow-[2px_2px_0_0_var(--color-border)]"
                    >
                      <span className="flex items-center gap-2 text-foreground">
                        <BookOpenCheck className="h-4 w-4 text-[var(--color-accent-2)]" />
                        {res.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 font-normal">
                        {res.url}
                      </span>
                    </a>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Section 15: Next Project */}
            <div id="section-container-next">
              <CollapsibleSection id="next" title="Next Project Bridge" sectionNumber={15}>
                {project.nextProject ? (
                  <div>
                    <h4 className="font-extrabold text-lg text-foreground mb-2">
                      Ready for the next step?
                    </h4>
                    <p className="mb-5 text-muted-foreground">
                      {project.nextProject.bridgeExplanation}
                    </p>
                    <Link
                      to="/highlighted-projects/$slug"
                      params={{ slug: project.nextProject.slug }}
                      className="btn-accent gap-2 py-3 px-5 text-sm inline-flex items-center"
                    >
                      <span>Advance to: {project.nextProject.title}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <h4 className="font-extrabold text-xl text-[var(--color-success)] mb-2">
                      🏆 Curriculum Completed!
                    </h4>
                    <p className="max-w-md mx-auto text-muted-foreground text-sm leading-relaxed">
                      You have successfully completed all six highlighted projects. You have
                      developed a deep mental model of DOM layout, event bubbles, client states, API
                      integrations, data reductions, and custom dragging interfaces.
                    </p>
                    <div className="mt-5 p-4 rounded-xl border border-border bg-muted max-w-lg mx-auto text-xs text-left">
                      <strong>React Readiness Bridge:</strong> Now, when you learn React, terms like
                      state triggers, re-renders, components separation, and async effects will feel
                      like natural wrappers. You are prepared to begin React development with
                      confidence.
                    </div>
                  </div>
                )}
              </CollapsibleSection>
            </div>

            {/* Bottom Nav Links */}
            <div className="flex items-center justify-between border-t-2 border-border pt-6 mt-10">
              {project.projectNumber > 1 ? (
                <Link
                  to="/highlighted-projects/$slug"
                  params={{ slug: HIGHLIGHTED_PROJECTS[project.projectNumber - 2].slug }}
                  className="btn-ghost gap-2 py-2 px-4 text-xs md:text-sm inline-flex items-center"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous Project</span>
                </Link>
              ) : (
                <Link
                  to="/highlighted-projects"
                  className="btn-ghost gap-2 py-2 px-4 text-xs md:text-sm inline-flex items-center"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Landing</span>
                </Link>
              )}
              {project.nextProject && (
                <Link
                  to="/highlighted-projects/$slug"
                  params={{ slug: project.nextProject.slug }}
                  className="btn-accent gap-2 py-2 px-4 text-xs md:text-sm inline-flex items-center"
                >
                  <span>Next Project</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </main>

          {/* Sidebar Section outline index */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
