import React from "react";
import { useEffect, useState } from "react";

const TestApi = ({ url }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    setItems([]);

    async function fetchItems() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }

        setItems(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
    return () => controller.abort();
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!loading && items.length === 0) return <div>No items</div>;

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id ?? index}>
          <strong>{item.title ?? item.name}</strong>
          <p>{item.body ?? item.description ?? ""}</p>
        </li>
      ))}
    </ul>
  );
};

export default TestApi;
