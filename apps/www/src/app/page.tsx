import HomeSection from "./components/home-page-section/homeSection";
import { SearchSection } from "./components/search-section";

export default function Home() {
  return (
    <main className="z-0 min-h-screen overflow-x-hidden">
      <SearchSection />
      <div className="flex flex-col">
        <HomeSection type="1" />
        <HomeSection type="2" />
        <HomeSection type="3" />
        <HomeSection type="4" />
      </div>
    </main>
  );
}
