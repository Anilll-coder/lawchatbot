"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function LawyerDashboard() {
  const [mergedRequests, setMergedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState(null);
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchRequests() {
      try {
        const res = await axios.post("/api/lawyer/requests", {
          lawEmail: session.user.email,
        });
        setMergedRequests(res.data.mergedRequests || []);
      } catch (error) {
        console.error("Failed to fetch chat requests", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [session?.user?.email],);

  const handleResponse = async (requestId, action, Client) => {
    try {
      setRespondingId(requestId);
      await axios.post("/api/lawyer/respond", {
        requestId,
        Client,
        lawEmail: session.user.email,
        action,
      });

      setMergedRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, status: action } : r))
      );
    } catch (err) {
      console.error("Error responding to request:", err);
    } finally {
      setRespondingId(null);
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await axios.delete("/api/lawyer/respond", {
        data: { requestId, lawEmail: session?.user?.email },
      });
      setMergedRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (error) {
      console.error("Failed to delete response:", error);
    }
  };

  const pendingRequests = mergedRequests.filter((r) => r.status === 'pending');
  const pastResponses = mergedRequests.filter((r) => r.status !== 'pending');
  return (
  <section className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-900">
    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
      Lawyer Dashboard
    </h1>

    {/* Toggle Buttons */}
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => setActiveTab("pending")}
        className={`px-5 py-2 rounded-full text-white font-semibold transition ${
          activeTab === "pending"
            ? "bg-yellow-500"
            : "bg-gray-400 hover:bg-gray-500"
        }`}
      >
        Pending Requests
      </button>
      <button
        onClick={() => setActiveTab("past")}
        className={`px-5 py-2 rounded-full text-white font-semibold transition ${
          activeTab === "past"
            ? "bg-blue-600"
            : "bg-gray-400 hover:bg-gray-500"
        }`}
      >
        Past Responses
      </button>
    </div>

    {loading ? (
      <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
    ) : activeTab === "pending" ? (
      <div>
        {pendingRequests.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No pending requests.</p>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((req) => (
              <div
                key={req._id}
                className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 border border-yellow-300 dark:border-yellow-600"
              >
                <p className="text-gray-900 dark:text-white font-medium">
                  <strong>Client:</strong> {req.Client}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <strong>Requested At:</strong>{" "}
                  {req.requestedAt ? new Date(req.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Unknown"}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    disabled={respondingId === req._id}
                    onClick={() => handleResponse(req._id, "accepted", req.Client)}
                    className={`px-4 py-2 rounded-lg text-white transition ${
                      respondingId === req._id
                        ? "bg-green-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    disabled={respondingId === req._id}
                    onClick={() => handleResponse(req._id, "rejected", req.Client)}
                    className={`px-4 py-2 rounded-lg text-white transition ${
                      respondingId === req._id
                        ? "bg-red-400"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ) : (
      <div>
        {pastResponses.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No past responses yet.</p>
        ) : (
          <div className="space-y-4">
            {pastResponses.map((req) => (
              <div
                key={req._id}
                className={`bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 border-l-4 ${
                  req.status === "accepted"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      <strong>Client:</strong> {req.Client}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          req.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="px-3 py-1 text-xs rounded-md bg-red-200 hover:bg-red-300 text-red-800 dark:bg-red-700 dark:hover:bg-red-600 dark:text-white"
                  >
                    Delete
                  </button>
                </div>

                {req.status === "accepted" && (
                  <button
                    onClick={async () => {
                      try {
                        const res = await axios.post("/api/chat/start", {
                          clientEmail: req.Client,
                          lawyerEmail: session.user.email,
                        });
                        const chatId = res.data.chatId;
                        window.location.href = `/chat/${chatId}`;
                      } catch (error) {
                        console.error("Failed to access chat:", error);
                        alert("Unable to find or create chat session.");
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Go to Chat
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </section>
);
}
