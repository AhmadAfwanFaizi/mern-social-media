const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // generate password
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, (salt = 10));

    // create user
    const user = await new User({
      username,
      email,
      password: hashedPassword,
    });

    // save user and response
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
