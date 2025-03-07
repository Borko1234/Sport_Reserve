import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase/Firebase";
import { MapPin, Building2, FileText, Clock4, Tag } from "lucide-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function RegisterFacility() {
  const [facility, setFacility] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    imageUrl: "",
    workingHours: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFacility({ ...facility, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !facility.name ||
      !facility.address ||
      !facility.city ||
      !facility.description ||
      !imageFile ||
      !facility.workingHours
    ) {
      setError("Моля, попълнете всички полета.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const db = getFirestore();
      const storage = getStorage();

      const imageRef = ref(storage, `facility_images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "facilities"), {
        ...facility,
        imageUrl,
        createdBy: auth.currentUser ? auth.currentUser.uid : "анонимен",
        createdAt: new Date().toISOString(),
      });

      alert("Обектът е успешно регистриран!");
      setFacility({
        name: "",
        address: "",
        city: "",
        description: "",
        imageUrl: "",
        workingHours: "",
        price: "",
      });
      setImageFile(null);

      navigate("/");

    } catch (err) {
      console.error("🔥 Грешка при регистрацията:", err.message); // Показва грешката в конзолата
      setError(`Грешка: ${err.message}`); // Показва точната грешка на екрана
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Регистрация на обект
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center pb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={facility.name}
            onChange={handleChange}
            placeholder="Име на обекта"
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
          <div className="relative">
            <Building2
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              name="city"
              value={facility.city}
              onChange={handleChange}
              placeholder="Град"
              className="w-full px-10 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              name="address"
              value={facility.address}
              onChange={handleChange}
              placeholder="Адрес"
              className="w-full px-10 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="relative">
            <FileText
              className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <textarea
              name="description"
              value={facility.description}
              onChange={handleChange}
              placeholder="Описание на обекта"
              className="w-full px-10 py-2 border rounded-md focus:outline-none"
            ></textarea>
          </div>

          <div className="relative">
            <Clock4
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              name="workingHours"
              value={facility.workingHours}
              onChange={handleChange}
              placeholder="Работно време"
              className="w-full px-10 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="relative">
            <Tag
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              name="price"
              value={facility.price}
              onChange={handleChange}
              placeholder="Цена на посещение"
              className="w-full px-10 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none text-gray-500"
          />

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 hover:cursor-pointer"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Запазване..." : "Регистрирай обект"}
          </button>
        </form>
      </div>
    </div>
  );
}
