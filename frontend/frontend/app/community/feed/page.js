"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { getPosts } from "../../../../backend/database/communityPosts";
import { likePost, getPostLikes } from "../../../../backend/database/communityLikes";

export default function CommunityFeed() {

  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});

  async function loadPosts() {

    const data = await getPosts();

    const likeCounts = {};

    for (const post of data) {
      likeCounts[post.id] = await getPostLikes(post.id);
    }

    setLikes(likeCounts);
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleLike(postId) {

    await likePost(
      postId,
      "demo@kurokage.com"
    );

    const count = await getPostLikes(postId);

    setLikes((current) => ({
      ...current,
      [postId]: count
    }));
  }

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

              <p>Posted by: {post.author}</p>

              <button
                onClick={() => handleLike(post.id)}
              >
                ❤️ Like
              </button>

              <p>
                Likes: {likes[post.id] || 0}
              </p>

            </div>

          ))

        )}

      </section>

    </main>
  );
}
