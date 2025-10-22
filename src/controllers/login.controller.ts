import type { Request, Response } from "express";
import { loginUserService } from "../services/login.service.ts";
import { handleHttp } from "../utils/error.handdler.ts";

export const loginController = async (req: Request, res: Response) => {
  try {
    console.log("BODY RECIBIDO:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Faltan campos requeridos" });
    }

    const { token, user } = await loginUserService(email, password);

    res.status(200).json({
      ok: true,
      message: "Inicio de sesión exitoso",
      token,
      user,
    });
  } catch (error: any) {
    console.error("LOGIN ERROR:", error.message);
    handleHttp(res, "Error al iniciar sesión", 401, error.message);
  }
};
