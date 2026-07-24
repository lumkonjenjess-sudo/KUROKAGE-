"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getMembership,
  createMembership
} from "../../../backend/database/memberships";

import {
  getBenefits
} from "../../../backend/shadow/benefits";


export default function ShadowSociety() {

  const [member, setMember] = useState(null);

  const [benefits, setBenefits] = useState([]);



  async function loadMembership() {

    const data =
      await getMembership(
        "currentUser"
      );


    let currentMember;


    if (data.length === 0) {

      await createMembership({

        userId:
          "currentUser"

      });


      const newData =
        await getMembership(
          "currentUser"
        );


      currentMember =
        newData[0];


    } else {

      currentMember =
        data[0];

    }


    setMember(
      currentMember
    );


    setBenefits(
      getBenefits(
        currentMember.tier
      )
    );

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
              Membership Tier:
              {" "}
              {member.tier}
            </p>


            <p>
              Loyalty Points:
              {" "}
              {member.points}
            </p>


            <h2>
              Member Benefits
            </h2>


            {benefits.map(
              (benefit, index) => (

                <p key={index}>
                  ✓ {benefit}
                </p>

              )

            )}


          </div>

        )}


      </section>


    </main>

  );

}
