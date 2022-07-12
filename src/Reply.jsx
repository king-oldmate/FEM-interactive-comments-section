import React from "react";

const Reply = ({ currentUsername, currentUserImage }) => {
  return (
    <article className='bg-white mx-4 mb-4 mt-2 rounded-lg p-4'>
      <img src={currentUserImage} alt='' className='profile-picture' />
      <input></input>
      <button className='uppercase'>Reply</button>
    </article>
  );
};

export default Reply;
