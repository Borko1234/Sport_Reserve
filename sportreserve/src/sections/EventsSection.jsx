import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = window.innerWidth < 768 ? 1 : 3;

  const events = [
    {
      id: 1,
      title: "Групови курсове по йога",
      description: "Йога",
      location: "Пулс фитнес",
      date: "28.02.2025",
      image: "/Yoga.jpg",
    },
    {
      id: 2,
      title: "Състезание по плуване",
      description: "Плуване",
      location: "Парк Арена",
      date: "04.03.2025",
      image: "/Swimming.jpg",
    },
    {
      id: 3,
      title: "Баскетболен мач",
      description: "баскетбол",
      location: "Бойчо Брънзов",
      date: "12.03.2025",
      image: "/Basketball.jpg",
    },
    {
      id: 4,
      title: "Футболен турнир",
      description: "Футбол",
      location: "Стадион Лазур",
      date: "22.03.2025",
      image: "/Football.jpg",
    },
    {
      id: 5,
      title: "Футболен турнир",
      description: "Футбол",
      location: "Стадион Лазур",
      date: "22.03.2025",
      image: "/Football.jpg",
    },
    {
      id: 6,
      title: "Баскетболен мач",
      description: "баскетбол",
      location: "Бойчо Брънзов",
      date: "12.03.2025",
      image: "/Basketball.jpg",
    },
    {
      id: 7,
      title: "Футболен турнир",
      description: "Футбол",
      location: "Стадион Лазур",
      date: "22.03.2025",
      image: "/Football.jpg",
    },
    {
      id: 8,
      title: "Футболен турнир",
      description: "Футбол",
      location: "Стадион Лазур",
      date: "22.03.2025",
      image: "/Football.jpg",
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
    <div className="py-5">
      <h1 className="text-4xl font-semibold text-white text-center pt-9 bg-[#53565A]">
        Предстоящи събития
      </h1>

      <div className="flex justify-between items-center bg-[#53565A] py-10 px-6">
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
            {events.map((event, index) => (
              <div
                key={event.id}
                className="px-3 flex-shrink-0 w-full md:w-1/3"
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={event.image}
                    className="w-full h-48 object-cover"
                    alt={event.title}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {event.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-1 text-black" />{" "}
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar size={16} className="mr-1 text-black" />{" "}
                      {event.date}
                    </div>
                    <Link
                      to="/"
                      className="bg-[#FF6600] rounded-xl px-3 mt-3 inline-block border border-[#FF6600] text-white font-bold hover:bg-white hover:text-[#FF6600] hover:border-[#FF6600] transition-colors duration-300"
                    >
                      Виж повече
                    </Link>
                  </div>
                </div>
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

export default EventsSection;
