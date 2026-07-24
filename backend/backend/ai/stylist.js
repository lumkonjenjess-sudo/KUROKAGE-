import {
  getProducts
} from "../database/products";


export async function createOutfit(
  style
) {

  const products =
    await getProducts();


  const outfit =
    products
      .filter(product =>

        product.category ||
        product.name

      )
      .slice(0, 4);


  return {

    style,

    outfit

  };

}
