// app/api/lawyer/respond/route.js

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Handle POST (Submit a response)
export async function POST(req) {
  try {
    const { requestId, Client, lawEmail, action } = await req.json();

    if (!requestId) {
      return NextResponse.json({ message: "Missing requestId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // 1. Insert the lawyer's response
    const result = await db.collection("responses").insertOne({
      requestId: new ObjectId(requestId),
      status: action,
      Client,
      lawEmail,
      respondedAt: new Date(),
    });

    // 2. Delete the original chat request to remove it from pending requests
    await db.collection("chatRequests").deleteOne({
      _id: new ObjectId(requestId),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Handle DELETE (Delete a past response)
export async function DELETE(req) {
  try {
    const { requestId, lawEmail } = await req.json();

    if (!requestId || !lawEmail) {
      return NextResponse.json({ error: "Missing requestId or lawEmail" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("responses").deleteOne({
      requestId: new ObjectId(requestId),
      lawEmail,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Response not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
