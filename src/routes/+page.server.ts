import { getAllDishes } from "$lib/services/items";

export async function load() {
  let dishes = await getAllDishes();
  let products = [];
  products.push({ name: "vaisselle", list: dishes })
  return {
    products: products,
  }
}
