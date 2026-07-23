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


export async function followUser(
  followerId,
  followingId
) {

  return await addDoc(
    collection(db, "follows"),
    {
      followerId,
      followingId,
      createdAt: new Date()
    }
  );

}


export async function getFollowers(userId) {

  const followersQuery = query(
    collection(db, "follows"),
    where(
      "followingId",
      "==",
      userId
    )
  );


  const snapshot = await getDocs(
    followersQuery
  );


  return snapshot.size;

}


export async function getFollowing(userId) {

  const followingQuery = query(
    collection(db, "follows"),
    where(
      "followerId",
      "==",
      userId
    )
  );


  const snapshot = await getDocs(
    followingQuery
  );


  return snapshot.size;

}
