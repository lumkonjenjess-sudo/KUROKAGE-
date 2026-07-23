"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";

import {
  getProfile,
  createProfile
} from "../../../backend/database/userProfiles";

import {
  getFollowers,
  getFollowing,
  followUser
} from "../../../backend/database/follows";


const auth = getAuth(app);


export default function Profile() {

  const [profile, setProfile] = useState(null);

  const [userId, setUserId] = useState(null);

  const [followers, setFollowers] = useState(0);

  const [following, setFollowing] = useState(0);



  async function loadProfile(uid) {

    let data =
      await getProfile(uid);


    if (!data) {

      await createProfile(
        uid,
        {
          username: "KuroKage User",
          bio: "Anime streetwear creator"
        }
      );


      data =
        await getProfile(uid);

    }


    setProfile(data);


    setFollowers(
      await getFollowers(uid)
    );


    setFollowing(
      await getFollowing(uid)
    );

  }



  useEffect(() => {

    onAuthStateChanged(
      auth,
      (user) => {

        if (user) {

          setUserId(user.uid);

          loadProfile(user.uid);

        }

      }
    );

  }, []);



  async function follow() {

    await followUser(
      "currentUser",
      userId
    );


    setFollowers(
      followers + 1
    );

  }



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Profile
        </h1>


        {profile ? (

          <div>

            <h2>
              {profile.username}
            </h2>


            <p>
              {profile.bio}
            </p>


            <p>
              Followers: {followers}
            </p>


            <p>
              Following: {following}
            </p>


            <button onClick={follow}>
              Follow
            </button>


          </div>

        ) : (

          <p>
            Login to view profile.
          </p>

        )}


      </section>

    </main>

  );

}
