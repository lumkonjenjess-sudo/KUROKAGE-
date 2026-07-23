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


const auth = getAuth(app);


export default function Profile() {

  const [profile, setProfile] = useState(null);


  useEffect(() => {

    onAuthStateChanged(
      auth,
      async (user) => {

        if (user) {

          let data =
            await getProfile(user.uid);


          if (!data) {

            await createProfile(
              user.uid,
              {
                username: user.email,
                bio: "KuroKage creator"
              }
            );


            data =
              await getProfile(user.uid);

          }


          setProfile(data);

        }

      }
    );

  }, []);



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
              Followers: {profile.followers}
            </p>


            <p>
              Following: {profile.following}
            </p>


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
