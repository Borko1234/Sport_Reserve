import HeroSection from "../sections/HeroSection";
import EventsSection from "../sections/EventsSection";
import SportsSection from "../sections/SportsSection";
import NewsSection from "../sections/NewsSection";
import FacilitiesSection from "../sections/FacilitiesSection";

function Home({role}) {
  return (
    <div className="flex flex-col">
      <HeroSection role={role}/>
      <EventsSection/>
      <FacilitiesSection/>
      <SportsSection />
      <div className="relative w-full pb-20">
        <h3 className="text-center text-3xl md:text-4xl font-semibold pb-6">
          Карта на обектите
        </h3>
        <img src="/Map.png" alt="Map Image" className="w-full h-auto" />
        <a
          href="https://sport.burgas.bg/bg/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FF6600] text-white font-normal md:font-bold px-4 py-1 md:py-2 rounded-full hover:bg-orange-700 transition md:text-xl"
        >
          Виж карта
        </a>
      </div>
      <div className="pt-10">
        <NewsSection />
      </div>
    </div>
  );
}

export default Home;
