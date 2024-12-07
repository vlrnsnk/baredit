import { ReactComponent as UserIcon } from 'assets/user.svg';
import { ReactComponent as CommentsIcon } from 'assets/chat-bubble.svg';
import { ReactComponent as HandThumbsUp } from 'assets/hand-thumbs-up.svg';
import { ReactComponent as HandThumbDown } from 'assets/hand-thumbs-down.svg';
import { ReactComponent as Clock } from 'assets/clock.svg';
import { ReactComponent as Slash } from 'assets/slash.svg';

import { timeAgo } from 'utilities/helpers';
import { useState } from 'react';

const Post = ({
  post,
  handleCommentsButtonClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(prevState => !prevState);
  };

  const MAX_LENGTH = 150;

  const displayDescription =
    post.description && post.description.length > MAX_LENGTH
      ? isExpanded
        ? post.description
          : `${post.description.slice(0, MAX_LENGTH)}...`
        : post.description;


  return (
    <article className="flex flex-col gap-4 bg-gray-200 dark:bg-gray-900 dark:text-gray-200 p-4 md:p-6 lg:p-8 xl:p-10 rounded-2xl mb-4 break-all">
      <h3 className="text-3xl font-bold">{post.title}</h3>
      <p className={`transition-all duration-500 ease-in-out ${isExpanded ? `max-h-full` : `max-h-[${MAX_LENGTH}px]`} overflow-hidden md:text-lg md:leading-relaxed md:indent-5 lg:indent-7 lg:text-xl xl:leading-loose`}>
        {displayDescription}
      </p>
      {post.description && post.description.length > MAX_LENGTH && (
          <p>
            <button
              className="mt-2 text-orange-400 hover:underline focus:outline-none md:text-lg lg:text-xl"
              onClick={toggleDescription}
              aria-label={isExpanded ? 'Show less' : 'Read more'}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          </p>
        )}
      {post.pictureTag}
      <div className="flex flex-wrap gap-4 justify-between sm:justify-evenly">
        <p className="flex gap-2">
          <UserIcon className="text-orange-400" />
          {post.author}
        </p>
        <p className="flex gap-2">
          <Slash className="text-orange-400" />
          {post.subreddit}
        </p>
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
            onClick={() => handleCommentsButtonClick(post.commentsPermalink)}
            aria-label="Open Comments"
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
