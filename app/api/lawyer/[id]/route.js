import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db();

    const lawyer = await db
      .collection("lawyers")
      .findOne({ _id: new ObjectId(id), status: "approved" });

    if (!lawyer) {
      return new Response(JSON.stringify({ message: "Lawyer not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(lawyer), { status: 200 });
  } catch (error) {
    console.error("Error fetching lawyer:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
