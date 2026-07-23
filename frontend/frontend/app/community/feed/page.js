"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { getPosts } from "../../../../backend/database/communityPosts";

export default function CommunityFeed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    async function loadPosts() {
      const data = await getPosts();
      setPosts(data);
    }

    loadPosts();

  }, []);

  return (
    <main>

      <Navbar />

      <section>

        <h1>KuroKage Community Feed</h1>

        {posts.length === 0 ? (

          <p>No posts yet.</p>

        ) : (

          posts.map((post) => (

            <div key={post.id}>

              <h2>{post.title}</h2>

              <p>{post.content}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  width="300"
                />
              )}

              <p>
                Posted by: {post.author}
              </p>

            </div>

          ))

        )}

      </section>

    </main>
  );
    }
