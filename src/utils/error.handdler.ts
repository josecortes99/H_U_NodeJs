import { type Response } from "express";
import { type HttpErrorStatus } from "../types/types.ts";

export const handleHttp = (
  res: Response,
  error: string,
  code: HttpErrorStatus,
  details?: unknown
) => {
  // Si hay un error, lo mostramos en consola (útil para debug)
  console.error("❌ Error:", details);

  // Si 'details' es una instancia de Error, extraemos el mensaje
  const description =
    details instanceof Error
      ? details.message
      : typeof details === "string"
      ? details
      : JSON.stringify(details);

  // Enviamos una única respuesta JSON al cliente
  res.status(code).json({
    ok: false,
    error,        // Mensaje general (por ejemplo: "Error del servidor")
    description,  // Descripción real del error
  });
};
