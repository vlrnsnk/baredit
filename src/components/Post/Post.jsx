const Post = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </article>
  );
};

export { Post };
