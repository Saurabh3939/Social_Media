import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, likePost, deletePost } from "../api";

import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const getPosts = async () => {
    try {
      const { data } = await fetchPosts();
      setPosts(Array.isArray(data) ? data : data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      getPosts();
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      await createPost(formData);
      setText("");
      setImage(null);
      getPosts();
      alert("Post Created");
    } catch (error) {
      alert("Failed To Create Post");
    }
  };

  const handleLike = async (id) => {
    try {
      await likePost(id);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='home-container'>
      {user && (
        <div className='create-post-card'>
          <h3>Create A Post</h3>

          <form onSubmit={handlePostSubmit}>
            <textarea
              placeholder="What's on your mind"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button type='submit' className='post-btn'>
              Post
            </button>
          </form>
        </div>
      )}

      <div className='feed-container'>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className='post-card'>
              <div className='post-header'>
                <span className='post-author'>@{post.username}</span>
                <span className='post-date'>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                {user?.id === post.user && (
                  <button
                    className='delete-btn'
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete Post
                  </button>
                )}
              </div>
              <p className='post-text'>{post.text}</p>
              {post.image && (
                <img src={post.image} alt='Post' className='post-image' />
              )}

              <div className='post-actions'>
                <button
                  onClick={() => handleLike(post._id)}
                  className='like-btn'
                >
                  {post.likes ? post.likes.length : 0} Likes
                </button>
                <button className='comment-btn'>
                  {post.comments ? post.comments.length : 0} Comments
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Posts To Display</p>
        )}
      </div>
    </div>
  );
};

export default Home;
