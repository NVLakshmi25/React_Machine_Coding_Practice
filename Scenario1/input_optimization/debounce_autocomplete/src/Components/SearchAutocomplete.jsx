import React, { useEffect, useState, useRef } from "react";

const SearchAutocomplete = ({ searchApi }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
const debounceRef = useRef(null);
const abortRef = useRef(null);
const cacheRef = useRef(new Map());
const requestIdRef = useRef(0);

useEffect(() => {
  const MIN_CHARS = 2;

  if (query.trim().length < MIN_CHARS) {
    setResults([]);
    setLoading(false);
    return;
  }

  // clear debounce timer
  clearTimeout(debounceRef.current);

  debounceRef.current = setTimeout(async () => {
    // serve from cache first
    if (cacheRef.current.has(query)) {
      setResults(cacheRef.current.get(query));
      return;
    }

    // abort previous fetch
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    const currentRequestId = ++requestIdRef.current;

    setLoading(true);

    try {
      const res = await searchApi(query, controller.signal);

      // ignore stale response
      if (currentRequestId !== requestIdRef.current) return;

      cacheRef.current.set(query, res);
      setResults(res);
    } catch (err) {
      if (
        err.name !== "AbortError" &&
        currentRequestId === requestIdRef.current
      ) {
        setResults([]);
      }
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, 400);

  return () => {
    clearTimeout(debounceRef.current);
  };
}, [query, searchApi]);


  return (
    <div className="autocomplete-container">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="autocomplete-input"
      />

      {loading && (
        <div className="autocomplete-loading">Searching...</div>
      )}

      <ul className="autocomplete-list">
        {results.map((r) => (
          <li key={r.id} className="autocomplete-item">
            {r.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAutocomplete;
