import {
  searchProducts
} from "../database/products";


export async function recommendProducts(
  message
) {

  const products =
    await searchProducts(
      message
    );


  if (products.length > 0) {

    return products.slice(
      0,
      5
    );

  }


  return [

    {

      name:
        "KuroKage Featured Collection",

      category:
        "Featured",

      price:
        "Browse Store"

    }

  ];

}
