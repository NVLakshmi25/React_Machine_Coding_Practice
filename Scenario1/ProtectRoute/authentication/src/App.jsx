import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./Components/ProtectRoute";
import Home from "./Components/Home";
import Login from "./Components/Login";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  // 👇 load auth from localStorage on refresh
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuth");
    if (savedAuth === "true") {
      setIsAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute isAuth={isAuth}>
              <Home setIsAuth={setIsAuth} />
            </ProtectRoute>
          }
        />

        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
