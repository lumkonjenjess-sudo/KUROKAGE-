"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getGroups,
  joinGroup
} from "../../../backend/database/groups";


export default function Groups() {

  const [groups, setGroups] = useState([]);


  async function loadGroups() {

    const data =
      await getGroups();

    setGroups(data);

  }


  useEffect(() => {

    loadGroups();

  }, []);



  async function join(id) {

    await joinGroup(
      id,
      "currentUser"
    );

    alert(
      "Joined group"
    );

  }



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Community Rooms
        </h1>


        {groups.length === 0 ? (

          <p>
            No groups available.
          </p>

        ) : (

          groups.map((group)=>(

            <div key={group.id}>

              <h2>
                {group.name}
              </h2>


              <p>
                {group.description}
              </p>


              <button
                onClick={() =>
                  join(group.id)
                }
              >
                Join Group
              </button>


            </div>

          ))

        )}


      </section>

    </main>

  );

}
