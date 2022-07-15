import React, { useState, useEffect } from "react";

import Reply from "./Reply";
import VoteButtons from "./VoteButtons";
import ReplyButton from "./ReplyButton";

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
      <article key={id} className='bg-white mx-4 my-2 rounded-lg p-4 md:flex'>
        <div className='hidden md:inline mr-4'>
          <VoteButtons votes={votes} addVote={addVote} downVote={downVote} />
        </div>
        <div className=' space-y-4'>
          <div className='flex space-x-4 items-center justify-start'>
            <img
              src={webp}
              alt={`${username} profile`}
              className='profile-picture'
            />
            <h4 className='font-medium'>{username}</h4>
            <p className='text-grayish-blue'>{createdAt}</p>
            <div className='hidden md:inline  grow justify-self-end'>
              <ReplyButton replyOpen={replyOpen} setReplyOpen={setReplyOpen} />
            </div>
          </div>
          <p className='text-grayish-blue'>
            <span className='font-medium text-moderate-blue'>
              {replyingTo && `@${replyingTo} `}
            </span>
            {content}
          </p>
        </div>
        <div className='flex md:hidden mt-4'>
          <VoteButtons votes={votes} addVote={addVote} downVote={downVote} />
          <ReplyButton replyOpen={replyOpen} setReplyOpen={setReplyOpen} />
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
