import { Header } from "./components/Header";
import { Profile } from "./components/Profile";
import { About } from "./components/About";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <main className="max-w-2xl mx-auto">
        <Header />
        <Profile />
        <About />
        <Education />
        <Experience />
        <Skills />
      </main>
    </div>
  );
}
