import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import Courier from "@/Mongodb/Models/courier";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";

export default async function GetShipment(req, res) {
  try {
    await connectDatabase();
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("User not authenticated");
    const { id } = req.body;
    const user = await User.findOne({ email: session.user.email });
    const shipment = await Courier.findById(id);
    if (shipment.user.toString !== user._id.toString)
      throw new Error("Unauthorized");
    return res
      .status(200)
      .json({ shipment: shipment, email: user.email, phone: user.phone });
  } catch (error) {
    console.log(error);
    return res.status(500).json("An error occured");
  }
}
