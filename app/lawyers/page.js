// pages/lawyers/index.jsx
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function LawyerDirectory() {
  const { data, error } = useSWR('/api/lawyer/all', fetcher);

  if (error) return <p>Error loading lawyers.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Available Lawyers</h1>
      {data.lawyers.map(lawyer => (
        <div key={lawyer._id} className="border p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">{lawyer.name}</h2>
          <p><strong>Specialization:</strong> {lawyer.specialization}</p>
          <p><strong>Experience:</strong> {lawyer.experience} years</p>
          <p><strong>Location:</strong> {lawyer.location}</p>
          <p>{lawyer.bio}</p>
        </div>
      ))}
    </div>
  );
}
