import React, { useState, useEffect } from "react";
import Post from "./Post";
import SendIt from "./SendIt";
import data from "./data.json";
function App() {
  const { currentUser, comments } = data;
  const { image, username } = currentUser;
  const currentUserImage = image.png;
  return (
    <main className='max-w-[732px] mx-auto'>
      {comments.map((comment) => {
        return (
          <Post
            comment={comment}
            currentUsername={username}
            currentUserImage={currentUserImage}
          />
        );
      })}
      <SendIt />
    </main>
  );
}

export default App;
