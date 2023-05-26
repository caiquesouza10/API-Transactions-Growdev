import { Router } from "express";
import { UserController } from "../controllers/users/user.controller";
import { userCheck } from "../controllers/users/middlewares/user.middleware";
import { CpfMiddleware } from "../controllers/users/middlewares/checkCPF";
import { transactionRoutes } from "./transactions.routers";

export const userRoutes = () => {
  const app = Router();

  app.post("/", [userCheck, CpfMiddleware.validateCpf], new UserController().create);

  app.get("/:id", new UserController().listarPorId);

  app.get("/", new UserController().listarTodos);

  app.delete("/:id", new UserController().delete);
  
  app.put("/:id", [CpfMiddleware.validateCpf] , new UserController().update);

  app.use("/:idUser/transactions", transactionRoutes());

  return app;
};
