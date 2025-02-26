import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in:" : "Signing up:", formData);
    // Here, you can integrate an API call to register or log in the user.
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-96">
        <div className="flex mb-3 bg-gray-100 p-1 rounded-lg ">
          <button
            className={`flex-1 py-2 text-lg font-medium ${
              isLogin ? "bg-white shadow rounded" : "text-gray-500"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Вход
          </button>
          <button
            className={`flex-1 py-2 text-lg font-medium ${
              !isLogin ? "bg-white shadow rounded" : "text-gray-500"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>
        <h2 className="text-2xl font-bold">
          {isLogin ? "Вход" : "Създай профил"}
        </h2>
        <p className="text-gray-600 mb-4">
          {isLogin
            ? "Въведи своя имейл адрес за да влезеш в профила си"
            : "Въведи своята информация, за да създадеш профил"}
        </p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Име"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-2 w-1/2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Фамилия"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-2 w-1/2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Телефонен номер
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="+359"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium">Имейл</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-[#FF6600]"
          >
            {isLogin ? "Влез" : "Създай профил"}
          </button>
        </form>
        <p className="text-gray-500 text-sm mt-4">
          Натискайки ,,Продължи" Вие се съгласявате с нашите
          <a href="#" className="text-blue-500">
            {" "}
            Общи условия
          </a>{" "}
          и
          <a href="#" className="text-blue-500">
            {" "}
            Политика за поверителност
          </a>
          .
        </p>
      </div>
    </div>
  );
}
