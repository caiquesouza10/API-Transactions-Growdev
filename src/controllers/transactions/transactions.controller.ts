import { Response, Request } from "express";
import { usersDb } from "../../database/users.db";
import { Transactions } from "../../classes/transactions";
import { ApiResponse } from "../../util/http-response.adapter";

export class TransactionController {
  public create(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { title, value, type } = req.body;

      const existeUser = usersDb.find((user) => user.id === idUser);

      if (!existeUser) {
        return res.status(404).send({
          ok: false,
          message: "User was not found",
        });
      }

      const newTransaction = new Transactions(title, value, type);
      existeUser.transaction.push(newTransaction);

      return res.status(201).send({
        ok: true,
        message: "Transactions was successfully created",
        data: existeUser.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listTransactionId(req: Request, res: Response) {
    try {
      const { idUser, idTransaction } = req.params;

      const existeUser = usersDb.find((user) => user.id === idUser);

      if (!existeUser) {
        return ApiResponse.notFound(res, "User");
      }

      const transaction = existeUser.transaction.find(
        (transaction) => transaction.id === idTransaction
      );

      if (!transaction) {
        return ApiResponse.notFound(res, "Transaction");
      }

      return res.status(200).send({
        ok: true,
        message: "transactions successfully listed for ID",
        data: transaction.toJsonT(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listTodasTransactions(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { title, type } = req.query;

      const existeUser = usersDb.find((user) => user.id === idUser);

      if (!existeUser?.transaction) {
        return res.status(404).send({
          ok: false,
          message: `Transacão do usuário ${existeUser!.name} não encontrada!`,
        });
      }

      let somarIncome = 0;
      let somarOutcome = 0;
      for (let transaction of existeUser.transaction) {
        if (transaction.type === "income") {
          somarIncome += transaction.value;
        }

        if (transaction.type === "outcome") {
          somarOutcome += transaction.value;
        }
      }

      let result = somarIncome - somarOutcome;

      if (!type && !title) {
        res.status(200).json({
          ok: true,
          message: `Todas as transações do usuário ${existeUser?.name}`,
          data: existeUser.transaction,
          balance: {
            income: somarIncome,
            outcome: somarOutcome,
            Total: result,
          },
        });
      }

      const transactionType = existeUser.transaction.filter(
        (trans) => trans.type === type
      );
      const transactionTitle = existeUser.transaction.filter(
        (trans) => trans.title === title
      );

      if (type) {
        return res.json({
          message: "Transação filtrada por tipo",
          transacao: transactionType,
        });
      }

      if (title) {
        return res.json({
          message: "Transação filtrada por titulo",
          transacao: transactionTitle,
        });
      }
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { idUser, idTransaction } = req.params;

      const existeUser = usersDb.find((user) => user.id === idUser);

      if (!existeUser) {
        return ApiResponse.notFound(res, "User");
      }

      const transactionIndex = existeUser.transaction.findIndex(
        (transaction) => transaction.id === idTransaction
      );

      if (transactionIndex < 0) {
        return ApiResponse.notFound(res, "transaction");
      }

      const deleteTransaction = existeUser.transaction.splice(
        transactionIndex,
        1
      );

      return res.status(201).send({
        ok: true,
        message: "Transaction was successfully deleted",
        data: deleteTransaction[0].toJsonT(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { idUser, idTransaction } = req.params;

      const { title, value, type } = req.body;

      const existeUser = usersDb.find((user) => user.id === idUser);

      if (!existeUser) {
        return ApiResponse.notFound(res, "User");
      }

      const transaction = existeUser.transaction.find(
        (transaction) => transaction.id === idTransaction
      );

      if (!transaction) {
        return ApiResponse.notFound(res, "transaction");
      }

      if(title){
        transaction.title = title;
      }

      if(value){
        transaction.value = value;
      }

      if(type){
        transaction.type = type;
      }

      return ApiResponse.success(
        res,
        "Transaction was successfully updated",
        transaction.toJsonT()
      );

    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
