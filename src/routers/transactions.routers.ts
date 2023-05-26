import { Router } from "express";
import { TransactionController } from "../controllers/transactions/transactions.controller";
import { transactionCheck } from "../controllers/transactions/middlewares/transactions.middleware";
import { userCheck } from "../controllers/transactions/middlewares/verificaUser.middleware";

export const transactionRoutes = () => {
  const app = Router({ mergeParams: true });

  app.post("/",[transactionCheck] , new TransactionController().create)

  app.get("/:idTransaction", new TransactionController().listTransactionId);

  app.get("/", [userCheck],new TransactionController().listTodasTransactions);

  app.delete("/:idTransaction", new TransactionController().delete);

  app.put("/:idTransaction", new TransactionController().update);

  return app;
};