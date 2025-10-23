import { Stores } from "../models/stores.model.ts";

export const getStoresService = async () => {
  return await Stores.findAll();
};

export const getStoreByIdService = async (id: number) => {
  return await Stores.findByPk(id);
};

export const createStoreService = async (
  name: string,
  state: string,
  stock: number
) => {
  try {
    const newStore = await Stores.create({
      name,
      state,
      stock
    });
    return newStore;
  } catch (error) {
    console.error("Error creating store:", error);
    throw new Error("Could not create store");
  }
};

export const updateStoreService = async (
  id: number,
  updateStore: {
    name?: string;
    state?: string;
    stock?: number;
  }
) => {
  const store = await Stores.findByPk(id);

  if (!store) {
    return null;
  }

  await store.update(updateStore);
  return store;
};


export const deleteStoreService = async (id: number) => {
  const store = await Stores.findByPk(id);
  if (!store) {
    return console.log("Store no existe");
  }
  await store.destroy();
  return { menssage: "Exito al eliminar" };
};

export const getActiveStoresService = async () => {
  try {
    const activeStores = await Stores.findAll({
      where: { state: 'activo' },
      attributes: ['id', 'name', 'state', 'stock'],
      order: [['id', 'ASC']]
    });

    return activeStores;
  } catch (error) {
    console.error("Error al obtener las bodegas activas:", error);
    throw new Error("No se pudieron obtener las bodegas activas");
  }
};