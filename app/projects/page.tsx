import { Metadata } from "next/types";
import ProjectsPage from "./Projects";

export async function generateMetadata(): Promise<Metadata> {
  const description =
    "Project showcase of a software developer specializing in creating web applications, mobile applications, and other software solutions that empower businesses and individuals to thrive in the digital age.";
  return {
    title: "Projects",
    description: description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    },
    openGraph: {
      type: "website",
      locale: "th_TH",
      siteName: "Knot",
      title: "Projects",
      description: description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
          alt: description,
          secureUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Page() {
  return <ProjectsPage />;
}
