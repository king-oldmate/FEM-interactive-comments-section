import React, { useState, useEffect } from "react";

const Post = ({ comment }) => {
  const { id, content, createdAt, score, user, username, replies } = comment;
  return (
    <article key={id}>
      {content}
      <img src={user.image.png} />
    </article>
  );
};

export default Post;
