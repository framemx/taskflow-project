const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Server is running with Prisma 7 + Express!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { uName, email, password, role } = req.body;
    const user = await prisma.user.create({
      data: { uName, email, password, role },
    });
    res.json({ message: "User created", data: user });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
