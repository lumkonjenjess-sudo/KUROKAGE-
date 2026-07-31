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
  createProfile,
  updateProfile
} from "../../../backend/database/userProfiles";

import {
  getFollowers,
  getFollowing,
  followUser
} from "../../../backend/database/follows";

const auth = getAuth(app);

export default function Profile() {

  const [firebaseUser, setFirebaseUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [username, setUsername] = useState("");

  const [bio, setBio] = useState("");

  const [followers, setFollowers] = useState(0);

  const [following, setFollowing] = useState(0);

  async function loadProfile(uid) {

    let data = await getProfile(uid);

    if (!data) {

      await createProfile(uid, {

        username: "KuroKage User",

        bio: "Anime streetwear creator"

      });

      data = await getProfile(uid);

    }

    setProfile(data);

    setUsername(data.username);

    setBio(data.bio);

    setFollowers(
      await getFollowers(uid)
    );

    setFollowing(
      await getFollowing(uid)
    );

  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(

      auth,

      async (user) => {

        if (user) {

          setFirebaseUser(user);

          await loadProfile(user.uid);

        }

      }

    );

    return unsubscribe;

  }, []);

  async function saveProfile() {

    if (!firebaseUser) return;

    await updateProfile(

      firebaseUser.uid,

      {

        username,

        bio

      }

    );

    alert("Profile updated successfully.");

  }

  async function follow() {

    if (!firebaseUser) return;

    await followUser(

      "currentUser",

      firebaseUser.uid

    );

    setFollowers(followers + 1);

  }

  return (

    <main>

      <Navbar />

      <section>

        <h1>

          KuroKage Profile

        </h1>

        {firebaseUser && profile ? (

          <div>

            <div>

              <img

                src="/profile-placeholder.png"

                alt="Profile"

                width={120}

                height={120}

              />

            </div>

            <p>

              <strong>Email:</strong>{" "}

              {firebaseUser.email}

            </p>

            <p>

              <strong>User ID:</strong>{" "}

              {firebaseUser.uid}

            </p>

            <p>

              <strong>Account Created:</strong>{" "}

              {new Date(
                firebaseUser.metadata.creationTime
              ).toLocaleString()}

            </p>

            <p>

              <strong>Last Login:</strong>{" "}

              {new Date(
                firebaseUser.metadata.lastSignInTime
              ).toLocaleString()}

            </p>

            <h3>

              Username

            </h3>

            <input

              value={username}

              onChange={(e)=>

                setUsername(e.target.value)

              }

            />

            <h3>

              Bio

            </h3>

            <textarea

              value={bio}

              onChange={(e)=>

                setBio(e.target.value)

              }

            />

            <button onClick={saveProfile}>

              Save Profile

            </button>

            <hr />

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

            Login to view your profile.

          </p>

        )}

      </section>

    </main>

  );

}
