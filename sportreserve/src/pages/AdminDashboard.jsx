import React, { useState, useEffect } from "react";
import { db } from "../firebase/Firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔹 AdminDashboard Mounted - Role:", role);

    if (!role || role === "loading") {
      console.log("🟡 Waiting for role...");
      return; 
    }

    if (role !== "admin") {
      console.log("🔴 Redirecting from AdminDashboard to Home");
      navigate("/");
      return;
    }

    console.log("✅ Role Confirmed - Fetching Users");
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [role, navigate]);

  if (loading) {
    return <div>Loading Admin Panel...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Административен панел</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Имейл</th>
            <th className="border border-gray-300 px-4 py-2">Роля</th>
            <th className="border border-gray-300 px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => updateUserRole(user.id, "user")} className="bg-blue-500 text-white px-2 py-1 m-1 rounded">
                  Направи потребител
                </button>
                <button onClick={() => updateUserRole(user.id, "organizer")} className="bg-green-500 text-white px-2 py-1 m-1 rounded">
                  Направи организатор
                </button>
                <button onClick={() => updateUserRole(user.id, "admin")} className="bg-red-500 text-white px-2 py-1 m-1 rounded">
                  Направи админ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
