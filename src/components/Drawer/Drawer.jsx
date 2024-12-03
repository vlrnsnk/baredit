import { ReactComponent as CloseIcon } from 'assets/x-mark.svg';
import { Subreddit } from 'components/Subreddit/Subreddit';

const Drawer = ({ subreddits = [] }) => {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-200/75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="fixed inset-y-0 right-0 pointer-events-non flex pl-10 max-w-full">
          <div className="relative pointer-events-non w-screen max-w-md">
            <div className="absolute z-20 right-0 top-1 -ml-8 sm:-ml-10 pt-4 pr-2 sm:pr-4 flex">
              <button
                className="relative rounded-md hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 size-10 flex justify-center items-center"
                type="button"
              >
                <span className="sr-only"></span>
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col h-full overflow-y-scroll bg-white py-6 shadow-xl">
              <div className="px-4 sm:px-6">
                <h2 className="font-semibold text-gray-900 text-3xl text-orange-500 ps-2">Subreddits</h2>
              </div>
              <div className="relative flex-1 mt-6 px-4 sm:px-6">
                {subreddits.length > 0 ? (
                  <ul>
                    {subreddits.map((subreddit, index) => (
                      <li key={index} className="mb-2">
                        <Subreddit subreddit={subreddit} />
                      </li>
                    ))}
                  </ul>
                ) :(
                  <p className="text-orange-500 text-4xl text-center mt-4">
                    There was an error fetching SubReddits
                  </p>
                ) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Drawer };
