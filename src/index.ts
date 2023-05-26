import express from "express";
import { userRoutes } from "./routers/user.routers";

const app = express();
app.use(express.json());

app.use("/user", userRoutes());

app.listen(3333, () => {
  console.log("api is running transactions");
});