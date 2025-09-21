import { Metadata } from "next/types";
import ProjectsPage from "./Projects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description:
      "Software developer in Thailand specializing in creating web applications, mobile applications",
    alternates: {
      canonical: `https://knot-dev.tech/projects`,
    },
    openGraph: {
      type: "website",
      locale: "th_TH",
      siteName: "Knot",
      title: "Projects",
      description:
        "Software developer in Thailand specializing in creating web applications, mobile applications",
      images: [
        {
          url: "https://knot-dev.tech/og-image.png",
          alt: "Software developer in Thailand specializing in creating web applications, mobile applications",
          secureUrl: "https://knot-dev.tech/og-image.png",
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
