import React, { useState, useEffect } from "react";

import reply from "./images/icon-reply.svg";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";

const Post = ({ comment }) => {
  const { id, content, createdAt, score, user, replies } = comment;
  const { image, username } = user;
  const { png, webp } = image;

  const [upvotes, setUpvotes] = useState(score);

  const addVote = () => {
    let updatedVote = upvotes + 1;
    setUpvotes(updatedVote);
  };

  const downVote = () => {
    let updatedVote = upvotes - 1;
    setUpvotes(updatedVote);
  };

  return (
    <>
      <article key={id} className='bg-white m-4 rounded-lg p-4 '>
        <div>
          <img src={webp} alt={`${username} profile`} />
          <h6>{username}</h6>
          <p>{createdAt}</p>
        </div>
        <p className='text-dark-blue'>{content}</p>
        <div>
          <button onClick={() => addVote()}>
            <img src={plus} alt='' />
          </button>
          {upvotes}
          <button onClick={() => downVote()}>
            <img src={minus} alt='' />
          </button>
        </div>
        <button>
          <img src={reply} alt='Reply to this comment' />
          Reply
        </button>
      </article>
      {replies &&
        replies.map((reply, index) => {
          return (
            <div className='border-light-gray border-l-2 ml-4' key={index}>
              <Post comment={reply} />
            </div>
          );
        })}
    </>
  );
};

export default Post;
