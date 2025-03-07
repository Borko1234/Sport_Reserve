import { useState } from "react";
import { db, auth } from "../firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Info, Calendar, Clock4, MapPin } from "lucide-react";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storage = getStorage();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !date || !location || !startTime || !endTime || !image) {
      alert("Моля, попълнете всички полета и качете изображение.");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Трябва да сте влезли в профила си, за да създадете събитие.");
        return;
      }

      console.log("📤 Uploading Image...");

      const storageRef = ref(storage, `event-images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("❌ Грешка при качването на изображението:", error);
          alert("Неуспешно качване на изображението.");
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("✅ Image Uploaded Successfully! URL:", downloadURL);

          console.log("📦 Saving Event to Firestore...");

          await addDoc(collection(db, "events"), {
            title,
            description,
            date: new Date(date),
            location,
            startTime,
            endTime,
            imageUrl: downloadURL,
            createdBy: user.uid,
            createdAt: new Date().toISOString(),
          });

          console.log("✅ Event Successfully Saved in Firestore!");
          alert("Събитието е успешно създадено!");
          navigate("/");
        }
      );
    } catch (error) {
      console.error("❌ Грешка при създаване на събитие:", error);
      alert("Грешка при създаването на събитие. Опитайте отново.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md sm:max-w-2xl mx-auto p-6 sm:p-8 bg-white shadow-md rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6">Детайли за събитието</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1">Име на събитието</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Въведете име на събитието"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 pl-10"
            />
            <span className="absolute left-3 top-3 text-gray-500 ">
              <Info size={20} />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Дата</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-400 rounded-md p-2 pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <Calendar size={20} />
              </span>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Място</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Въведете мястото на събитието"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-400 rounded-md p-2 pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <MapPin size={20} />
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Описание</label>
          <textarea
            placeholder="Въведете описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-400 rounded-md p-2 h-24"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Започва в</label>
            <div className="relative">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-400 rounded-md p-2 pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <Clock4 size={20} />
              </span>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Завършва в</label>
            <div className="relative">
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-gray-400 rounded-md p-2 pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <Clock4 size={20} />
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Качи изображение</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border border-gray-400 rounded-md p-2" />
          {image && <p className="text-sm text-gray-600 mt-2">Избрано изображение: {image.name}</p>}
        </div>

        <div className="flex justify-between">
          <button type="button" className="border font-medium p-2 px-4 rounded-md hover:bg-black hover:text-white transition-colors">
            Отказ
          </button>
          <button type="submit" className="bg-orange-500 text-white font-medium p-2 px-4 rounded-md hover:bg-orange-700 transition-colors" disabled={loading}>
            {loading ? "Качване..." : "Създай събитие"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
