import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import EventsPage from "./pages/EventsPage";
import EventInfo from "./pages/EventInfo";
import Venues from "./pages/Venues";
import CreateEvent from "./pages/CreateEvent";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterFacility from "./pages/RegisterFacility";
import FacilityInfo from "./pages/FacilityInfo";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("loading");

  useEffect(() => {
    const fetchUserRole = async (uid) => {
      try {
        console.log("🟡 Fetching role from Firestore...");
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          setRole(userRole);
          console.log("✅ User role fetched:", userRole);
          window.localStorage.setItem("role", userRole);
        } else {
          console.log("🔴 No role found in Firestore.");
          setRole("user");
        }
      } catch (error) {
        console.error("🔴 Error fetching user role:", error);
        setRole("user");
      }
    };

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        console.log("🔹 User logged in:", user.uid);
        fetchUserRole(user.uid);
      } else {
        setUser(null);
        setRole("loading");
        window.localStorage.removeItem("role");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header user={user} role={role} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home role={role} />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventInfo />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registerFacility" element={<RegisterFacility />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute user={user} role={role} requiredRole="admin">
              <AdminDashboard role={role} />
            </ProtectedRoute>
          }
        />
        <Route path="/facilities/:id" element={<FacilityInfo />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
