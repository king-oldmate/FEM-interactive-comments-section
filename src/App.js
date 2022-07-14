import React, { useState, useEffect } from "react";
import Post from "./Post";
import data from "./data.json";
function App() {
  const { currentUser, comments } = data;
  const { image, username } = currentUser;
  const currentUserImage = image.png;
  return (
    <div className='max-w-[732px] mx-auto'>
      {comments.map((comment) => {
        return (
          <Post
            comment={comment}
            currentUsername={username}
            currentUserImage={currentUserImage}
          />
        );
      })}
    </div>
  );
}

export default App;
