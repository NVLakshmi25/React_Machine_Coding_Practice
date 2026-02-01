import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

const ModernSearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const wrapperRef = useRef(null);

  const fetchData = async () => {
    if (!input.trim()) {
      setResults([]);
      return;
    }

    if (cache[input]) {
      setResults(cache[input]);
      return;
    }

    const res = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );

    const json = await res.json();

    setResults(json?.recipes || []);

    setCache((prev) => ({
      ...prev,
      [input]: json?.recipes || [],
    }));
  };

  // 🔹 Debounce API
  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [input]);

  // 🔹 Click outside detection
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        // ❌ don't hide when sidebar clicked
        // If you want to close later:
        // setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="flex justify-center mt-20">
      <div ref={wrapperRef} className="relative w-[500px]">
        {/* INPUT */}
        <div className="flex items-center border rounded-full px-4 py-2 shadow-md bg-white focus-within:ring-2 ring-blue-400">
          <Search size={20} className="text-gray-400" />

          <input
            type="text"
            className="ml-3 w-full outline-none"
            placeholder="Search recipes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowResults(true)}
          />
        </div>

        {/* RESULTS */}
        {showResults && results.length > 0 && (
          <div className="absolute top-14 w-full bg-white shadow-lg rounded-xl border overflow-hidden z-10">
            {results.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <Search
                  size={16}
                  className="text-gray-400"
                />
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
