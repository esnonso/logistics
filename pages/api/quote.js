// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDatabase } from "@/Mongodb";
import quote from "@/Mongodb/Models/quote";
import User from "@/Mongodb/Models/user";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const {
      name,
      email,
      phone,
      movingFrom,
      movingTo,
      apptFromType,
      apptToType,
      service,
    } = req.body;

    const newquote = await new quote({
      name,
      email,
      phone,
      movingFrom,
      movingTo,
      apptFromType,
      apptToType,
      service,
    }).save();

    const session = await getServerSession(req, res, options);
    if (session) {
      const user = await User.findOne({ email: session.user.email });
      user.quotes.push({ id: newquote._id, from: movingFrom, to: movingTo });
      newquote.user = user._id;
      await user.save();
      await newquote.save();
    }

    res.status(200).json("Request success, we will give you a call soon");
  } catch (error) {
    res.status(500).json(error.message);
  }
}
