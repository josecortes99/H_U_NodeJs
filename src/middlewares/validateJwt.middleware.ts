import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "ZRDUlqyoa1vCImRTYCf567yZAmAglExQOEgaZm+HmxE=";

// Extendemos el tipo Request para incluir el usuario decodificado
interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ ok: false, message: "Token no proporcionado" });
    }

    // El formato esperado es: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ ok: false, message: "Formato de token inválido" });
    }

    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded; // Guardamos la info del usuario dentro de req.user

    next(); // Pasamos al siguiente middleware o controlador
  } catch (error) {
    console.error("Error verificando token:", error);
    return res
      .status(401)
      .json({ ok: false, message: "Token inválido o expirado" });
  }
};

export const authorizeRoles = (rolesPermitidos: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Usuario no autenticado" });
    }

    if (!rolesPermitidos.includes(user.rol)) {
      return res.status(403).json({
        ok: false,
        message: `Acceso denegado. Rol requerido: ${rolesPermitidos.join(
          ", "
        )}`,
      });
    }

    next(); // Permitir acceso
  };
};
