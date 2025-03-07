import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, role, requiredRole, children }) => {
  console.log("ProtectedRoute - User:", user ? user.uid : "No user");
  console.log("ProtectedRoute - Role:", role);
  console.log("Required Role:", requiredRole);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role === "" || role === "loading") {
    return <div>Loading...</div>;
  }

  if (requiredRole && role !== requiredRole) {
    console.log("Access Denied - Redirecting to Home");
    return <Navigate to="/" replace />;
  }

  return children; 
};

export default ProtectedRoute;
