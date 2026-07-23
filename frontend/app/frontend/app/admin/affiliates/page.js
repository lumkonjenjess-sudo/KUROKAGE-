"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getAllAffiliates
} from "../../../../backend/admin/affiliates";


export default function AdminAffiliates() {

  const [affiliates, setAffiliates] = useState([]);


  async function loadAffiliates() {

    const data =
      await getAllAffiliates();

    setAffiliates(data);

  }


  useEffect(() => {

    loadAffiliates();

  }, []);



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Affiliate Management
        </h1>


        {affiliates.length === 0 ? (

          <p>
            No affiliates found.
          </p>

        ) : (

          affiliates.map((affiliate)=>(

            <div key={affiliate.id}>

              <h3>
                {affiliate.userId}
              </h3>


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
                Commission:
                $
                {affiliate.commissions}
              </p>


            </div>

          ))

        )}


      </section>

    </main>

  );

          }
