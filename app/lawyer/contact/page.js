"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ContactLawyerPage() {
  const [lawyers, setLawyers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [acceptedLawyers, setAcceptedLawyers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!email) return;

    const fetchAcceptedLawyers = async () => {
      try {
        const res = await axios.post("/api/client/responses", { clientEmail: email });
        const accepted = res.data.responses.map(r => r.lawEmail);
        setAcceptedLawyers(accepted);
      } catch (error) {
        console.error("Failed to fetch accepted responses", error);
      }
    };

    fetchAcceptedLawyers();
  }, [email]);


  useEffect(() => {
    async function fetchLawyers() {
      try {
        const res = await axios.get("/api/lawyer?status=approved");
        setLawyers(res.data);
      } catch (error) {
        console.error("Failed to fetch lawyers", error);
      }
    }
    fetchLawyers();
  }, []);

  function maskBarId(barId) {
    const parts = barId.split("/");
    if (parts.length === 3) {
      return `${parts[0]}/****/${parts[2]}`;
    }
    return barId;
  }
 
  const handleChat = async(lawEmail)=>{
    const res = await axios.post("/api/chat/start", {
  clientEmail: session.user.email,
  lawyerEmail: lawEmail,
});
router.push(`/chat/${res.data.chatId}`);

  }


  const handleRequestChat = async (lawyerId,lawemail) => {
    setLoadingId(lawyerId);
    try {
      await axios.post("/api/chat-requests", { lawyerId,lawemail,email });
      setSuccessId(lawyerId);
    } catch (error) {
      console.error("Chat request failed", error);
      toast.success("Failed to send chat request.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Available Lawyers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer) => (
          <div
            key={lawyer._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {lawyer.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Expertise: {lawyer.specialization || "N/A"}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Bar ID: {maskBarId(lawyer.barId)}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Email: {lawyer.email}
              </p>
            </div>

            {acceptedLawyers.includes(lawyer.email) ? (
        
              <button
                className="mt-4 inline-block text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                onClick={() => handleChat(lawyer.email)}
              >
                Start Chat
              </button>
          
            ) : (
              <button
                onClick={() => handleRequestChat(lawyer._id,lawyer.email)}
                className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                disabled={loadingId === lawyer._id || successId === lawyer._id}
              >
                {successId === lawyer._id
                  ? "Request Sent"
                  : loadingId === lawyer._id
                    ? "Sending..."
                    : "Request a Chat"}
              </button>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
