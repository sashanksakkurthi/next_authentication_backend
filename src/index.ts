import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import login from "./router/login.router";
import register from "./router/register.router";

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/login", login);
app.use("/register", register);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 listening at port ${PORT}`);
});
