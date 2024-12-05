import { Post } from "components/Post/Post";
import { ReactComponent as Spinner } from 'assets/spinner.svg';

const PostList = ({ posts = [], handleCommentsButtonClick, isLoading }) => {
  if (isLoading) {
    return (
      <section className="container mx-auto p-4 flex gap-2 justify-center items-center">
        <p>
          <Spinner />
        </p>
        <p className="pt-auto text-center text-4xl">
          Loading...
        </p>
      </section>
    );
  }

  return (
    <section className="container mx-auto p-4">
      {posts.length > 0 ? (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <Post post={post} handleCommentsButtonClick={handleCommentsButtonClick} />
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="pt-auto text-center text-4xl"
        >
          No posts found
        </p>
      )}
    </section>
  );
}

export { PostList };
