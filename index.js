import express from "express";
import jwt from "jsonwebtoken";

const app = express();

// Secret key
const secretKey = "viratkohli";

// Sample API for checking purpose
app.get("/", (req, res) => {
  res.json({
    message: "sample api",
  });
});

// Login API
app.post("/login", (req, res, next) => {
  const user = {
    id: 1,
    username: "aman",
    email: "sbc",
  };
  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      user,
      token,
    });
  });
});

// Profile API for testing JWT token
app.post("/profile", verifyToken, (req, res, next) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      res.json({ message: "profile accessed", authData });
    }
  });
});

// Verify token function
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "Token is not valid",
    });
  }
}

// Server listening
app.listen(5000, () => {
  console.log("app is running on port 5000");
});
