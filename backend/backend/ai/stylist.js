import {
  getProducts
} from "../database/products";


export async function createOutfit(
  style
) {

  const products =
    await getProducts();


  const search =
    style.toLowerCase();


  let outfit =
    products.filter(product =>

      product.name
        ?.toLowerCase()
        .includes(search)

      ||

      product.category
        ?.toLowerCase()
        .includes(search)

      ||

      product.description
        ?.toLowerCase()
        .includes(search)

    );


  if (outfit.length === 0) {

    outfit =
      products.slice(0, 4);

  }


  return {

    style,

    outfit:
      outfit.slice(0, 4)

  };

}
