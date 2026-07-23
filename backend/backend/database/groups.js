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


export async function createGroup(group) {

  return await addDoc(
    collection(db, "groups"),
    {
      ...group,
      createdAt: new Date()
    }
  );

}


export async function getGroups() {

  const snapshot =
    await getDocs(
      collection(db, "groups")
    );


  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

}


export async function joinGroup(
  groupId,
  userId
) {

  return await addDoc(
    collection(db, "groupMembers"),
    {
      groupId,
      userId,
      joinedAt: new Date()
    }
  );

}
