import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const lawyers = await db.collection("lawyers").find({ status: "pending" }).toArray();

  return NextResponse.json(lawyers);
}
