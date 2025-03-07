import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { Clock4, MapPin, Building2, Tag } from "lucide-react";
import { Link } from "react-router-dom";

function Venues() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const facilitiesCollection = collection(db, "facilities");

    const unsubscribe = onSnapshot(facilitiesCollection, (snapshot) => {
      const facilitiesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFacilities(facilitiesList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-10">
      {/* Title Section */}
      <div className="space-y-1">
        <h1 className="text-4xl md:text-5xl font-semibold">Всички обекти</h1>
        <h2 className="text-lg md:text-xl text-neutral-500">
          Открий и резервирай спортни зали и игрища близо до теб
        </h2>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto py-10 gap-x-8 gap-y-21">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div key={facility.id} className="bg-white shadow-lg rounded-lg">
              <img
                src={facility.imageUrl}
                alt={facility.name}
                className="rounded-md w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold">{facility.name}</h3>
                <div className="py-2 space-y-1">
                  {/* City */}
                  <p className="text-gray-900 flex items-center gap-2">
                    <Building2 size={17} color="#6a7282" />
                    {facility.city}
                  </p>

                  {/* Address */}
                  <p className="text-gray-900 flex items-center gap-2">
                    <MapPin size={17} color="#6a7282" />
                    {facility.address}
                  </p>

                  {/* Working Hours */}
                  <p className="text-gray-900 flex items-center gap-2">
                    <Clock4 size={17} color="#6a7282" />
                    {facility.workingHours || "Няма работно време"}
                  </p>

                  {/* Price */}
                  <p className="text-gray-900 flex items-center gap-2">
                    <Tag size={17} color="#6a7282" />
                    {facility.price || "Не е посочена цена"}
                  </p>
                </div>

                {/* Button */}
                <div>
                  <Link
                    to={`/facilities/${facility.id}`}
                    className="bg-[#FF6600] rounded-xl px-5 mt-4 inline-block border text-lg border-[#FF6600] text-white hover:bg-white hover:text-[#FF6600] hover:border-[#FF6600] transition-colors duration-300"
                  >
                    Виж повече
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Няма налични обекти
          </p>
        )}
      </div>
    </div>
  );
}

export default Venues;
