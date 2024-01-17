import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import Courier from "@/Mongodb/Models/courier";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";

export default async function GetUserStatus(req, res) {
  try {
    await connectDatabase();
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("User not authenticated");
    const user = await User.findOne({ email: session.user.email });
    const shipments = await Courier.find({ user: user._id });
    return res.status(200).json({ user, shipments });
  } catch (error) {
    return res.status(500).json("An error occured");
  }
}
