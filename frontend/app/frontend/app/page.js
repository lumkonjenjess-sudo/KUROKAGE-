"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { saveReferralCode } from "../../backend/affiliate/referralTracker";

export default function Home() {

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );


    const referral =
      params.get("ref");


    if (referral) {

      saveReferralCode(referral);

    }

  }, []);


  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage
        </h1>


        <h2>
          Wear the Shadow
        </h2>


        <p>
          Premium anime-inspired streetwear built for creators, gamers, and the shadow community.
        </p>


        <button>
          Shop Collection
        </button>


        <button>
          Join Community
        </button>


      </section>


    </main>

  );

}
