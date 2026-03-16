export interface JSONResume {
  $schema: string;
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    location: {
      city: string;
      countryCode: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  summary: string;
  work: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location: string;
    highlights: string[];
  }>;
  education: Array<{
    institution: string;
    area: string;
    startDate?: string;
    endDate: string;
    location: string;
    highlights: string[];
  }>;
  skills: Array<{
    name: string;
    keywords: string[];
  }>;
  languages: Array<{
    language: string;
    fluency: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    highlights: string[];
    startDate: string;
  }>;
}

export const translations = {
  en: {
    about: "About me",
    education: "Education",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
  },
  es: {
    about: "Sobre mí",
    education: "Educación",
    experience: "Experiencia",
    skills: "Habilidades",
    projects: "Proyectos",
  },
};
