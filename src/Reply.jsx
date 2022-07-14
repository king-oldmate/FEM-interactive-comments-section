import React from "react";

const Reply = ({ currentUsername, currentUserImage }) => {
  return (
    <article className='bg-white mx-4 mb-4 mt-2 rounded-lg p-4 flex gap-x-4 items-start'>
      <img src={currentUserImage} alt='' className='profile-picture' />
      <textarea className='border-moderate-blue border-[1px] rounded-lg grow px-5 py-3 h-24 align-top'></textarea>
      <button className='uppercase text-white bg-moderate-blue px-7 py-3 rounded-lg hover:bg-light-grayish-blue'>
        Reply
      </button>
    </article>
  );
};

export default Reply;
