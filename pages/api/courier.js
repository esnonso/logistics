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
    const {
      name,
      phone,
      pickupAddress,
      deliveryAddress,
      value,
      fragile,
      desc,
      type,
    } = req.body;

    const request = await new Courier({
      user: user._id,
      receipientName: name,
      receipientPhone: phone,
      pickupAddress,
      deliveryAddress,
      fragile,
      value,
      shipmentType: type,
      description: desc,
    }).save();
    return res.status(200).json(request._id);
  } catch (error) {
    return res.status(500).json("An error occured");
  }
}
