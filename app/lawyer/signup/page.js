'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";


export default function LawyerSignupForm() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', specialization: '',
    experience: '', state: '', availability: '', bio: '', barId: ''
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const validate = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name || form.name.trim().length < 2) newErrors.name = 'Enter a valid name';
    if (!form.email || !emailRegex.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.password || form.password.length < 6) newErrors.password = 'Min 6 characters required';
    if(!form.barId||form.barId.length<11)newErrors.barId = "Invalid BarId";
    if (!form.specialization || form.specialization.trim().length < 3) newErrors.specialization = 'Enter specialization';
    if (!form.experience || isNaN(form.experience) || Number(form.experience) < 0) newErrors.experience = 'Valid number required';
    if (!form.location || form.location.trim().length < 2) newErrors.location = 'Enter a valid location';
    if (!form.availability || form.availability.trim().length < 2) newErrors.availability = 'Enter availability';
    if (!form.bio || form.bio.trim().length < 10) newErrors.bio = 'Bio must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return;

    const res = await fetch('/api/lawyer/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      toast.dismiss('Error: ' + (data.message || 'Something went wrong'));
    } else {
      toast.success(data.message)
      router.push("/login")
    }
  };




  const inputStyle = "w-full px-4 py-2 border rounded-md";
  const errorStyle = "text-sm text-red-500 -mt-2 mb-2 pt-2";

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4 mt-2">
      <h2 className="text-2xl font-bold text-center">Lawyer Registration</h2>

      {['name', 'email', 'password', 'specialization', 'barId', 'experience', 'state', 'availability'].map(field => (
        <div key={field}>
          <input
            type={field === 'password' ? 'password' : field === 'experience' ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors[field] && <p className={errorStyle}>{errors[field]}</p>}
        </div>
      ))}

      <div>
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={form.bio}
          onChange={handleChange}
          className={inputStyle}
        ></textarea>
        {errors.bio && <p className={errorStyle}>{errors.bio}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-neutral-800"
      >
        Register
      </button>
    </form>
  );
}
