import { Response, Request } from "express";
import { User } from "../../classes/user";
import { usersDb } from "../../database/users.db";
import { ApiResponse } from "../../util/http-response.adapter";


export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;

      const user = new User(name, cpf, email, age);
      usersDb.push(user);

      return res.status(201).send({
        ok: true,
        message: "User was successfully created",
        data: user.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = usersDb.find((user) => user.id === id);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "User was not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "User was successfully obtained",
        data: result?.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listarTodos(req: Request, res: Response) {
    try {
      const { nome, cpf, email } = req.query;

      let result = usersDb;

      if (nome) {
        result = usersDb.filter((user) => user.name === nome);
      }

      if (cpf) {
        result = usersDb.filter((user) => user.cpf === cpf);
      }

      if (email) {
        result = usersDb.filter((user) => user.email === email);
      }

      return res.status(200).send({
        ok: true,
        message: "Users were successfully listed",
        data: result.map((growdever) => growdever.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userVerindex = usersDb.findIndex((user) => user.id === id);
      if (userVerindex < 0) {
        return res.status(404).send({
          ok: false,
          message: "User was not found",
        });
      }

      const deleteUser = usersDb.splice(userVerindex, 1);

      return res.status(200).send({
        ok: true,
        message: "User was successfully deleted",
        data: deleteUser[0].toJson(), // mostra todos os growdevers deletado
      });
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, cpf, age, email } = req.body;

      const userfind = usersDb.find((user) => user.id === id);

      if (!userfind) {
        return res.status(404).send({
          ok: false,
          message: "User was not found",
        });
      }

      if (nome) {
        userfind.nome = nome;
      }

      if (cpf) {
        userfind.cpf = cpf;
      }

      if (age) {
        userfind.age = age;
      }
      if (email) {
        userfind.email = email;
      }

      return res.status(200).send({
        ok: true,
        message: "User was successfully update",
        data: userfind.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
