import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function SportsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = window.innerWidth < 768 ? 1 : 3;

  const events = [
    {
      id: 1,
      title: "Групови курсове по йога",
      image: "/Yoga.jpg",
      link: "/yoga",
    },
    {
      id: 2,
      title: "Състезание по плуване",
      image: "/Swimming.jpg",
      link: "/swimming",
    },
    {
      id: 3,
      title: "Баскетболен мач",
      image: "/Basketball.jpg",
      link: "/basketball",
    },
    {
      id: 4,
      title: "Футболен турнир",
      image: "/Football.jpg",
      link: "/football",
    },
    {
      id: 5,
      title: "Футболен турнир",
      image: "/Football.jpg",
      link: "/football",
    },
    {
      id: 6,
      title: "Баскетболен мач",
      image: "/Basketball.jpg",
      link: "/basketball",
    },
    {
      id: 7,
      title: "Футболен турнир",
      image: "/Football.jpg",
      link: "/football",
    },
    {
      id: 8,
      title: "Футболен турнир",
      image: "/Football.jpg",
      link: "/football",
    },
  ];

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold pt-9 bg-[#53565A] text-white">
        Разгледай по спортове
      </h2>
      <div className="flex justify-between items-center bg-[#53565A] py-12 px-6">
        <button onClick={prevSlide} disabled={currentIndex === 0}>
          <ChevronLeft
            size={60}
            className={`transition-colors duration-300 ${
              currentIndex === 0
                ? "text-gray-400"
                : "text-white hover:text-gray-400 hover:cursor-pointer"
            }`}
          />
        </button>

        <div className="overflow-hidden w-full max-w-7xl">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="px-3 flex-shrink-0 w-full md:w-1/3"
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              >
                <Link to={event.link} className="relative block">
                  <img
                    src={event.image}
                    className="w-full h-48 object-cover brightness-60 rounded-xl"
                    alt={event.title}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                    {event.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextSlide} disabled={currentIndex >= totalPages - 1}>
          <ChevronRight
            size={60}
            className={`transition-colors duration-300 ${
              currentIndex >= totalPages - 1
                ? "text-gray-400"
                : "text-white hover:text-gray-400 hover:cursor-pointer"
            }`}
          />
        </button>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-[#FF6600]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default SportsSection;
