import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { Clock4, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

function EventsPage() {
  const [events, setEvents] = useState([]);

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

  return (
    <div className="p-10">
      <div className="space-y-1">
        <h1 className="text-4xl md:text-5xl font-semibold">Всички събития</h1>
        <h2 className="text-lg md:text-xl text-neutral-500">
          Открий и се присъедини във вълнуващи събития около теб
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto py-10 gap-x-8 gap-y-21">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="rounded-md w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold">{event.title}</h3>
                <p className="text-gray-500 font-medium">{event.description}</p>
                <div className="py-2 space-y-1">
                  <p className="text-gray-900 flex items-center gap-2">
                    <Calendar size={17} color="#6a7282" />
                    {formatDate(event.date)}
                  </p>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Clock4 size={17} color="#6a7282" />
                    {event.startTime || "Няма час"}
                  </p>
                  <p className="text-gray-900 flex items-center gap-2">
                    <MapPin size={17} color="#6a7282" />
                    {event.location}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/events/${event.id}`}
                    className="bg-[#FF6600] rounded-xl px-5 mt-4 inline-block border text-lg border-[#FF6600] text-white hover:bg-white hover:text-[#FF6600] hover:border-[#FF6600] transition-colors duration-300"
                  >
                    Виж повече
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">Няма налични събития</p>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
