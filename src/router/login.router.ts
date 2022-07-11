import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const router: express.IRouter = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: false,
      email: true,
      password: true,
      username: true,
    },
  }); 
  try {
    const HashPassword = await bcrypt.compare(password, user?.password!);
    if (user?.email === email && HashPassword) {
      res.json({ email: user?.email, name: user?.username });
    } else {
      res.status(401).json({ error: "Password did not match" });
    } 
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Password did not match" });
  }
});

export default router;
