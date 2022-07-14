import React from "react";

const Reply = ({ currentUsername, currentUserImage }) => {
  return (
    <article className='bg-white mx-4 mb-4 mt-2 rounded-lg p-4 flex gap-x-4 items-start'>
      <img src={currentUserImage} alt='' className='profile-picture' />
      <input className='border-moderate-blue border-[1px] rounded-lg grow px-5 py-3 h-24'></input>
      <button className='uppercase'>Reply</button>
    </article>
  );
};

export default Reply;
