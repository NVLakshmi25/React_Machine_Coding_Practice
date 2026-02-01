import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isAuth", "true"); // 👈 persist
    setIsAuth(true);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
