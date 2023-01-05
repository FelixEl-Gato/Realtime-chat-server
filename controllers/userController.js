import User from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "User already registered", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already registered", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    return res.json({
      msg: "User registered successfully",
      status: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
