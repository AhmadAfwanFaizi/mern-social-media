import React, { useEffect, useState } from "react";
import axios from "axios";

import "./conversation.css";

function Conversation({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  const friendId = () => {
    return conversation.members.find((member) => member !== currentUser._id);
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`/users?userId=${friendId()}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/no_avatar.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversation;
