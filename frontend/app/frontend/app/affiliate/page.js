"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAffiliate,
  createAffiliate
} from "../../../backend/database/affiliates";

import {
  calculateCommission
} from "../../../backend/affiliate/commission";


export default function AffiliateDashboard() {

  const [affiliate, setAffiliate] = useState(null);

  const [estimatedCommission, setEstimatedCommission] = useState(0);


  async function loadAffiliate() {

    const data =
      await getAffiliate(
        "currentUser"
      );


    let affiliateData;


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


      affiliateData =
        newData[0];


    } else {

      affiliateData =
        data[0];

    }


    setAffiliate(
      affiliateData
    );


    setEstimatedCommission(

      calculateCommission(
        affiliateData.sales || 0
      )

    );

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
              {" "}
              {affiliate.referralCode}
            </p>


            <p>
              Clicks:
              {" "}
              {affiliate.clicks}
            </p>


            <p>
              Sales:
              {" "}
              {affiliate.sales}
            </p>


            <p>
              Total Commission:
              $
              {affiliate.commissions || 0}
            </p>


            <p>
              Estimated Next Commission:
              $
              {estimatedCommission}
            </p>


          </div>

        )}


      </section>


    </main>

  );

}
