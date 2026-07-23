import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

import app from "../firebase/firebase";


const db = getFirestore(app);


export async function createAffiliate(affiliate) {

  return await addDoc(
    collection(db, "affiliates"),
    {
      ...affiliate,
      clicks: 0,
      sales: 0,
      commissions: 0,
      createdAt: new Date()
    }
  );

}


export async function getAffiliate(userId) {

  const affiliateQuery = query(
    collection(db, "affiliates"),
    where(
      "userId",
      "==",
      userId
    )
  );


  const snapshot =
    await getDocs(affiliateQuery);


  return snapshot.docs.map((doc)=>({
    id: doc.id,
    ...doc.data()
  }));

      }
