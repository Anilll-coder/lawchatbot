import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { clientEmail,lawyerEmail } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    // Check if chat already exists between client and lawyer
    let chat = await db.collection("chats").findOne({ lawyerEmail, clientEmail });

    // If not, create new chat
    if (!chat) {
      const newChat = {
        chatId: uuidv4(),
        lawyerEmail,
        clientEmail,
        createdAt: new Date(),
      };

      await db.collection("chats").insertOne(newChat);
      chat = newChat;
    }

    return NextResponse.json({ chatId: chat.chatId });
  } catch (error) {
    console.error("Error in start chat:", error);
    return NextResponse.json({ error: "Failed to start chat" }, { status: 500 });
  }
}
