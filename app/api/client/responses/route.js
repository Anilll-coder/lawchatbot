// app/api/client/responses/route.js

import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { clientEmail } = await req.json();
    if (!clientEmail) return NextResponse.json({ error: "Missing email" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db();

    const responses = await db.collection("responses").find({
      Client: clientEmail,
      status: "accepted"
    }).toArray();

    return NextResponse.json({ responses });
  } catch (err) {
    console.error("Error fetching responses:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
