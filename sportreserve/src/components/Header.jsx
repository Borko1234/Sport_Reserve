import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Събития", path: "/events" },
    { name: "Обекти", path: "/venues" },
    { name: "Карта", path: "https://sport.burgas.bg/bg/" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full bg-[#53565A] text-white z-20">
      <div className="flex justify-between items-center h-14 px-4 md:px-7">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden transition-transform duration-300 ease-in-out"
          aria-label="Toggle menu"
        >
          <Menu size={30} className="hover:text-gray-300" />
        </button>
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6 px-10 text-lg md:text-xl">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.path.startsWith("http") ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <h1 className="font-montserrat font-medium text-2xl">
          <Link to="/">SPORTRESERVE</Link>
        </h1>
        <div className="hidden md:flex items-center space-x-6 text-base px-10">
          <button className="hover:opacity-65 transition-opacity hover:cursor-pointer">
            <Search size={26} strokeWidth={1.5} />
          </button>
          <Link to="/login">
            <button className="border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition-colors hover:cursor-pointer">
              Вход
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#FF6600] px-2 py-1 rounded hover:bg-orange-800 transition-colors hover:cursor-pointer">
              Регистрация
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-[85%] h-screen bg-[#53565A] 
            text-white z-50 transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
      >
        <div className="flex items-center p-4 space-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300 transition-colors"
            aria-label="Close menu"
          >
            <X size={30} />
          </button>
          <h1 className="text-2xl">
            <Link to="/">SportReserve</Link>
          </h1>
        </div>
        <nav className="flex flex-col gap-8 p-6">
          <ul className="space-y-4 text-2xl">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.path.startsWith("http") ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button className="flex items-center space-x-2 hover:opacity-65 transition-opacity">
            <Search size={26} strokeWidth={1.5} />
            <span>Търсене</span>
          </button>
        </nav>
        <div className="absolute bottom-8 left-0 right-0 flex flex-col px-6 space-y-4">
          <Link to="/login">
            <button className="border border-white w-[340px] px-2 py-1 rounded hover:bg-white hover:text-black transition-colors">
              Вход
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#FF6600] w-[340px] px-2 py-1 rounded hover:bg-orange-800 transition-colors">
              Регистрация
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
