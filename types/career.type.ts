import type dynamicIconImports from "lucide-react/dynamicIconImports";

export type Career = {
  name: string;
  href: string;
  title: string;
  logo: string;
  start: string;
  end?: string;
  description: string[];
  links?: {
    name: string;
    href: string;
    icon?: keyof typeof dynamicIconImports;
  }[];
};
