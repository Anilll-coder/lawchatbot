import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name, email, password, specialization,barId,
      experience, location, availability, bio
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // default DB from your URI
    const lawyersCollection = db.collection('lawyers');

    // Check if Bar ID already exists
    const existingLawyer = await lawyersCollection.findOne({ barId:barId.trim() });

    if (existingLawyer) {
      return new Response(
        JSON.stringify({ message: 'A profile with this Bar ID already exists.' }),
        { status: 409 } // Conflict
      );
    }

    // Check if email already exists
    const existing = await db.collection('lawyers').findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Lawyer already registered with this email' }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('lawyers').insertOne({
      name,
      email,
      password:hashedPassword, // In real apps, hash password!
      specialization,
      experience,
      location,
      availability,
      bio,
      status: 'pending', // for admin approval later
       barId: barId.trim(),
      createdAt: new Date()
    });

    return NextResponse.json({ message: 'Lawyer registered successfully!' }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
