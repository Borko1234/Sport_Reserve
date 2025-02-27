import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold">Създай профил</h2>
        <p className="text-gray-600 mb-4">Въведи своята информация</p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="Име"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 w-1/2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 w-1/2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Телефонен номер</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="+359"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Имейл</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Парола</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-[#FF6600]">
            Създай профил
          </button>
        </form>
      </div>
    </div>
  );
}
