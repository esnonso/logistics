import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import Courier from "@/Mongodb/Models/courier";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("User not authenticated");
    const user = await User.findOne({ email: session.user.email });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("An error occured");
  }
}
