const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "https://socialmedia-sepia-tau.vercel.app/",
    credentials: true,
  }),
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected To Successfully");
  })
  .catch((err) => {
    console.log("DB Connection Error", err);
  });

app.get("/", (req, res) => {
  res.send("API Is Working");
});

app.listen(PORT, () => {
  console.log(`Server Is Listening On port ${PORT}`);
});
