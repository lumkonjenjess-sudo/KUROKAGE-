import { addProduct } from "../database/products";

export function createNewProduct(product) {
  return addProduct({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image
  });
}
