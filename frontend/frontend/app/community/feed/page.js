"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import { getPosts } from "../../../../backend/database/communityPosts";
import { likePost, getPostLikes } from "../../../../backend/database/communityLikes";

import {
  createComment,
  getComments
} from "../../../../backend/database/communityComments";


export default function CommunityFeed() {

  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});


  async function loadPosts() {

    const data = await getPosts();

    const likeCounts = {};
    const postComments = {};


    for (const post of data) {

      likeCounts[post.id] =
        await getPostLikes(post.id);


      postComments[post.id] =
        await getComments(post.id);

    }


    setPosts(data);
    setLikes(likeCounts);
    setComments(postComments);

  }


  useEffect(() => {

    loadPosts();

  }, []);



  async function handleLike(postId) {

    await likePost(
      postId,
      "demo@kurokage.com"
    );

    loadPosts();

  }



  async function addComment(postId) {

    await createComment({

      postId,

      text: commentText[postId],

      author: "KuroKage User"

    });


    setCommentText({
      ...commentText,
      [postId]: ""
    });


    loadPosts();

  }



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Community Feed
        </h1>


        {posts.map((post) => (

          <div key={post.id}>


            <h2>
              {post.title}
            </h2>


            <p>
              {post.content}
            </p>


            <p>
              Posted by: {post.author}
            </p>


            <button
              onClick={() =>
                handleLike(post.id)
              }
            >
              ❤️ Like
            </button>


            <p>
              Likes: {likes[post.id] || 0}
            </p>



            <h3>
              Comments
            </h3>


            {comments[post.id]?.map((comment)=>(

              <p key={comment.id}>
                {comment.author}: {comment.text}
              </p>

            ))}



            <input

              placeholder="Write a comment..."

              value={
                commentText[post.id] || ""
              }

              onChange={(e)=>

                setCommentText({

                  ...commentText,

                  [post.id]: e.target.value

                })

              }

            />


            <button
              onClick={() =>
                addComment(post.id)
              }
            >
              Comment
            </button>


          </div>

        ))}


      </section>

    </main>

  );

                }
