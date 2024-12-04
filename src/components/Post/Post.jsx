import { ReactComponent as UserIcon } from 'assets/user.svg';
import { ReactComponent as CommentsIcon } from 'assets/chat-bubble.svg';
import { ReactComponent as HandThumbsUp } from 'assets/hand-thumbs-up.svg';
import { ReactComponent as HandThumbDown } from 'assets/hand-thumbs-down.svg';
import { ReactComponent as Clock } from 'assets/clock.svg';
import { ReactComponent as Slash } from 'assets/slash.svg';

import { timeAgo } from 'utilities/helpers';

const Post = ({ post }) => {
  return (
    <article className="flex flex-col gap-4 bg-gray-200 dark:bg-gray-900 dark:text-gray-200 p-4 rounded-2xl mb-4 break-words">
      <h3 className="text-3xl font-bold">{post.title}</h3>
      <p>{post.description}</p>
      {post.thumbnail && (
        <img
          className="rounded-xl border border-orange-400"
          src={post.thumbnail}
          alt={post.title}
        />
      )}
      <div className="flex flex-wrap gap-4 justify-between sm:justify-evenly">
        <p className="flex gap-2">
          <UserIcon className="text-orange-400" />
          {post.author}
        </p>
        <p className="flex gap-2">
          <Slash className="text-orange-400" />
          {post.subreddit}
        </p>
        {/* <p>comments permalink {post.commentsPermalink}</p> */}
        <p className="flex gap-2">
          <Clock className="text-orange-400" />
          {timeAgo(post.created)}
        </p>
      </div>
      <div className="flex gap-4 justify-between sm:justify-evenly">
        <div className="flex gap-4">
          <p className="flex gap-2">
            <HandThumbsUp className="text-orange-400" />
            {post.ups}
          </p>
          <p className="flex gap-2">
            <HandThumbDown className="text-orange-400" />
            {post.downs}
          </p>
        </div>
        <p className="flex gap-2">
          <button
            className="text-orange-400 hover:cursor-pointer"
            type="button"
            onClick={() => console.log(post.commentsPermalink) }
          >
            <CommentsIcon className="hover:fill-orange-400" />
          </button>
          {post.numberOfComments}
        </p>
      </div>
    </article>
  );
};

export { Post };
