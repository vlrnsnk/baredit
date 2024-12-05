import { ReactComponent as DefaultIcon } from 'assets/subreddit.svg';

import { formatNumberToCommaSeparated } from 'utilities/helpers';

const Subreddit = ({ subreddit = [], handleSubredditClick }) => {
  return (
    <article className="cursor-pointer flex flex-row gap-3 hover:bg-orange-200 dark:hover:bg-orange-400 dark:hover:text-gray-900 p-2 rounded-full" onClick={() => handleSubredditClick(subreddit.name) }>
      <div className="flex">
        {subreddit.image !== '' ? (
          <img
            className="rounded-full size-12"
            src={subreddit.image}
            alt={`${subreddit.name} logo`}
          />
        ) : (
          <DefaultIcon className="size-12" />
        )}
      </div>
      <div className="flex flex-col">
        <h3>{subreddit.name}</h3>
        <p>{formatNumberToCommaSeparated(subreddit.members)} members</p>
      </div>
    </article>
  );
};

export { Subreddit };
