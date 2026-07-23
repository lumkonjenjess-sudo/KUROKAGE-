import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";

import app from "../firebase/firebase";


const db = getFirestore(app);


export async function sendMessage(message) {

  return await addDoc(
    collection(db, "messages"),
    {
      ...message,
      createdAt: new Date()
    }
  );

}


export async function getMessages(
  userOne,
  userTwo
) {

  const messagesQuery = query(
    collection(db, "messages"),
    where(
      "participants",
      "array-contains",
      userOne
    ),
    orderBy(
      "createdAt",
      "asc"
    )
  );


  const snapshot =
    await getDocs(messagesQuery);


  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter((message) =>
      message.participants.includes(userTwo)
    );

}
