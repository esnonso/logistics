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
    const { id } = req.body;
    const user = await User.findOne({ email: session.user.email });
    const shipment = await Courier.findById(id);
    const userShipmentIndex = user.shipments.findIndex(
      (s) => s.id.toString() === id
    );
    if (userShipmentIndex < 0) throw new Error("Unauthorized");
    return res
      .status(200)
      .json({ shipment: shipment, email: user.email, phone: user.phone });
  } catch (error) {
    return res.status(500).json("An error occured");
  }
}
