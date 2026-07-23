import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

import app from "../firebase/firebase";

const db = getFirestore(app);

export async function createPost(post) {
  return await addDoc(
    collection(db, "communityPosts"),
    {
      ...post,
      createdAt: new Date()
    }
  );
}

export async function getPosts() {
  const postsQuery = query(
    collection(db, "communityPosts"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}
