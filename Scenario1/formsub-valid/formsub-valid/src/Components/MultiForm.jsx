import React from "react";
import { useCallback, useState } from "react";

export default function MultiForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback((values) => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(values.email))
      e.email = "Invalid email";
    if (values.age && Number(values.age) <= 0)
      e.age = "Age must be positive";
    return e;
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setErrors({ form: err.message || "Submit failed" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.name && (
          <div className="text-red-600 text-sm">{errors.name}</div>
        )}
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <div className="text-red-600 text-sm">{errors.email}</div>
        )}
      </div>

      <div>
        <label className="block text-sm">Age (optional)</label>
        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.age && (
          <div className="text-red-600 text-sm">{errors.age}</div>
        )}
      </div>

      {errors.form && (
        <div className="text-red-600">{errors.form}</div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
