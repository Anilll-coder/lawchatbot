import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db(); 
    const collection = db.collection("lawyers");

    const result = await collection.insertOne(body);

    return new Response(JSON.stringify({ message: "Profile created", id: result.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
