// components/LawyerSignupForm.jsx
'use client';

import { useState } from 'react';

export default function LawyerSignupForm() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', specialization: '',
    experience: '', location: '', availability: '', bio: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/lawyer/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Lawyer Registration</h2>

      {['name', 'email', 'password', 'specialization', 'experience', 'location', 'availability'].map(field => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'text'}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      ))}

      <textarea
        name="bio"
        placeholder="Short Bio"
        value={form.bio}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      ></textarea>

      <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-neutral-800">
        Register
      </button>
    </form>
  );
}
