import type { Projects } from "@/types/project.type";

export const projects: Projects[] = [
  {
    title: "Hono Stacks",
    description: "Build Hono.js Template with Auth, Caching, etc.",
    image: "/images/projects/hono.png",
    linkGithub: "https://github.com/Notties/blog-hono-api",
    linkWebsite: "",
    stacks: ["Hono", "Redis", "Docker"],
    category: "Back-end",
  },
  {
    title: "Knot",
    description: "Portfolio site built with Next.js and Tailwind CSS.",
    image: "/images/projects/knot.png",
    linkGithub: "https://github.com/Notties/knot-dev",
    linkWebsite: "https://knot-dev.tech/",
    stacks: ["Next.js", "Tailwind CSS", ".mdx"],
    category: "Front-end",
  },
  {
    title: "E-commerce CMS",
    description: "E-commerce Platform with CMS & Payment",
    image: "/images/projects/e-commerce-shop.png",
    linkGithub: "https://github.com/Notties/e-commerce-shop-next",
    linkWebsite: "https://e-commerce-shop-next-eight.vercel.app/",
    stacks: ["Next.js", "Sanity", "Stripe"],
    category: "Front-end",
  },
  {
    title: "FastAPI Ops",
    description:
      "Python FastAPI Deployment using GitHub Actions, AWS ECR, ECS, App runner",
    image: "/images/projects/fastapi.png",
    linkGithub: "https://github.com/Notties/fast-api-ops",
    linkWebsite: "",
    stacks: ["FastAPI", "AWS", "GitHub Actions"],
    category: "Back-end",
  },
];
