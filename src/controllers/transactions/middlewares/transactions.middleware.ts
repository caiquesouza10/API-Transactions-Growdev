import { NextFunction, Request, Response } from "express";


export const transactionCheck = (req: Request, res: Response, next: NextFunction) => {
    const { title, value, type } = req.body

  if (!title) {
    return res.status(400).send({
      ok: false,
      message: "title was not provided",
    });
  }

  if (!value) {
    return res.status(400).send({
      ok: false,
      message: "value was not provided",
    });
  }

  if (!type) {
    return res.status(400).send({
      ok: false,
      message: "type was not provided",
    });
  }

  if (type !== "income" && type !== "outcome") {
		return res.status(404).send({
			ok: false,
			message:'O tipo do valor está inválido, informe corretamente o tipo ("income" ou "outcome")',
		});
	}


  next();
};
