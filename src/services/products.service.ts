import { Products } from "../models/products.model.ts";

export const getProductsService = async () => {
  return await Products.findAll();
};

export const getProductByIdService = async (id: number) => {
  return await Products.findByPk(id);
};

export const createProductService = async (
  name: string,
  code: string,
  store_id: number
) => {
  try {
    const newProduct = await Products.create({
      name,
      code,
      store_id
    });
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Could not create product");
  }
};

export const updateProductService = async (
  id: number,
  updateProduct: {
    name?: string;
    code?: string;
    store_id?: number;
  }
) => {
  const product = await Products.findByPk(id);

  if (!product) {
    return null;
  }

  await product.update(updateProduct);
  return product;
};


export const deleteProductService = async (id: number) => {
  const product = await Products.findByPk(id);
  if (!product) {
    return null;
  }
  await product.destroy();
  return { menssage: "Exito al eliminar" };
};

export const getProductByCodeService = async (code: string) => {
  try {
    const product = await Products.findOne({ where: { code } });
    return product;
  } catch (error) {
    console.error("Error fetching product by code:", error);
    throw new Error("Could not fetch product by code");
  }
};

