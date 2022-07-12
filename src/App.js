import React, { useState, useEffect } from "react";
import Post from "./Post";
import data from "./data.json";
function App() {
  const { currentUser, comments } = data;
  const { image, username } = currentUser;
  return (
    <div className=''>
      {comments.map((comment) => {
        return <Post comment={comment} currentUsername={username} />;
      })}
    </div>
  );
}

export default App;
