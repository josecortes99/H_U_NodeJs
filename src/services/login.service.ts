import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Users } from "../models/users.model.ts";

const JWT_SECRET = process.env.JWT_SECRET || "ZRDUlqyoa1vCImRTYCf567yZAmAglExQOEgaZm+HmxE=";

export const loginUserService = async (email: string, password: string) => {
  // Buscar usuario por correo
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Extraer los valores reales del modelo Sequelize
  const { id, name, email: userEmail, password: hashedPassword, rol } = user.dataValues;

  console.log("PASSWORD RECIBIDO:", password);
  console.log("HASH EN BD:", hashedPassword);

  // Comparar contraseñas
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  // Generar token JWT
  const token = jwt.sign(
    { id, email: userEmail, rol },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Retornar datos útiles (sin contraseña)
  return { 
    token, 
    user: { id, name, email: userEmail, rol } 
  };
};
