import React from "react";
import { useEffect, useRef, useState } from "react";

const ParallelFetches = ({ urls = [] }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // prevents double fetch in dev StrictMode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!urls.length) return;

    // reset guard when urls change
    hasFetched.current = false;

    const controller = new AbortController();
    const { signal } = controller;

    const fetchAll = async () => {
      // prevent duplicate in dev
      if (hasFetched.current) return;
      hasFetched.current = true;

      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          urls.map(async (url) => {
            console.log("Start:", url);

            const res = await fetch(url, { signal });

            if (!res.ok) {
              throw new Error(`Failed ${res.url} ${res.status}`);
            }

            return await res.json();
          })
        );

        setData(results);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();

    return () => {
      controller.abort(); // cancel fetches on unmount / re-render
    };
  }, [urls]);

  // ---------- UI ----------

 if (loading) return <div className="api-loading">Loading...</div>;

if (error) return <div className="api-error">Error: {error}</div>;

if (!data) return <div>No data</div>;

return (
  <pre className="api-box">
    {JSON.stringify(data, null, 2)}
  </pre>
);

};

export default ParallelFetches;
