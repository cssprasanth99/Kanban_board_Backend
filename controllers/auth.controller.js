const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 3);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(200).json({ message: "registration done successfully" });
  } catch (error) {
    res.status(404).send(error);
  }
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("Invalid password or email");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(200).json("Invalid password");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { register, login };
