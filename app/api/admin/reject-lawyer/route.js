import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { id } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("lawyers").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true, result });
}
