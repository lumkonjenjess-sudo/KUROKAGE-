"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAffiliate,
  createAffiliate
} from "../../../backend/database/affiliates";


export default function AffiliateDashboard() {

  const [affiliate, setAffiliate] = useState(null);


  async function loadAffiliate() {

    const data =
      await getAffiliate(
        "currentUser"
      );


    if (data.length === 0) {

      await createAffiliate({

        userId:
          "currentUser",

        referralCode:
          "KUROKAGE001"

      });


      const newData =
        await getAffiliate(
          "currentUser"
        );


      setAffiliate(
        newData[0]
      );


    } else {

      setAffiliate(
        data[0]
      );

    }

  }


  useEffect(() => {

    loadAffiliate();

  }, []);



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Affiliate Dashboard
        </h1>


        {affiliate && (

          <div>

            <p>
              Referral Code:
              {affiliate.referralCode}
            </p>


            <p>
              Clicks:
              {affiliate.clicks}
            </p>


            <p>
              Sales:
              {affiliate.sales}
            </p>


            <p>
              Commission:
              ${affiliate.commissions}
            </p>


          </div>

        )}


      </section>

    </main>

  );

  }
