const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client"); // ตรวจสอบว่า @prisma/client ถูกติดตั้งแล้ว

// 1. Initializing Prisma Client
// การเรียกใช้แบบนี้ถูกต้องแล้ว และไม่ควรเป็นสาเหตุของ TypeError: Cannot read properties of undefined (reading '__internal')
const prisma = new PrismaClient(); 

const app = express();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// --- Routes ---

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running with Prisma + Express!");
});

// GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    // 💡 การ Log Error เพื่อ Debug
    console.error("Error fetching users:", error); 
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
});

// POST new user
app.post("/users", async (req, res) => {
  try {
    const { uName, email, password, role } = req.body;
    
    // 💡 ควรตรวจสอบข้อมูลอินพุตเบื้องต้นที่นี่ก่อน
    if (!uName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields (uName, email, password)" });
    }

    const user = await prisma.user.create({
      data: { uName, email, password, role },
    });
    res.status(201).json({ message: "User created successfully", data: user }); // ใช้ 201 สำหรับการสร้างทรัพยากร
  } catch (error) {
    // 💡 การ Log Error เพื่อ Debug
    console.error("Error creating user:", error); 
    
    // ตรวจสอบข้อผิดพลาดเฉพาะของ Prisma เช่น P2002 (Unique constraint failed)
    if (error.code === 'P2002') {
        return res.status(409).json({ message: "Email already exists." });
    }
    
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
});

// --- Server Startup ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});