import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import { About } from "../components/About";
import { Education } from "../components/Education";
import { Experience } from "../components/Experience";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { LanguageProvider } from "../language-context";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  
  if (lang !== "en" && lang !== "es") {
    return null;
  }

  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen bg-white">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Sidebar */}
          <aside className="lg:w-80 bg-zinc-900 p-8 lg:min-h-screen lg:sticky lg:top-0">
            <div className="lg:mt-16">
              <Profile />
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 p-8 lg:p-12 max-w-4xl">
            <Header />
            <About />
            <Experience />
            <Education />
            <Projects />
            <Skills />
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}
