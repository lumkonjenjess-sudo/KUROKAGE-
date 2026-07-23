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


export async function trackClick(referralCode) {

  return await addDoc(
    collection(db, "referrals"),
    {
      referralCode,
      type: "click",
      createdAt: new Date()
    }
  );

}


export async function trackSale(
  referralCode,
  orderId,
  amount
) {

  return await addDoc(
    collection(db, "referrals"),
    {
      referralCode,
      type: "sale",
      orderId,
      amount,
      createdAt: new Date()
    }
  );

}


export async function getReferralStats(
  referralCode
) {

  const referralQuery = query(
    collection(db, "referrals"),
    where(
      "referralCode",
      "==",
      referralCode
    )
  );


  const snapshot =
    await getDocs(referralQuery);


  return snapshot.docs.map((doc)=>({
    id: doc.id,
    ...doc.data()
  }));

    }
