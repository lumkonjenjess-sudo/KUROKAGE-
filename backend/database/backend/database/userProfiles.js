import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

import app from "../firebase/firebase";


const db = getFirestore(app);


export async function createProfile(userId, profile) {

  return await setDoc(
    doc(db, "profiles", userId),
    {
      ...profile,
      followers: 0,
      following: 0,
      createdAt: new Date()
    }
  );

}


export async function getProfile(userId) {

  const profile = await getDoc(
    doc(db, "profiles", userId)
  );


  return profile.data();

}
