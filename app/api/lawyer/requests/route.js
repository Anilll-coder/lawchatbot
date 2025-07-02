import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { lawEmail } = await req.json();

    if (!lawEmail) {
      return NextResponse.json({ error: "Missing lawEmail" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Fetch all chat requests for this lawyer
    const requests = await db.collection("chatRequests").find({ lawEmail }).toArray();

    // Fetch all responses for this lawyer
    const responses = await db.collection("responses").find({ lawEmail }).toArray();

    // Create a map of responses
    const responseMap = new Map();
    responses.forEach((res) => {
      responseMap.set(res.requestId?.toString(), res.status);
    });

    // Merge responses into requests
    const mergedRequestsMap = new Map();
    requests.forEach((req) => {
      mergedRequestsMap.set(req._id.toString(), {
        ...req,
        status: responseMap.get(req._id.toString()) || "pending",
      });
    });

    // Ensure all responses are included, even if there's no matching request
    responses.forEach((res) => {
      const reqIdStr = res.requestId?.toString();
      if (reqIdStr && !mergedRequestsMap.has(reqIdStr)) {
        mergedRequestsMap.set(reqIdStr, {
          _id: reqIdStr,
          lawEmail,
          Client: res.Client || "Unknown",
          requestedAt: null,
          status: res.status,
        });
      }
    });

    // Convert merged map to array
    const mergedRequests = Array.from(mergedRequestsMap.values());

    return NextResponse.json({ mergedRequests }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch merged requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
