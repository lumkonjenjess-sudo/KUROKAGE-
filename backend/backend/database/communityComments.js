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


export async function createComment(comment) {

  return await addDoc(
    collection(db, "communityComments"),
    {
      ...comment,
      createdAt: new Date()
    }
  );

}


export async function getComments(postId) {

  const commentsQuery = query(
    collection(db, "communityComments"),
    where(
      "postId",
      "==",
      postId
    ),
    orderBy(
      "createdAt",
      "desc"
    )
  );


  const snapshot = await getDocs(
    commentsQuery
  );


  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

}
