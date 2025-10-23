import type { Request, Response } from "express";
import { getOrdersService, getOrderByIdService, createOrderService, updateOrderService, deleteOrderService } from "../services/orders.service.ts";
import { handleHttp } from "../utils/error.handdler.ts";
import type { HttpErrorStatus } from "../types/types.ts";
import type { OrdersDTO } from "../dtos/orders.dto.ts";


export const getOrdersController = async(req: Request, res: Response) => {
    try {
        const data = await getOrdersService();
        res.status(200).json(data)
    } catch (error) {
        return handleHttp(res, 'Error fetching order', 500 as HttpErrorStatus, error)
    }
}

export const getOrderByIdController = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (!id) {
            return handleHttp(res, "Id no encontrado", 404 as HttpErrorStatus)
        }
        const data = await getOrderByIdService(id)
        res.status(200).json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const body = req.body as OrdersDTO;
    const { customer_id, product_id, store_id, state } = body;

    const data = await createOrderService(customer_id, product_id, store_id, state);

    res.status(201).json({
      ok: true,
      message: "Pedido registrado correctamente",
      data,
    });

  } catch (error: any) {
    return handleHttp(res, error.message || "Error al registrar pedido", 400 as HttpErrorStatus);
  }
};


export const updateOrderController = async(req:Request, res: Response) => {
    try {
        const order = Number(req.params.id)
        if (!order) {
            return handleHttp(res, "Product no encontrado", 404 as HttpErrorStatus) 
        }
        const updateOrder = req.body
        const data = await updateOrderService(order, updateOrder)
        if (!data) {
      return handleHttp(res, "Order no encontrada", 404 as HttpErrorStatus);
    }
    res.status(200).json({
      ok: true,
      message: "Order actualizada correctamente",
      data,
    });
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const deleteOrderController = async(req: Request, res: Response) => {
    try {
        const order = Number(req.params.id)
        if (!order) {
            return handleHttp(res, "Order no encontrado", 404 as HttpErrorStatus)
        }
        const data = await deleteOrderService(order)
        if (!data) {
      return handleHttp(res, "Order no encontrada", 404 as HttpErrorStatus);
    }
    res.status(200).json({
      ok: true,
      message: "Order eliminado correctamente",
      data,
    });
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}


