import { Post } from "components/Post/Post";

const PostList = ({ posts }) => {
  return (
    <section className="container mx-auto p-4">
      {posts.length > 0 ? (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts</p>
      )}
    </section>
  );
}

export { PostList };
