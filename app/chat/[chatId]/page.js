"use client";
import { useParams } from "next/navigation";
import ChatComponent from "@/components/ChatComponent";

export default function ClientChatPage() {
  const { chatId } = useParams();
  return <ChatComponent chatId={chatId} userType="client" />;
}
