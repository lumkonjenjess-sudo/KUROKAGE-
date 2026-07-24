import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import app from "../firebase/firebase";


const db = getFirestore(app);



export async function addProduct(product) {

  return await addDoc(
    collection(db, "products"),
    product
  );

}



export async function getProducts() {

  const snapshot =
    await getDocs(
      collection(db, "products")
    );


  return snapshot.docs.map(doc => ({

    id:
      doc.id,

    ...doc.data()

  }));

}



export async function searchProducts(
  searchTerm
) {

  const products =
    await getProducts();


  const query =
    searchTerm.toLowerCase();


  return products.filter(product =>

    product.name
      ?.toLowerCase()
      .includes(query)

    ||

    product.category
      ?.toLowerCase()
      .includes(query)

    ||

    product.description
      ?.toLowerCase()
      .includes(query)

  );

}
