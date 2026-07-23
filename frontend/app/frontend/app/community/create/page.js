"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { createPost } from "../../../../backend/database/communityPosts";

export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  async function publishPost() {

    await createPost({
      title,
      content,
      image,
      author: "KuroKage User"
    });

    alert("Post published successfully");
  }

  return (
    <main>

      <Navbar />

      <section>

        <h1>Create Community Post</h1>

        <input
          placeholder="Post title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="What's happening?"
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="Image URL (optional)"
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={publishPost}>
          Publish Post
        </button>

      </section>

    </main>
  );
    }
