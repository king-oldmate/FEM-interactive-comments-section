import React, { useState, useEffect } from "react";

import reply from "./images/icon-reply.svg";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";

import Reply from "./Reply";

const Post = ({ comment, currentUsername, currentUserImage }) => {
  const { id, content, createdAt, score, user, replies } = comment;
  const { image, username } = user;
  const { png, webp } = image;

  const [votes, setVotes] = useState(score);
  const [voteRecord, setVoteRecord] = useState({
    up: [],
    down: [],
  });

  const addVote = () => {
    if (
      voteRecord["up"].indexOf(currentUsername) === -1 &&
      voteRecord["down"].indexOf(currentUsername) === -1
    ) {
      let updatedVote = votes + 1;
      setVotes(updatedVote);
      setVoteRecord({
        up: [...voteRecord["up"], currentUsername],
        down: [...voteRecord["down"]],
      });
    } else if (
      voteRecord["up"].indexOf(currentUsername) === -1 &&
      voteRecord["down"].indexOf(currentUsername) > -1
    ) {
      let newDownVoteRecord = voteRecord["down"].filter(
        (name) => name !== currentUsername
      );
      let updatedVote = votes + 1;
      setVotes(updatedVote);
      setVoteRecord({
        up: [...voteRecord["up"], currentUsername],
        down: [...newDownVoteRecord],
      });
    } else if (voteRecord["up"].indexOf(currentUsername) > -1) {
      let updatedVote = votes - 1;
      setVotes(updatedVote);
      let newUpVoteRecord = voteRecord["up"].filter(
        (name) => name !== currentUsername
      );
      setVoteRecord({
        up: [...newUpVoteRecord],
        down: [...voteRecord["down"]],
      });
    }
  };

  const downVote = () => {
    if (
      voteRecord["up"].indexOf(currentUsername) === -1 &&
      voteRecord["down"].indexOf(currentUsername) === -1
    ) {
      let updatedVote = votes - 1;
      setVotes(updatedVote);
      setVoteRecord({
        up: [...voteRecord["up"]],
        down: [...voteRecord["down"], currentUsername],
      });
    } else if (
      voteRecord["up"].indexOf(currentUsername) > -1 &&
      voteRecord["down"].indexOf(currentUsername) === -1
    ) {
      let newUpVoteRecord = voteRecord["up"].filter(
        (name) => name !== currentUsername
      );
      let updatedVote = votes - 1;
      setVotes(updatedVote);
      setVoteRecord({
        up: [...newUpVoteRecord],
        down: [...voteRecord["down"], currentUsername],
      });
    } else if (voteRecord["down"].indexOf(currentUsername) > -1) {
      let updatedVote = votes + 1;
      setVotes(updatedVote);
      let newDownVoteRecord = voteRecord["down"].filter(
        (name) => name !== currentUsername
      );
      setVoteRecord({
        up: [...voteRecord["up"]],
        down: [...newDownVoteRecord],
      });
    }
  };

  const [replyOpen, setReplyOpen] = useState(true);

  return (
    <>
      <article key={id} className='bg-white mx-4 my-2 rounded-lg p-4 '>
        <div>
          <img
            src={webp}
            alt={`${username} profile`}
            className='profile-picture'
          />
          <h6>{username}</h6>
          <p>{createdAt}</p>
        </div>
        <p className='text-dark-blue'>{content}</p>
        <div>
          <button onClick={() => addVote()}>
            <img src={plus} alt='' />
          </button>
          {votes}
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
              <Post
                comment={reply}
                currentUsername={currentUsername}
                currentUserImage={currentUserImage}
              />
            </div>
          );
        })}
      {replyOpen && (
        <Reply
          currentUsername={currentUsername}
          currentUserImage={currentUserImage}
        />
      )}
    </>
  );
};

export default Post;
