import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-lg font-bold text-center mb-5 mt-5"> THIS IS Home Page</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
