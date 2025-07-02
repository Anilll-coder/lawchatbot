'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LawyerSignup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    barId: '',
    expertise: '',
    availability: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch('/api/lawyer/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
        toast.success("Profile created successfully");
      router.push('/'); // or show toast
    } else {
      alert(data.error || 'Failed to submit profile');
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">Create Lawyer Profile</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Bar Registration ID</label>
            <input
              type="text"
              name="barId"
              required
              value={formData.barId}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Area of Expertise</label>
          <input
            type="text"
            name="expertise"
            required
            value={formData.expertise}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Family Law, Criminal Law"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Availability</label>
          <textarea
            name="availability"
            required
            value={formData.availability}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Weekdays 9AM–5PM"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          {loading ? 'Submitting...' : 'Submit Profile'}
        </button>
      </form>
    </main>
  )
}
