import { Customers } from "../models/customers.model.ts";

export const getCustomersService = async () => {
  return await Customers.findAll();
};

export const getCustomerByIdService = async (id: number) => {
  return await Customers.findByPk(id);
};

export const createCustomerService = async (
  identification: string,
  name: string,
  email: string,
  address: string
) => {
  try {
    const newCustomer = await Customers.create({
      identification,
      name,
      email,
      address
    });
    return newCustomer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Could not create customer");
  }
};

export const updateCustomerService = async (
  id: number,
  updateCustomer: {
    identification?: string 
    name?: string;
    email?: string;
    address?: string;
  }
) => {
  const customer = await Customers.findByPk(id);
  if (!customer) {
    return null;
  }
  return await customer.update(updateCustomer, { where: { id } });
};

export const deleteCustomerService = async (id: number) => {
  const customer = await Customers.findByPk(id);
  if (!customer) {
    return console.log("Customer no existe");
  }
  await customer.destroy();
  return { menssage: "Exito al eliminar" };
};

export const findCustomerByIdentificationService = async (identification: string) => {
  try {
    const customer = await Customers.findOne({ where: { identification } });
    if (!customer) {
      throw new Error("Cliente no encontrado");
    }
    return customer;
  } catch (error) {
    console.error("Error buscando cliente:", error);
    throw new Error("No se pudo buscar el cliente");
  }
};

