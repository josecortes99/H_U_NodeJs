import { Orders } from "../models/orders.model.ts";
import { Stores } from "../models/stores.model.ts";

export const getOrdersService = async () => {
  return await Orders.findAll();
};

export const getOrderByIdService = async (id: number) => {
  return await Orders.findByPk(id);
};

export const getOrdersByCustomerService = async (customer_id: number) => {
  try {
    const orders = await Orders.findAll({
      where: { customer_id },
    });

    return orders;
  } catch (error) {
    console.error("Error al filtrar pedidos por cliente:", error);
    throw error;
  }
};

export const getOrdersByProductService = async (product_id: number) => {
  try {
    const orders = await Orders.findAll({
      where: { product_id },
    });

    return orders;
  } catch (error) {
    console.error("Error al filtrar pedidos por productos:", error);
    throw error;
  }
};

export const createOrderService = async (
  customer_id: number,
  product_id: number,
  store_id: number,
  state: string
) => {
  try {
    // Buscar la tienda para validar el stock
    const store = await Stores.findByPk(store_id);
    if (!store) {
      throw new Error("La tienda no existe");
    }

    //  Validar stock disponible
    if (store.stock <= 0) {
      throw new Error("No hay stock disponible en esta tienda");
    }

    // Crear el pedido
    const newOrder = await Orders.create({
      customer_id,
      product_id,
      store_id,
      state,
    });

    // Reducir el inventario automáticamente
    await store.update({ stock: store.stock - 1 });

    //  Retornar pedido creado
    return newOrder;

  } catch (error) {
    console.error("Error creando pedido:", error);
  }
};

export const updateOrderService = async (
  id: number,
  updateOrder: {
    customer_id?: number;
    product_id?: number;
    store_id?: number;
    state?: string
  
  }
) => {
  const order = await Orders.findByPk(id);

  if (!order) {
    return null;
  }

  await order.update(updateOrder);
  return order;
};


export const deleteOrderService = async (id: number) => {
  const order = await Orders.findByPk(id);
  if (!order) {
    return null;
  }
  await order.destroy();
  return { menssage: "Exito al eliminar" };
};



