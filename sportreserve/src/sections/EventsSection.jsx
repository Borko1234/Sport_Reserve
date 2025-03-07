import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock4,
} from "lucide-react";
import { Link } from "react-router-dom";

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = window.innerWidth < 768 ? 1 : 3;

  useEffect(() => {
    const db = getFirestore();
    const eventsCollection = collection(db, "events");

    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const eventsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (date) => {
    if (date && date.seconds) {
      const jsDate = new Date(date.seconds * 1000);
      return jsDate.toLocaleDateString("bg-BG");
    }
    return "Няма дата";
  };

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));

  return (
    <div className="pb-20">
      <h1 className="text-3xl md:text-4xl font-semibold text-white text-center pt-9 bg-[#53565A]">
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
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
                  <img
                    src={event.imageUrl}
                    className="w-full h-48 object-cover"
                    alt={event.title}
                  />
                  <h3 className="text-xl font-semibold px-5 pt-5">
                    {event.title}
                  </h3>

                  <div className="p-4 text-lg">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1 text-black" />{" "}
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Clock4 size={16} className="mr-1 text-black" />{" "}
                      {event.startTime || "Няма час"}
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Calendar size={16} className="mr-1 text-black" />{" "}
                      {formatDate(event.date)}
                    </div>
                    <Link
                      to={`/events/${event.id}`}
                      className="bg-[#FF6600] rounded-xl px-3 mt-3 inline-block border border-[#FF6600] text-white font-semibold hover:bg-white hover:text-[#FF6600] hover:border-[#FF6600] transition-colors duration-300"
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
