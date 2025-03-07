import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Clock4, MapPin, Calendar, ArrowLeft, Share2, User } from "lucide-react";

function EventInfo() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      const db = getFirestore();
      const eventRef = doc(db, "events", id);

      try {
        const docSnap = await getDoc(eventRef);
        if (docSnap.exists()) {
          const eventData = docSnap.data();
          setEvent(eventData);

          if (eventData.organizerId) {
            fetchOrganizer(eventData.organizerId);
          }
        } else {
          console.error("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrganizer = async (organizerId) => {
      const db = getFirestore();
      const userRef = doc(db, "users", organizerId);

      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setOrganizer(userSnap.data());
        } else {
          console.error("Organizer not found");
        }
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Зареждане...</p>;
  }

  if (!event) {
    return <p className="text-center text-red-500">Събитието не е намерено</p>;
  }

  return (
    <div className="px-20 py-10">
      <Link
        to="/events"
        className="flex gap-2 text-lg items-center hover:text-orange-600 transition-colors duration-200"
      >
        <ArrowLeft />
        Назад към всички събития
      </Link>

      <div className="py-5 flex flex-col lg:flex-row gap-10">
        <img
          src={event.imageUrl}
          className="rounded-xl w-[850px] h-[450px] object-cover"
          alt={event.title}
        />
        <div className="border border-gray-300 w-[410px] p-3 rounded-xl text-lg space-y-2">
          <button className="bg-[#FF6600] p-1.5 rounded-md px-5 w-full inline-block border text-xl border-[#FF6600] text-white hover:bg-white hover:text-[#FF6600] hover:border-[#FF6600] transition-colors duration-300 hover:cursor-pointer">
            Запиши се
          </button>
          <button className="flex items-center justify-center p-1.5 gap-3 rounded-md px-5 w-full border text-xl border-gray-300 text-black hover:bg-gray-200 transition-colors duration-300 hover:cursor-pointer">
            <Share2 size={18} />
            Сподели
          </button>
          <hr className="border-t border-gray-300 my-6" />
          <h1 className="font-medium">Детайли за събитието</h1>
          <p className="text-gray-900 flex items-center gap-2">
            <Calendar size={20} color="#6a7282" />
            {new Date(event.date.seconds * 1000).toLocaleDateString("bg-BG")}
          </p>
          <p className="text-gray-900 flex items-center gap-2">
            <Clock4 size={20} color="#6a7282" />
            {event.time || "Няма час"}
          </p>
          <p className="text-gray-900 flex items-center gap-2">
            <MapPin size={20} color="#6a7282" />
            {event.location}
          </p>
          <hr className="border-t border-gray-300 my-6" />
          <h1 className="font-medium">Организатор</h1>
          <p className="flex items-center gap-2">
            <User size={30} className="bg-gray-300 rounded-full p-1" />
            {organizer ? organizer.fullName : "Неизвестен организатор"}
          </p>
          <button className="text-orange-500 text-base hover:text-orange-700 hover:cursor-pointer">
            Контакти с организатора
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-medium">{event.title}</h1>
        <h2 className="bg-orange-600 rounded-2xl px-3 text-white inline-block">
          Събитие
        </h2>
        <p className="text-xl pb-10 text-gray-500">
          {event.description
            ? event.description.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))
            : "Няма описание"}
        </p>
      </div>
    </div>
  );
}

export default EventInfo;
