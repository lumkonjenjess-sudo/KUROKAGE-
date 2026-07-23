import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

import app from "../firebase/firebase";


const db = getFirestore(app);


export async function getAllAffiliates() {

  const affiliatesQuery =
    query(
      collection(db, "affiliates"),
      orderBy(
        "createdAt",
        "desc"
      )
    );


  const snapshot =
    await getDocs(
      affiliatesQuery
    );


  return snapshot.docs.map((doc)=>({

    id: doc.id,

    ...doc.data()

  }));

}
