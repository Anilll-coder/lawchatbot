import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


// GET: Fetch all messages for a chat
export async function GET(_, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { chatId } = await params;

    const messages = await db
      .collection("messages")
      .find({ chatId })
      .sort({ timestamp: 1 })
      .toArray();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET /api/chat/[chatId] error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// POST: Send a new message in the chat
export async function POST(req, { params }) {
  try {
    const { sender, message } = await req.json();
    const { chatId } = await params;

    if (!sender || !message) {
      return NextResponse.json({ error: "Missing sender or message" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    await db.collection("messages").insertOne({
      chatId,
      sender,
      message,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Message sent" });
  } catch (error) {
    console.error("POST /api/chat/[chatId] error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
