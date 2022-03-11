import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
        // to select who the message is from
      <p className={msg.from === user1 ? "me" : "friend"}>
        {/* {msg.media ? <img src={msg.media} alt={msg.text} /> : null} */}
        {msg.text}
        <br />
        <small>
            // shows when message was sent
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};
