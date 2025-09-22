import { Metadata } from "next/types";
import ProjectsPage from "./Projects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description:
      "Software developer in Thailand specializing in creating web applications, mobile applications",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
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
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
          alt: "Software developer in Thailand specializing in creating web applications, mobile applications",
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
