"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getMembership,
  createMembership
} from "../../../backend/database/memberships";

export default function ShadowSociety() {

  const [member, setMember] = useState(null);

  async function loadMembership() {

    const data = await getMembership(
      "currentUser"
    );

    if (data.length === 0) {

      await createMembership({

        userId: "currentUser"

      });

      const newData =
        await getMembership(
          "currentUser"
        );

      setMember(newData[0]);

    } else {

      setMember(data[0]);

    }

  }

  useEffect(() => {

    loadMembership();

  }, []);

  return (

    <main>

      <Navbar />

      <section>

        <h1>
          Shadow Society
        </h1>

        {member && (

          <div>

            <p>
              Membership Tier: {member.tier}
            </p>

            <p>
              Loyalty Points: {member.points}
            </p>

            <p>
              Welcome to the exclusive KuroKage community.
            </p>

          </div>

        )}

      </section>

    </main>

  );

}
