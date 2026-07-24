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

export async function createMembership(member) {

  return await addDoc(
    collection(db, "memberships"),
    {
      ...member,
      points: 0,
      tier: "Shadow",
      createdAt: new Date()
    }
  );

}

export async function getMembership(userId) {

  const membershipQuery = query(
    collection(db, "memberships"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(membershipQuery);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}
