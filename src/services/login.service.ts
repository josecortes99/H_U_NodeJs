import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Users } from "../models/users.model.ts";

const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "ZRDUlqyoa1vCImRTYCf567yZAmAglExQOEgaZm+HmxE=";

const JWT_SECRET =
  process.env.JWT_REFRESH_SECRET || "ZRDUlqyoa1vCImRTYCf567yZAmAglExQOEgaZm+HmxE=";


let refreshTokens: string[] = []; // Aquí guardaremos los refresh tokens válidos (ideal: DB)

export const loginUserService = async (email: string, password: string) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const {
    id,
    name,
    email: userEmail,
    password: hashedPassword,
    rol,
  } = user.dataValues;

  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  const payload = { id, email: userEmail, rol };

  // Access Token: expiración corta
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });

  // Refresh Token: expiración larga
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // Guardar refreshToken en memoria (ideal: base de datos)
  refreshTokens.push(refreshToken);

  return {
    token,
    refreshToken,
    user: { id, name, email: userEmail, rol },
  };
};

