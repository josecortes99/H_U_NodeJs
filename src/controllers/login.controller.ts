import type { Request, Response } from "express";
import { loginUserService } from "../services/login.service.ts";
import { handleHttp } from "../utils/error.handdler.ts";
import  type { LoginDTO } from "../dtos/login.dto.ts";

export const loginController = async (req: Request, res: Response) => {
  try {
    const body = req.body as LoginDTO;

    const {email, password } = body

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, error: "Faltan campos requeridos" });
    }

    const { token, refreshToken, user } = await loginUserService(email, password);

    res.status(200).json({
      ok: true,
      message: "Inicio de sesión exitoso",
      token,
      refreshToken,
      user,
    });
  } catch (error: any) {
    console.error("LOGIN ERROR:", error.message);
    handleHttp(res, "Error al iniciar sesión", 401, error.message);
  }
};

