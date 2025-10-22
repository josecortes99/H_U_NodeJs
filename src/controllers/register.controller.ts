import type { Request, Response } from "express";
import { createUserService } from "../services/register.service.ts";
import { handleHttp } from "../utils/error.handdler.ts";
import type { HttpErrorStatus } from "../types/types.ts";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, rol } = req.body;
    if (!name || !email || !password || !rol) {
      return console.warn("Ingrese todos los campos");
    }
    const newUser = await createUserService(name, email, password, rol);
    res.json({ menssage: "Se agrego nuevo usuario:", newUser });
  } catch (error) {
    return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error);
  }
};
