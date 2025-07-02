import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const lawyersCollection = db.collection("lawyers");

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query = status ? { status } : {};
    const lawyers = await lawyersCollection.find(query).toArray();
    return NextResponse.json(lawyers);
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
