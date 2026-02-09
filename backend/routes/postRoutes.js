const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const {
  createPost,
  getAllPosts,
  deletePost,
} = require("../controllers/postController");

router.post("/create", auth, upload.single("image"), createPost);

router.get("/all", getAllPosts);

router.patch(
  "/like/:id",
  auth,
  require("../controllers/postController").likePost,
);
router.patch(
  "/comment/:id",
  auth,
  require("../controllers/postController").addComments,
);

router.delete("/delete/:id", auth, deletePost);

module.exports = router;
