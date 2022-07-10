import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const router: express.IRouter = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(req.body.password, salt);
  const user = await prisma.user.upsert({
    where: {
      email: req.body.email,
    },
    update: {},
    create: {
      email: req.body.email,
      username: req.body.username,
      password: passwordHash,
    },
  });
  res.json(user);
});

export default router;
