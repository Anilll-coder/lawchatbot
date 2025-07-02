import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db();
  const lawyersCollection = db.collection("lawyers");

  const lawyer = await lawyersCollection.findOne({ email });

  if (!lawyer) {
    return NextResponse.json({ message: "Lawyer not found" }, { status: 404 });
  }
   if (!lawyer.password) {
    return NextResponse.json({ message: "No password set for this account" }, { status: 400 });
  }

  // ✅ Now compare passwords
  const isMatch = await bcrypt.compare(password, lawyer.password);

  if (!isMatch) {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }

  if (!lawyer.status==="approved") {
    return NextResponse.json({ message: "Account pending admin approval" }, { status: 403 });
  }

  return NextResponse.json({ message: "Login successful", lawyer });
}
