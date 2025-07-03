import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // your MongoDB connection file
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { lawyerId,lawemail,email } = body;

    if (!lawyerId) {
      return NextResponse.json({ message: "Missing lawyerId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("chatRequests");

    await collection.insertOne({
      lawyerId,
      lawEmail: lawemail,
      Client:email,
      requestedAt: new Date(),
    });

    return NextResponse.json({ message: "Chat request sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error handling chat request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
