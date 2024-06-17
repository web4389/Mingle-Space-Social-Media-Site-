const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = "shilok434@#$@";
const fetchuser = require("../middleware/fetchuser");
const Post = require("../models/Post");
const defaultProfileImg = require("../defaultProfileImg");
// Route:1 Creating User Account Using Post method

router.post(
  "/signup",
  [
    body("name", "The minimum length of name is 3 characters").isLength({
      min: 3,
    }),
    body("email", "Email Should be not empty").not().isEmpty(),
    body("email", "Invalid Email").isEmail(),
    body("password", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    const { name, email, password } = req.body;
    // Checking Errors From Body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success });
    }
    try {
      // Checking that this email is already exists or not
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({
          message: "a user with this email is already exists",
          success,
        });
      }

      // Making Password into hash using bcrypt.js
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      // Saving Account To Database Using Mongoose
      user = await User.create({
        name: name,
        email: email,
        password: hash,
        profilePicture: defaultProfileImg,
        description: "description",
        success: true,
      });

      // Creating Token Using Jwt
      success = true;
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      res.json({ authtoken: authtoken, success });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error occured");
    }
  }
);

// Route:2 Loging the user through user info Using Post method
router.post(
  "/login",
  [
    body("email", "Email Should be not empty").not().isEmpty(),
    body("email", "Invalid Email").isEmail(),
    body("password", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    // Checking Errors From Body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }, success);
    }
    try {
      // Checking that this email is exists or not
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Sorry User Does Not Exists", success });
      }
      // Checking that password is same or not
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ message: "Enter The Correct Password", success });
      }
      // Sending The Authtoken
      success = true;
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      res.json({ authtoken: authtoken, success });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error occured");
    }
  }
);

// Route:3 Getting LoggedIn User's Data using post method
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let success = true;
    const id = req.user.id;
    const user = await User.findById(id).select("-password -email");
    res.json({ user, success });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error occured");
  }
});

// Route:4 Getting Specific User's Data using post method
router.post("/specificuser", fetchuser, async (req, res) => {
  try {
    // Getting the User's name from req body and find user through name
    const name = req.body.name;
    const user = await User.find({ name: name }).select("-password -email");
    if (user == "") {
      res.json({ success: false, msg: "notFound" });
    } else if (user) {
      res.json({ user, success: true });
    }
    // Catching Internal Error
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error occured");
  }
});

// Route:5 Changing LoggedIn User's Description & Name using post method
router.post(
  "/updatingUsersInfo",
  [
    body(
      "description",
      "The minimum length of description is 10 characters"
    ).isLength({
      min: 10,
    }),
    body("name", "The minimum length of name is 3 characters").isLength({
      min: 3,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      let { description, name } = req.body;
      const updatedUsersInfo = {
        name: name,
        description: description,
      };
      let success = true;
      const id = req.user.id;
      const user = await User.findByIdAndUpdate(
        id,
        { $set: updatedUsersInfo },
        { new: true }
      ).select("-password -email");
      const postId = await Post.find({ id: id });
      postId.map(async (data) => {
        const post = await Post.findByIdAndUpdate(
          data._id,
          { $set: updatedUsersInfo },
          { new: true }
        );
      });

      res.json({ user, success });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error occured",
        error: error,
        success: false,
      });
    }
  }
);

// Route:6 Changing LoggedIn User's Profile Picture using post method

router.post("/changingUsersImage", fetchuser, async (req, res) => {
  try {
    let { base64 } = req.body;
    const updatedProfileImg = {
      profilePicture: base64,
    };
    let success = true;
    const id = req.user.id;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updatedProfileImg },
      { new: true }
    ).select("-password -email -description -name");
    const postId = await Post.find({ id: id });
    postId.map(async (data) => {
      const post = await Post.findByIdAndUpdate(
        data._id,
        { $set: updatedProfileImg },
        { new: true }
      );
    });

    res.json({ user, success });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error occured",
      error: error,
      success: false,
    });
  }
});

module.exports = router;
