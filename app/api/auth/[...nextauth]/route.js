import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  const client = await clientPromise;
  const db = client.db("lawbot");

  
const user = await db.collection("users").findOne({
  email: { $regex: new RegExp(`^${credentials.email}$`, 'i') },
});

  console.log("FOUND USER:", user);

  if (!user) {
    console.log("No user found with this email");
    return null;
  }

  const isValid = await bcrypt.compare(credentials.password, user.password);
  console.log("PASSWORD VALID?", isValid);

  if (!isValid) {
    return null;
  }

  return { id: user._id.toString(), name: user.name, email: user.email };
}

    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
