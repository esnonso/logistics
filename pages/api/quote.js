// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDatabase } from "@/Mongodb";
import quote from "@/Mongodb/Models/quote";

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
    await new quote({
      name,
      email,
      phone,
      movingFrom,
      movingTo,
      apptFromType,
      apptToType,
      service,
    }).save();

    res.status(200).json("Request success, we will give you a call soon");
  } catch (error) {
    res.status(500).json(error.message);
  }
}
