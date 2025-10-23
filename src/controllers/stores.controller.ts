import type { Request, Response } from "express";
import { getStoresService, getStoreByIdService, createStoreService, updateStoreService, deleteStoreService, getActiveStoresService } from "../services/stores.service.ts";
import { handleHttp } from "../utils/error.handdler.ts";
import type { HttpErrorStatus } from "../types/types.ts";
import type { StoresDTO } from "../dtos/stores.dto.ts";

export const getStoresController = async(req: Request, res: Response) => {
    try {
        const data = await getStoresService();
        res.status(200).json(data)
    } catch (error) {
        return handleHttp(res, 'Error fetching customer', 500 as HttpErrorStatus, error)
    }
}

export const getStoreByIdController = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (!id) {
            return handleHttp(res, "Id no encontrado", 404 as HttpErrorStatus)
        }
        const data = await getStoreByIdService(id)
        res.status(200).json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const createStoreController = async(req: Request, res: Response) => {
    try {
        const body = req.body as StoresDTO;
        const { name, state, stock } = body
        const data = await createStoreService(name, state, stock)
        res.status(201).json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const updateStoreController = async(req:Request, res: Response) => {
    try {
        const store = Number(req.params.id)
        if (!store) {
            return handleHttp(res, "Store no encontrado", 404 as HttpErrorStatus) 
        }
        const updateStore = req.body
        const data = await updateStoreService(store, updateStore)
        if (!data) {
      return handleHttp(res, "Store no encontrada", 404 as HttpErrorStatus);
    }
    res.status(200).json({
      ok: true,
      message: "Store actualizada correctamente",
      data,
    });
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const deleteStoreController = async(req: Request, res: Response) => {
    try {
        const store = Number(req.params.id)
        if (!store) {
            return handleHttp(res, "Store no encontrado", 404 as HttpErrorStatus)
        }
        const data = await deleteStoreService(store)
        res.json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const getActiveStoresController = async (req: Request, res: Response) => {
  try {
    const data = await getActiveStoresService();

    if (!data || data.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No hay bodegas activas registradas"
      });
    }

    res.status(200).json({
      ok: true,
      message: "Listado de bodegas activas obtenido correctamente",
      data
    });
  } catch (error) {
    return handleHttp(res, "Error al obtener bodegas activas", 500 as HttpErrorStatus, error);
  }
};

