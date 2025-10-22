import type { Request, Response } from "express";
import { getCustomersService, getCustomerByIdService, createCustomerService, updateCustomerService, deleteCustomerService, findCustomerByIdentificationService } from "../services/customers.service.ts";
import { handleHttp } from "../utils/error.handdler.ts";
import type { HttpErrorStatus } from "../types/types.ts";

export const getCustomersController = async(req: Request, res: Response) => {
    try {
        const data = await getCustomersService();
        res.status(200).json(data)
    } catch (error) {
        return handleHttp(res, 'Error fetching customer', 500 as HttpErrorStatus, error)
    }
}

export const getCustomerByIdController = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (!id) {
            return handleHttp(res, "Id no encontrado", 404 as HttpErrorStatus)
        }
        const data = await getCustomerByIdService(id)
        if (!data) {
      return handleHttp(res, "Customer no encontrada", 404 as HttpErrorStatus);
    } 
        res.status(200).json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const createCustomerController = async(req: Request, res: Response) => {
    try {
        const { identification, name, email, address } = req.body
        const data = await createCustomerService(identification, name, email, address)
        res.status(201).json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const updateCustomerController = async(req:Request, res: Response) => {
    try {
        const customer = Number(req.params.id)
        if (!customer) {
            return handleHttp(res, "Customer no encontrado", 404 as HttpErrorStatus) 
        }
        const updateCustomer = req.body
        const data = await updateCustomerService(customer, updateCustomer)
        if (!data) {
      return handleHttp(res, "Customer no encontrada", 404 as HttpErrorStatus);
    }
    res.status(200).json({
      ok: true,
      message: "Customer actualizada correctamente",
      data,
    });
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const deleteCustomerController = async(req: Request, res: Response) => {
    try {
        const customer = Number(req.params.id)
        if (!customer) {
            return handleHttp(res, "Customer no encontrado", 404 as HttpErrorStatus)
        }
        const data = await deleteCustomerService(customer)
        res.json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const findCustomerByIdentificationController = async (req: Request, res: Response) => {
  try {
    const { identification } = req.body;

    if (!identification) {
      return handleHttp(res, "Debe proporcionar una identificación", 400 as HttpErrorStatus);
    }

    const data = await findCustomerByIdentificationService(identification);

    res.status(200).json({
      ok: true,
      message: "Cliente encontrado exitosamente",
      data,
    });
  } catch (error) {
    return handleHttp(res, "Error al buscar cliente", 500 as HttpErrorStatus, error);
  }
};
