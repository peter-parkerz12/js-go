import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/highlighted-projects/index";

export const Route = createFileRoute("/highlighted-projects/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Highlighted Projects — JS:GO" },
      {
        name: "description",
        content:
          "Premium progressive learning path preparing students for modern frontend engineering.",
      },
    ],
  }),
});
