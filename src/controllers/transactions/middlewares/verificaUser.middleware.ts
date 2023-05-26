import { NextFunction, Request, Response } from "express";
import { usersDb } from "../../../database/users.db";
import { ApiResponse } from "../../../util/http-response.adapter";


export const userCheck = (req: Request, res: Response, next: NextFunction) => {
    const { idUser } = req.params

    const existeUser = usersDb.find((user) => user.id === idUser);

    if (!existeUser) {
        return ApiResponse.notFound(res, "User");
      }

  next();
};