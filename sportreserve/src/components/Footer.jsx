import { Instagram, Facebook, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12">
      <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row items-start gap-10">
        <div className="pb-4">
          <Link to="/" className="flex pb-3">
            <h1
              style={{ fontFamily: "'Big Shoulders', sans-serif" }}
              className="text-white font-black text-5xl italic"
            >
              Sport
            </h1>
            <h1
              style={{ fontFamily: "'Big Shoulders', sans-serif" }}
              className="text-orange-400 font-black text-5xl italic"
            >
              Reserve
            </h1>
          </Link>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400 transition">
              <Instagram size={25} />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <Facebook size={25} />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaTiktok size={25} />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <Youtube size={32} />
            </a>
          </div>
          <h1 className="font-medium text-2xl pt-5">Контакти</h1>
          <p className="hover:cursor-pointer text-gray-400 text-sm">
            contact@sportreserve.bg
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl">Връзки</h1>
          <Link
            className="hover:text-white text-gray-400 transition-colors duration-200"
            to="/"
          >
            Начало
          </Link>
          <Link
            className="hover:text-white text-gray-400 transition-colors duration-200"
            to="/events"
          >
            Събития
          </Link>
          <Link
            className="hover:text-white text-gray-400 transition-colors duration-200"
            to="/facilities"
          >
            Обекти
          </Link>
          <Link
            target="_blank"
            className="hover:text-white text-gray-400 transition-colors duration-200"
            to="https://sport.burgas.bg/bg/ "
          >
            Карта
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl">Ресурси</h1>
          <Link className="hover:text-white text-gray-400 transition-colors duration-200">За нас</Link>
          <Link className="hover:text-white text-gray-400 transition-colors duration-200">
            Политика за поверителност
          </Link>
          <Link className="hover:text-white text-gray-400 transition-colors duration-200">
            Общи условия
          </Link>
          <Link to="/register" className="hover:text-white text-gray-400 transition-colors duration-200">
            Регистрирай се
          </Link>
        </div>
        <div className="flex items-center space-x-5 pb-5 px-0 md:px-7">
          <input
            type="email"
            placeholder="Твоят имейл"
            className="bg-transparent border-b w-[200px] md:w-[300px] border-gray-400 outline-none text-white placeholder-gray-500 px-2 py-1"
          />
          <button className="border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition-colors duration-200 hover:cursor-pointer">
            Абонирай се
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-600 w-full max-w-screen-xl mx-auto" />
      <div className="pt-6 px-24 flex pb-7 text-gray-400 justify-between">
        <h1>© 2025 SportReserve. Всички права запазени.</h1>
      </div>
    </footer>
  );
}
