import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { lawEmail } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const responses = await db
      .collection("responses")
      .find({ lawEmail })
      .sort({ respondedAt: -1 })
      .toArray();

    return NextResponse.json({ responses });
  } catch (error) {
    console.error("Fetch responses error:", error);
    return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 });
  }
}
