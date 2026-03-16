import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import { About } from "../components/About";
import { Education } from "../components/Education";
import { Experience } from "../components/Experience";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { LanguageProvider } from "../language-context";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  
  if (lang !== "en" && lang !== "es") {
    notFound();
  }

  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen bg-white py-16 px-4">
        <main className="max-w-2xl mx-auto">
          <Header />
          <Profile />
          <About />
          <Experience />
          <Education />
          <Projects />
          <Skills />
        </main>
      </div>
    </LanguageProvider>
  );
}
