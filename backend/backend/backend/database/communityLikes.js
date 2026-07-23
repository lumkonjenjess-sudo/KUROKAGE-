import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";

import app from "../firebase/firebase";

const db = getFirestore(app);

export async function likePost(postId, userEmail) {
  return await addDoc(
    collection(db, "communityLikes"),
    {
      postId,
      userEmail,
      createdAt: new Date()
    }
  );
}

export async function getPostLikes(postId) {
  const likesQuery = query(
    collection(db, "communityLikes"),
    where("postId", "==", postId)
  );

  const snapshot = await getDocs(likesQuery);

  return snapshot.size;
}
