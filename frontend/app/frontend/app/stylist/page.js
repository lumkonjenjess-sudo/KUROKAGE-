"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

import {
  createOutfit
} from "../../../backend/ai/stylist";

export default function Stylist() {

  const [style, setStyle] = useState("");
  const [outfit, setOutfit] = useState([]);

  async function generateOutfit() {

    const result =
      await createOutfit(style);

    setOutfit(
      result.outfit
    );

  }

  return (

    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage AI Personal Stylist
        </h1>

        <input
          placeholder="Describe your style..."
          value={style}
          onChange={(e) =>
            setStyle(e.target.value)
          }
        />

        <button
          onClick={generateOutfit}
        >
          Create Outfit
        </button>

        {outfit.map((product) => (

          <div key={product.id}>

            <h3>
              {product.name}
            </h3>

            <p>
              {product.category}
            </p>

            <p>
              £{product.price}
            </p>

          </div>

        ))}

      </section>

    </main>

  );

}
