import React, { useState, useEffect } from "react";

import Reply from "./Reply";
import VoteButtons from "./VoteButtons";

const Post = ({ comment, currentUsername, currentUserImage }) => {
  const { id, content, createdAt, score, user, replies, replyingTo } = comment;
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
      let updatedVote = votes + 2;
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
      let updatedVote = votes - 2;
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

  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <>
      <article key={id} className='bg-white mx-4 my-2 rounded-lg p-4 space-y-4'>
        <div className='flex space-x-4 items-center'>
          <img
            src={webp}
            alt={`${username} profile`}
            className='profile-picture'
          />
          <h4 className='font-medium'>{username}</h4>
          <p className='text-grayish-blue'>{createdAt}</p>
        </div>
        <p className='text-grayish-blue'>
          <span className='font-medium text-moderate-blue'>
            {replyingTo && `@${replyingTo} `}
          </span>
          {content}
        </p>
        <div className='flex '>
          <VoteButtons votes={votes} addVote={addVote} downVote={downVote} />

          <button
            className='flex items-center fill-moderate-blue text-moderate-blue hover:text-light-grayish-blue hover:fill-light-grayish-blue ml-auto gap-x-2 text-sm'
            onClick={() => setReplyOpen(!replyOpen)}
          >
            <svg width='14' height='13' xmlns='http://www.w3.org/2000/svg'>
              <path d='M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z' />
            </svg>
            Reply
          </button>
        </div>
      </article>
      {replyOpen && (
        <Reply
          currentUsername={currentUsername}
          currentUserImage={currentUserImage}
        />
      )}
      <div className='border-light-gray border-l-2 ml-4'>
        {replies &&
          replies.map((reply, index) => {
            return (
              <div key={index}>
                <Post
                  comment={reply}
                  currentUsername={currentUsername}
                  currentUserImage={currentUserImage}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Post;
