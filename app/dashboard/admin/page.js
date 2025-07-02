"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [tab, setTab] = useState("requests");
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [approvedLawyers, setApprovedLawyers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch("/api/lawyer?status=pending"),
        fetch("/api/lawyer?status=approved"),
      ]);

      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();

      setPendingLawyers(pendingData);
      setApprovedLawyers(approvedData);
    } catch (error) {
      toast.error("Failed to fetch lawyer data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleApprove = async (id) => {
    const res = await fetch("/api/admin/approve-lawyer", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Lawyer approved");
      fetchLawyers();
    } else {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    const res = await fetch("/api/admin/reject-lawyer", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Lawyer rejected");
      fetchLawyers();
    } else {
      toast.error("Rejection failed");
    }
  };

  const renderLawyerCard = (lawyer, showActions = false) => (
    <div key={lawyer._id} className="bg-white rounded-xl shadow p-5 space-y-2">
      <h2 className="text-xl font-semibold text-gray-800">{lawyer.name}</h2>
      <p><strong>Email:</strong> {lawyer.email}</p>
      <p><strong>Bar ID:</strong> {lawyer.barId}</p>
      <p><strong>Expertise:</strong> {lawyer.specialization}</p>
      <p><strong>Experience:</strong> {lawyer.experience}</p>
      <p><strong>Availability:</strong> {lawyer.availability}</p>
      {showActions && (
        <div className="flex justify-between mt-4 space-x-3">
          <button
            onClick={() => handleApprove(lawyer._id)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(lawyer._id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 rounded-t-lg border-b-4 ${
            tab === "requests"
              ? "border-blue-600 bg-white"
              : "border-transparent bg-gray-200"
          } text-gray-800 font-medium transition-all duration-300`}
          onClick={() => setTab("requests")}
        >
          Lawyer Requests
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg border-b-4 ${
            tab === "approved"
              ? "border-blue-600 bg-white"
              : "border-transparent bg-gray-200"
          } text-gray-800 font-medium transition-all duration-300`}
          onClick={() => setTab("approved")}
        >
          Approved Lawyers
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white p-6 rounded-b-xl shadow-md">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : tab === "requests" ? (
          pendingLawyers.length === 0 ? (
            <p className="text-center text-gray-500">No pending lawyer requests.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {pendingLawyers.map((lawyer) => renderLawyerCard(lawyer, true))}
            </div>
          )
        ) : approvedLawyers.length === 0 ? (
          <p className="text-center text-gray-500">No approved lawyers yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {approvedLawyers.map((lawyer) => renderLawyerCard(lawyer))}
          </div>
        )}
      </div>
    </div>
  );
}
