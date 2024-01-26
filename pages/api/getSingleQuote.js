import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import Quote from "@/Mongodb/Models/quote";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("User not authenticated");
    const user = await User.findOne({ email: session.user.email });
    const { id } = req.body;
    if (user.role !== "Administrator") throw new Error("Unauthorized");
    const quotes = await Quote.find({});
    return res.status(200).json(quotes);
  } catch (error) {
    console.log(error);
    return res.status(500).json("An error occured");
  }
}
