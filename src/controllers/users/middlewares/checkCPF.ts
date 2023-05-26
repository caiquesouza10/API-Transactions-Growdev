import { NextFunction, Request, Response } from "express";
import { usersDb } from "../../../database/users.db";

export class CpfMiddleware {
  public static validateCpf(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.body;

      const existeCpf = usersDb.some((item) => item.cpf === cpf);
      if (existeCpf) {
        return res.status(403).send({
          ok: false,
          message: "Cpf já cadastrado",
        });
      }

      next();
      
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
