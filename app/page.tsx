import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { Welkom } from "./components/Welkom";
import { Intermezzo } from "./components/Intermezzo";
import { Werkwijze } from "./components/Werkwijze";
import { OverMij } from "./components/OverMij";
import { Praktisch } from "./components/Praktisch";
import { SiteFooter } from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <div className="hairline" />
        <Welkom />
        <Intermezzo />
        <Werkwijze />
        <OverMij />
        <div className="hairline" />
        <Praktisch />
      </main>
      <SiteFooter />
    </>
  );
}
