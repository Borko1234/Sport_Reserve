import heroImage from "../assets/Hero.jpg";
import { CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection({role}) {
  return (
    <section
      className="relative w-full h-[400px] md:h-[570px] flex items-center justify-start text-white text-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-screen-xl px-6 md:px-12 space-y-5 text-left">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Добре дошли в SportReserve
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl">
          Твоето място за спорт – резервирай, създавай, играй!
        </p>
        <div className="max-w-4xl text-left mx-auto text-lg md:text-2xl pb-2">
          <div className="flex items-center gap-x-3 sm:gap-x-4">
            <CheckCheck size={24} className="shrink-0" />
            <span className="text-base sm:text-lg md:text-xl">
              Лесно организирайте и откривайте събития
            </span>
          </div>
          <div className="flex items-center gap-x-3 sm:gap-x-4 mt-2">
            <CheckCheck size={24} className="shrink-0" />
            <span className="text-base sm:text-lg md:text-xl">
              Резервирайте зали, игрища и места
            </span>
          </div>
          <div className="flex items-center gap-x-3 sm:gap-x-4 mt-2">
            <CheckCheck size={24} className="shrink-0" />
            <span className="text-base sm:text-lg md:text-xl">
              Включвайте се в активности с други спортисти
            </span>
          </div>
        </div>
        {(role === "organizer" || role === "admin") && (
          <div className="space-x-8">
          <Link
            to="create"
            className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-lg sm:text-2xl font-normal hover:cursor-pointer hover:bg-orange-700 transition"
          >
            Създай събитие
          </Link>
          <Link
            to="/registerFacility"
            className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-lg sm:text-2xl font-normal hover:cursor-pointer hover:bg-orange-700 transition"
          >
            Регистрирай обект
          </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
