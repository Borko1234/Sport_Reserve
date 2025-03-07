import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Clock4, MapPin, ArrowLeft, Share2, Building2, Tag, User } from "lucide-react";

function FacilityInfo() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacility = async () => {
      const db = getFirestore();
      const facilityRef = doc(db, "facilities", id);

      try {
        const docSnap = await getDoc(facilityRef);
        if (docSnap.exists()) {
          const facilityData = docSnap.data();
          setFacility(facilityData);

          if (facilityData.organizerId) {
            fetchOrganizer(facilityData.organizerId);
          }
        } else {
          console.error("Facility not found");
        }
      } catch (error) {
        console.error("Error fetching facility:", error);
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

    fetchFacility();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Зареждане...</p>;
  }

  if (!facility) {
    return <p className="text-center text-red-500">Обектът не е намерен</p>;
  }

  return (
    <div className="px-20 py-10">
      <Link
        to="/venues"
        className="flex gap-2 text-lg items-center hover:text-orange-600 transition-colors duration-200"
      >
        <ArrowLeft />
        Назад към всички обекти
      </Link>

      <div className="py-5 flex flex-col lg:flex-row gap-10">
        <img
          src={facility.imageUrl}
          className="rounded-xl w-[850px] h-[450px] object-cover"
          alt={facility.name}
        />
        <div className="border border-gray-300 w-[410px] p-3 rounded-xl text-lg space-y-2">
          <button className="bg-[#FF6600] p-1.5 rounded-md px-5 w-full inline-block border text-xl border-[#FF6600] text-white hover:bg-white hover:text-[#FF6600] hover:border-[#FF6600] transition-colors duration-300 hover:cursor-pointer">
            Запази час
          </button>
          <button className="flex items-center justify-center p-1.5 gap-3 rounded-md px-5 w-full border text-xl border-gray-300 text-black hover:bg-gray-200 transition-colors duration-300 hover:cursor-pointer">
            <Share2 size={18} />
            Сподели
          </button>
          <hr className="border-t border-gray-300 my-6" />
          <h1 className="font-medium">Детайли за обекта</h1>

          {/* City */}
          <p className="text-gray-900 flex items-center gap-2">
            <Building2 size={20} color="#6a7282" />
            {facility.city}
          </p>

          {/* Address */}
          <p className="text-gray-900 flex items-center gap-2">
            <MapPin size={20} color="#6a7282" />
            {facility.address}
          </p>

          {/* Working Hours */}
          <p className="text-gray-900 flex items-center gap-2">
            <Clock4 size={20} color="#6a7282" />
            {facility.workingHours || "Няма работно време"}
          </p>

          {/* Price */}
          <p className="text-gray-900 flex items-center gap-2">
            <Tag size={20} color="#6a7282" />
            {facility.price || "Не е посочена цена"}
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
        <h1 className="text-3xl font-medium">{facility.name}</h1>
        <h2 className="bg-orange-600 rounded-2xl px-3 text-white inline-block">
          Обект
        </h2>
        <p className="text-xl text-gray-500 pb-10">
          {facility.description
            ? facility.description.split("\n").map((line, index) => (
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

export default FacilityInfo;
