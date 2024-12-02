const Post = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <img src={post.thumbnail} alt="" />
      <p>{post.subreddit}</p>
      <p>author: {post.author}</p>
      <p>comments: {post.numberOfComments}</p>
      <p>ups: "{post.ups}" | downs: "{post.downs}"</p>
      {/* <p>comments permalink {post.commentsPermalink}</p> */}
      <p>created {post.created}</p>
    </article>
  );
};

export { Post };
