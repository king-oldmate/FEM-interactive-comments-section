import React, { useState, useEffect } from "react";

import Reply from "./Reply";

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

  const [replyOpen, setReplyOpen] = useState(true);

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
        <div className='flex'>
          <div className='bg-light-gray flex w-[100px] justify-evenly rounded-lg py-2 text-moderate-blue'>
            <button
              onClick={() => addVote()}
              className=' hover:fill-moderate-blue fill-light-grayish-blue'
            >
              <svg width='11' height='11' xmlns='http://www.w3.org/2000/svg'>
                <path d='M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z' />
              </svg>
            </button>
            {votes}
            <button
              onClick={() => downVote()}
              className=' hover:fill-moderate-blue fill-light-grayish-blue'
            >
              <svg width='11' height='3' xmlns='http://www.w3.org/2000/svg'>
                <path d='M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z' />
              </svg>
            </button>
          </div>
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
      {replies && // fix gap in left border - div needs to surround all replies
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
