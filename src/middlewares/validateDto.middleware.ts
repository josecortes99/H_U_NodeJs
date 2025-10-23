import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { Request, Response, NextFunction } from "express";

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance, { whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));
      return res.status(400).json({
        ok: false,
        message: "Errores de validación",
        errors: formattedErrors,
      });
    }

    next(); // ✅ pasa al controlador si no hay errores
  };
};
