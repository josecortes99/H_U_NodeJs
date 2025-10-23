import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class StoresDTO {
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatoria" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "El estado es obligatorio" })
  state!: string;

  @IsNumber()
  @IsNotEmpty({ message: "El stock es obligatoria" })
  stock!: number;
}