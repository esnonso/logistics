import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const { firstname, lastname, email, password, phone } = req.body;
    const foundEmail = await User.findOne({ email: email.toLowerCase() });
    if (foundEmail) throw new Error("Email exists!");
    await new User({
      name: `${firstname} ${lastname}`,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
      phone: phone,
      status: "Administrator",
    }).save();
    return res.status(200).json("Success! Proceed to login");
  } catch (error) {
    res.status(500).json(error.message);
  }
}
