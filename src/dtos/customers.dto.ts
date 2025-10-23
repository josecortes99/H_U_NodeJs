import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CustomersDTO {
  @IsString()
  @IsNotEmpty({ message: "La identificación es obligatoria" })
  @Length(5, 20, { message: "La identificación debe tener entre 5 y 20 caracteres" })
  identification!: string;

  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  name!: string;

  @IsEmail({}, { message: "Debe proporcionar un correo electrónico válido" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "La dirección es obligatoria" })
  address!: string;
}
