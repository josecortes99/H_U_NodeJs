import { Users } from "../models/users.model.ts";
import bcrypt from "bcrypt";

export const createUserService = async (
  name: string,
  email: string,
  password: string,
  rol: string
) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      rol
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};

