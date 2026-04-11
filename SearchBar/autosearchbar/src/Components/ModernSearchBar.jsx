import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react"; // icon

const ModernSearchBar = () => {

  // 🔹 State variables
  const [input, setInput] = useState(""); 
  // 👉 user type chese text store avutundi

  const [results, setResults] = useState([]);
  // 👉 API nundi vachina search results store chestundi

  const [showResults, setShowResults] = useState(false);
  // 👉 results box show cheyala? hide cheyala?

  const [cache, setCache] = useState({});
  // 👉 already search chesina data store (API calls reduce cheyadaniki)

  // 🔹 Ref for detecting outside click
  const wrapperRef = useRef(null);

  // 🔹 API call function
  const fetchData = async () => {

    // 👉 input empty unte results clear chey
    if (!input.trim()) {
      setResults([]);
      return;
    }

    // 👉 cache lo data unte API call cheyakunda direct use chey
    if (cache[input]) {
      setResults(cache[input]);
      return;
    }

    // 👉 API call
    const res = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );

    const json = await res.json();

    // 👉 results store chey
    setResults(json?.recipes || []);

    // 👉 cache lo store chey future use kosam
    setCache((prev) => ({
      ...prev,
      [input]: json?.recipes || [],
    }));
  };

  // 🔹 Debounce logic (important 🔥)
  useEffect(() => {

    // 👉 user typing stop ayyaka 300ms taruvata API call
    const timer = setTimeout(fetchData, 300);

    // 👉 cleanup: next typing vachinappudu previous timer cancel
    return () => clearTimeout(timer);

  }, [input]);

  // 🔹 Click outside detection
  useEffect(() => {

    function handleClickOutside(e) {

      // 👉 if click outside search box
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        // 👉 currently disable chesaru (optional)
        // setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // 👉 cleanup
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  return (
    <div className="flex justify-center mt-20">

      {/* wrapper for search */}
      <div ref={wrapperRef} className="relative w-[500px]">

        {/* 🔹 INPUT BOX */}
        <div className="flex items-center border rounded-full px-4 py-2 shadow-md bg-white focus-within:ring-2 ring-blue-400">

          {/* search icon */}
          <Search size={20} className="text-gray-400" />

          {/* input field */}
          <input
            type="text"
            className="ml-3 w-full outline-none"
            placeholder="Search recipes..."
            value={input}
            onChange={(e) => setInput(e.target.value)} // 👉 typing
            onFocus={() => setShowResults(true)} // 👉 show results
          />
        </div>

        {/* 🔹 RESULTS DROPDOWN */}
        {showResults && results.length > 0 && (

          <div className="absolute top-14 w-full bg-white shadow-lg rounded-xl border overflow-hidden z-10">

            {results.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <Search size={16} className="text-gray-400" />

                {/* recipe name */}
                <span>{r.name}</span>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default ModernSearchBar;
