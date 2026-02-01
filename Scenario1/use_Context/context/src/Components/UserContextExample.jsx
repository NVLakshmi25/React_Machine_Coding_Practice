import React from "react";
import { useState } from "react";

import Profile from "./Profile";
import { UserContext } from "./context/UserContext";

const UserContextExample = () => {
  const [user, setUser] = useState({ name: "John", role: "user" });

  return (
  <UserContext.Provider  value={user}>
    <div className="space-y-3">
        <Profile />

        <button
          onClick={() => setUser((u) => ({ ...u, name: "Jane" }))}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Change Name
        </button>
      </div>
  </UserContext.Provider>
     
  
     
   
  );
};

export default UserContextExample;
