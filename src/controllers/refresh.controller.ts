import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "otrosecretoaunmaslargo";

// Esta lista debe estar sincronizada con la usada en el servicio o idealmente estar en DB
let refreshTokens: string[] = []; // Puedes exportarla y compartirla desde login.service.ts

export const refreshTokenController = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ ok: false, message: "Refresh token requerido" });
  }

  // Validar que el refresh token exista y sea válido
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ ok: false, message: "Refresh token inválido" });
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      id: string;
      email: string;
      rol: string;
    };

    // Generar nuevo access token
    const newToken = jwt.sign(
      { id: payload.id, email: payload.email, rol: payload.rol },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({ ok: true, token: newToken });
  } catch (error) {
    return res.status(403).json({ ok: false, message: "Refresh token inválido o expirado" });
  }
};
