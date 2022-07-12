import React, { useState, useEffect } from "react";
import Post from "./Post";
import data from "./data.json";
function App() {
  const { user, comments } = data;
  return (
    <div className='text-3xl'>
      {comments.map((comment) => {
        return <Post comment={comment} />;
      })}
    </div>
  );
}

export default App;
