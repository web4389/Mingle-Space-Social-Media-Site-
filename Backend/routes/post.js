const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route:1 Creating Posts Using Post Method
router.post(
  "/create",
  [
    body(
      "paragraph",
      "The minimum length of Article is 10 characters"
    ).isLength({
      min: 10,
    }),
  ],
  fetchuser,
  async (req, res) => {
    // Checking Errors From Body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }
    try {
      const { paragraph } = req.body;
      const date = new Date();
      const fullDate = {
        month: date.toLocaleString("default", { month: "long" }),
        day: date.getDate(),
        year: date.getFullYear(),
        msg: "",
      };
      // Getting the User's Detail form token
      const id = req.user.id;
      const user = await User.findById(id);
      if (!user) {
        res.status(401).send({ message: "Not Allowed", success: false });
      } else {
        // Saving post To The Database
        if (req.body.postImage) {
          const post = await Post.create({
            id: id,
            postImage: req.body.postImage,
            paragraph: paragraph,
            name: user.name,
            description: user.description,
            profilePicture: user.profilePicture,
            date: fullDate,
          });
          res.json({ post, success: true });
        } else {
          const post = await Post.create({
            id: id,
            paragraph: paragraph,
            name: user.name,
            description: user.description,
            profilePicture: user.profilePicture,
            date: fullDate,
          });
          res.json({ post, success: true });
        }
      }
      // Catching Internal Error
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error occured");
    }
  }
);

// Route:2 Getting The LoggedIn User's Posts Using Post Method
router.post("/userposts", fetchuser, async (req, res) => {
  try {
    // Getting the User's id from token
    const id = req.user.id;
    const unSortedPost = await Post.find({ id: id });
    const post = unSortedPost.reverse();
    res.json({ post, success: true });

    // Catching Internal Error
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error occured");
  }
});

// Route:3 Getting The All User's Posts Using Post Method
router.post("/gettingposts", fetchuser, async (req, res) => {
  try {
    // Getting all post from database
    const unshuffledPosts = await Post.find();

    const post = unshuffledPosts.sort(() => Math.random() - 0.5);

    res.json({ post, success: true });

    // Catching Internal Error
  } catch (error) {
    res.status(500).send("Internal Server Error occured");
  }
});

// Route:4 Editing The Specific Post Using Put Method
router.put(
  "/editingpost/:id",
  [
    body(
      "paragraph",
      "The minimum length of Article is 10 characters"
    ).isLength({
      min: 10,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      // Checking Errors From Body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false });
      }
      const date = new Date();
      const fullDate = {
        month: date.toLocaleString("default", { month: "long" }),
        day: date.getDate(),
        year: date.getFullYear(),
        msg: "Edited",
      };
      const { paragraph, postImage } = req.body;
      const updatedPost = {
        paragraph: paragraph,
        postImage: postImage,
        date: fullDate,
      };
      const id = req.params.id;
      // Checking the Users is the owner of this post
      let post = await Post.findById(id);
      if (!post) {
        res.status(404).send({ message: "Not Found", success: false });
      } else if (post.id !== req.user.id) {
        res.status(401).send({ message: "Not Allowed", success: false });
      } else {
        // Updating The Post
        post = await Post.findByIdAndUpdate(
          id,
          { $set: updatedPost },
          { new: true }
        );
        res.json(post);
      }
      // Catching Internal Error
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error occured");
    }
  }
);

// Route:5 Deleting The Specific Post Using Delete Method
router.delete("/deletingpost/:id", fetchuser, async (req, res) => {
  try {
    const id = req.params.id;
    let post = await Post.findById(id);
    // Checking Post that Exists or not
    if (!post) {
      res.status(404).send({ message: "Not Found", success: false });
    }
    // Checking That User owns this post or not
    else if (post.id !== req.user.id) {
      res.status(401).send({ message: "Not Allowed", success: false });
    } else {
      // Deleting the Post
      post = await Post.findByIdAndDelete(id);
      const userId = req.user.id;
      const unSortedPost = await Post.find({ id: userId });
      Allpost = unSortedPost.reverse();
      res.json({
        message: "Successfully Deleted",
        success: true,
        post: Allpost,
      });
    }
    // Catching Internal Error
  } catch (error) {
    // console.log(error);
    res.status(500).send("Internal Server Error occured");
  }
});

// Route:6 Getting The Specific User's Posts Using Post Method
router.post("/specificUserposts/:id", fetchuser, async (req, res) => {
  try {
    // Getting the User's id from url
    const id = req.params.id;
    // Getting User's Posts From User's Id
    const post = await Post.find({ id: id });
    res.json({ post, success: true });
    // Catching Internal Error
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error occured");
  }
});

// Route:7 Getting The Specific Post by Post Id Using Post Method
router.post("/specificpost/:id", fetchuser, async (req, res) => {
  try {
    // Getting the User's id from url
    const id = req.params.id;
    // Getting User's Posts From User's Id
    const post = await Post.findById(id);
    res.json({ post, success: true });
    // Catching Internal Error
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error occured");
  }
});

module.exports = router;
