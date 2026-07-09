export interface HighlightedProject {
  slug: string;
  projectNumber: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  technologiesUsed: string[];
  conceptCount: number;
  objective: string;
  realWorldRelevance: string;

  // Section 1: Overview
  overview: {
    description: string;
    whyItExists: string;
    realWorldUsage: string;
    businessValue: string;
    developerSkillsGained: string[];
    howItPreparesForReact: string;
    expectedFolderStructure: string;
    expectedFinalUI: string;
  };

  // Section 2: Learning Objectives
  learningObjectives: string[];

  // Section 3: Final Project Preview
  finalProjectPreview: {
    mockupImageDescription: string;
    annotatedComponents: {
      name: string;
      description: string;
    }[];
  };

  // Section 4: Concepts Covered
  conceptsCovered: {
    html: string[];
    css: string[];
    javascript: string[];
    browserApis: string[];
    accessibility: string[];
    performance: string[];
    architecture: string[];
  };

  // Section 5: Prerequisites
  prerequisites: {
    title: string;
    url: string;
  }[];

  // Section 6: Project Planning
  projectPlanning: {
    folderStructure: string;
    namingConventions: string;
    componentBreakdown: string[];
    dataFlow: string;
    stateFlow: string;
    uiBreakdown: string;
    fileResponsibilities: {
      file: string;
      responsibility: string;
    }[];
  };

  // Section 7: Step-by-Step Build Guide
  buildGuide: {
    phaseNumber: number;
    title: string;
    goal: string;
    why: string;
    tasks: string[];
    expectedOutcome: string;
    miniSyntaxExamples: {
      code: string;
      explanation: string;
    }[];
    architectureNotes: string;
    commonMisconceptions: string;
  }[];

  // Section 8: Engineering Notes
  engineeringNotes: {
    whyProfessionalApproach: string;
    alternativeApproaches: string;
    tradeoffs: string;
    whenNotToUse: string;
  };

  // Section 9: Common Mistakes
  commonMistakes: {
    symptom: string;
    cause: string;
    fix: string;
    whyItHappened: string;
    howToAvoid: string;
  }[];

  // Section 10: Debugging Workflow
  debuggingWorkflow: {
    tool: "Console" | "Breakpoints" | "Network Tab" | "Application Tab" | "Sources" | "Performance";
    scenario: string;
    steps: string[];
    whyThisWay: string;
  }[];

  // Section 11: Verification Checklist
  verificationChecklist: {
    functional: string[];
    responsive: string[];
    accessibility: string[];
    performance: string[];
    browserCompatibility: string[];
    codeOrganization: string[];
    naming: string[];
    completion: string[];
  };

  // Section 12: Stretch Challenges
  stretchChallenges: string[]; // 5 items

  // Section 13: Reflection
  reflectionQuestions: string[];

  // Section 14: Resources
  resources: {
    title: string;
    url: string;
  }[];

  // Section 15: Next Project
  nextProject: {
    title: string;
    slug: string;
    bridgeExplanation: string;
  } | null;
}

import { project1 } from "./project-1";
import { project2 } from "./project-2";
import { project3 } from "./project-3";
import { project4 } from "./project-4";
import { project5 } from "./project-5";
import { project6 } from "./project-6";

export const HIGHLIGHTED_PROJECTS: HighlightedProject[] = [
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
];

export function getHighlightedProject(slug: string): HighlightedProject | undefined {
  return HIGHLIGHTED_PROJECTS.find((p) => p.slug === slug);
}
