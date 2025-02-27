import { CheckCheck } from "lucide-react";
import HeroSection from "../sections/HeroSection";
import EventsSection from "../sections/EventsSection";
import SportsSection from "../sections/SportsSection";
import NewsSection from "../sections/NewsSection";

function Home() {
  return (
    <div className="flex flex-col gap-y-20">
      <HeroSection />
      <h1 className="max-w-4xl text-center mx-auto text-3xl font-light">
        <div className="flex items-center gap-x-4">
          <CheckCheck size={35} />
          Лесно организирайте и откривайте събития
        </div>
        <div className="flex items-center gap-x-4">
          <CheckCheck size={35} />
          Резервирайте зали, игрища и места
        </div>
        <div className="flex items-center gap-x-4">
          <CheckCheck size={35} />
          Включвайте се в активности с други спортисти
        </div>
      </h1>
      <EventsSection />
      <SportsSection />
      <div className="relative w-full">
        <h3 className="text-center text-4xl font-semibold pb-6">
          Карта на обектите
        </h3>
        <img src="/Map.png" alt="Map Image" className="w-full h-auto" />
        <a
          href="https://sport.burgas.bg/bg/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FF6600] text-white font-bold px-4 py-2 rounded-full hover:bg-orange-700 transition text-xl"
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
