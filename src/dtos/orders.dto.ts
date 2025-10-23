import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class OrdersDTO {
  @IsNumber()
  @IsNotEmpty({ message: "La id del cliente es obligatoria" })
  @Length(5, 20, { message: "El id  debe tener entre 5 y 20 caracteres" })
  customer_id!: number;

  @IsNumber()
  @IsNotEmpty({ message: "El id del producto es obligatorio" })
  product_id!: number;

  @IsNumber()
  @IsNotEmpty({ message: "El id de la bodega es obligatorio" })
  store_id!: number;

  @IsString()
  @IsNotEmpty({ message: "La dirección es obligatoria" })
  state!: string;
}