import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import Post from "../post/Post";
import Share from "../share/Share";

import "./feed.css";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchUser = async () => {
    const res = username
      ? await axios.get(`/posts/profile/${username}`)
      : await axios.get(`/posts/timeline/619c8a883bcd4ca3d51fd85c`);
    setPosts(
      res.data.sort((p1, p2) => {
        console.log(p1, p2);
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchUser();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
