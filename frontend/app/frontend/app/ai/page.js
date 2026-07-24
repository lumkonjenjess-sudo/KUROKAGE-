"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function AIChat() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {

    setLoading(true);

    const response = await fetch("/api/ai", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message
      })

    });

    const data = await response.json();

    setReply(data.reply);

    setRecommendations(
      data.recommendations || []
    );

    setLoading(false);

  }

  return (

    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage AI Assistant
        </h1>

        <input

          placeholder="Ask KuroKage AI..."

          value={message}

          onChange={(e) =>
            setMessage(e.target.value)
          }

        />

        <button onClick={sendMessage}>

          {loading
            ? "Thinking..."
            : "Send"}

        </button>

        <h3>
          AI Response
        </h3>

        <p>
          {reply}
        </p>

        <h3>
          Recommended Products
        </h3>

        {recommendations.map((product, index) => (

          <div key={index}>

            <h4>
              {product.name}
            </h4>

            <p>
              Category: {product.category}
            </p>

            <p>
              Price: {product.price}
            </p>

            <button>
              Add to Cart
            </button>

          </div>

        ))}

      </section>

    </main>

  );

}
