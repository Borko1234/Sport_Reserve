import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase";

function Header() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        console.log("User logged in:", user.uid);

        if (!role) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
            console.log("Fetched role:", userDoc.data().role);
          } else {
            console.log("User document not found in Firestore");
            setRole("user");
          }
        }
      } else {
        setUser(null);
        setRole("");
      }
    });

    return () => unsubscribe();
  }, [role]);

  useEffect(() => {
    console.log("Updated role in Header:", role);
  }, [role]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => console.log("User logged out"))
      .catch((error) => console.error("Logout error:", error));

    if (isOpen) setIsOpen(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-[#53565A] text-white z-20 shadow-md">
      <div className="max-w-8xl mx-auto flex justify-between items-center h-14 px-4 md:px-7">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-600 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <Menu size={24} />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-7 px-2 text-lg md:text-xl">
            <li>
              <Link
                to="/events"
                className="hover:text-orange-500 transition-colors"
              >
                Събития
              </Link>
            </li>
            <li>
              <Link
                to="/venues"
                className="hover:text-orange-500 transition-colors"
              >
                Обекти
              </Link>
            </li>
            <li>
              <a
                href="https://sport.burgas.bg/bg/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
              >
                Карта
              </a>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-orange-500 transition-colors"
              >
                Профил
              </Link>
            </li>
            <li>
              <button
                className="hover:text-orange-500 transition-colors flex items-center"
                aria-label="Search"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
            </li>
          </ul>
        </nav>

        {/* Logo */}
        <Link
          to="/"
          className="flex absolute left-1/2 transform -translate-x-1/2 md:transform-none"
        >
          <h1 className="text-white font-black text-3xl md:text-4xl italic">
            Sport
          </h1>
          <h1 className="text-orange-400 font-black text-3xl md:text-4xl italic">
            Reserve
          </h1>
        </Link>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center space-x-4 text-base">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="border border-white px-3 py-1.5 rounded hover:bg-white hover:text-black transition-colors text-sm font-medium"
              >
                Изход
              </button>
              {/* Show Admin Panel Button if Role is Admin */}
              {role === "admin" && (
                <button
                  onClick={() => {
                    console.log("Navigating to Admin Panel");
                    navigate("/admin-dashboard");
                  }}
                  className="bg-orange-500 px-3 py-1.5 rounded hover:bg-white hover:text-black transition-colors duration-200 text-sm font-medium"
                >
                  Admin Panel
                </button>
              )}
              <span className="text-lg">
                Здравейте, {user.displayName || "потребител"}
              </span>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="border border-white px-3 py-1.5 rounded hover:bg-white hover:text-black transition-colors text-sm font-medium">
                  Вход
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#FF6600] px-3 py-1.5 rounded hover:bg-orange-800 transition-colors text-sm font-medium">
                  Регистрация
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
