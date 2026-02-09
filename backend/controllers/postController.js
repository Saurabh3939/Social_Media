const Post = require("../models/post.model");
const User = require("../models/user.model");

exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = req.file.path;
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      user: req.user.id,
      username: user.username,
      text,
      image: imageUrl,
    });
    await newPost.save();
    res.status(201).json({ message: "Post Saved Successfully", post: newPost });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error While Creating Post", error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    console.log(posts);
    res.status(201).json(posts);
  } catch (err) {
    res
      .status(501)
      .json({ message: "Error While Fetching Posts", error: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.status(200).json({ post });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error While Liking Post", error: err.message });
  }
};

exports.addComments = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    const newComment = {
      user: req.user.id,
      username: user.username,
      text,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error While Adding Comment", error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post Owner:", post.user.toString());
      console.log("Logged-in User:", req.user.id.toString());
      return res.status(404).json({ message: "Post Not Found" });
    }

    if (post.user.toString() !== req.user.id) {
      console.log("ID Mismatch:", post.user, req.user.id);
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: err.message });
  }
};
