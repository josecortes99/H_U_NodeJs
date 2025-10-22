import type { Request, Response } from "express";
import { getProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService, getProductByCodeService } from "../services/products.service.ts";
import { handleHttp } from "../utils/error.handdler.ts";
import type { HttpErrorStatus } from "../types/types.ts";

export const getProductsController = async(req: Request, res: Response) => {
    try {
        const data = await getProductsService();
        res.status(200).json(data)
    } catch (error) {
        return handleHttp(res, 'Error fetching product', 500 as HttpErrorStatus, error)
    }
}

export const getProductByIdController = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (!id) {
            return handleHttp(res, "Id no encontrado", 404 as HttpErrorStatus)
        }
        const data = await getProductByIdService(id)
        res.status(200).json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const createProductController = async(req: Request, res: Response) => {
    try {
        const { name, code, store_id } = req.body
        const data = await createProductService(name, code, store_id)
        res.status(201).json(data)
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const updateProductController = async(req:Request, res: Response) => {
    try {
        const product = Number(req.params.id)
        if (!product) {
            return handleHttp(res, "Product no encontrado", 404 as HttpErrorStatus) 
        }
        const updateProduct = req.body
        const data = await updateProductService(product, updateProduct)
        if (!data) {
      return handleHttp(res, "Product no encontrada", 404 as HttpErrorStatus);
    }
    res.status(200).json({
      ok: true,
      message: "Product actualizada correctamente",
      data,
    });
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const deleteProductController = async(req: Request, res: Response) => {
    try {
        const product = Number(req.params.id)
        if (!product) {
            return handleHttp(res, "Product no encontrado", 404 as HttpErrorStatus)
        }
        const data = await deleteProductService(product)
        if (!data) {
      return handleHttp(res, "Product no encontrada", 404 as HttpErrorStatus);
    }
    res.status(200).json({
      ok: true,
      message: "Product eliminado correctamente",
      data,
    });
    } catch (error) {
        return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error)
    }
}

export const getProductByCodeController = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    if (!code) {
      return handleHttp(res, "Código no proporcionado", 400 as HttpErrorStatus);
    }

    const data = await getProductByCodeService(code);

    if (!data) {
      return handleHttp(res, "Producto no encontrado", 404 as HttpErrorStatus);
    }

    res.status(200).json(data);
  } catch (error) {
    return handleHttp(res, "Error del servidor", 500 as HttpErrorStatus, error);
  }
};


