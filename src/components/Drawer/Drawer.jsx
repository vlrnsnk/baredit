import { ReactComponent as CloseIcon } from 'assets/x-mark.svg';
import { Subreddit } from 'components/Subreddit/Subreddit';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Spinner } from 'assets/spinner.svg';

const Drawer = ({
  subreddits = [],
  isDrawerOpen,
  handleBurgerClick,
  isLoading,
  handleSubredditClick,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(isDrawerOpen);

  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        handleBurgerClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen, handleBurgerClick]);

  useEffect(() => {
    if (isDrawerOpen) {
      setIsOverlayVisible(true);
    } else {
      const timer = setTimeout(() => setIsOverlayVisible(false), 500);

      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  return (
    <div className="relative z-20 md:z-0">
      <div
        className={`fixed inset-0 bg-gray-200/75 transition-opacity ease-in-out duration-500 ${isDrawerOpen ? `opacity-100 visible` : `opacity-0`} ${isOverlayVisible ? `visible` : `invisible`} md:hidden`}
      ></div>
      <div
        className={`fixed inset-0 overflow-hidden transform transition-transform ease-in-out duration-500 ${isDrawerOpen ? `translate-x-0` : `translate-x-full`} md:translate-x-0 md:relative`}
        ref={drawerRef}
      >
        <div className="fixed inset-y-0 right-0 flex pl-10 max-w-full md:relative md:pl-0 md:mt-4">
          <div className="relative w-screen max-w-md md:w-max">
            <div className="absolute z-20 right-0 top-1 -ml-8 sm:-ml-10 pt-4 pr-2 sm:pr-4 flex md:hidden">
              <button
                className="relative rounded-md hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 size-10 flex justify-center items-center dark:text-gray-200"
                type="button"
                onClick={handleBurgerClick}
              >
                <span className="sr-only">Close Drawer</span>
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col h-full overflow-y-scroll bg-gray-200 py-6 shadow-xl md:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 md:rounded-2xl md:me-4">
              <div className="px-4 sm:px-6 md:-mt-2">
                <h2 className="font-semibold text-3xl text-orange-500 ps-2 md:text-gray-900 dark:bg-gray-900 dark:text-gray-200">Subreddits</h2>
              </div>
              <div className="relative flex-1 mt-6 px-4 sm:px-6">
                {isLoading ? (
                  <div className="flex gap-2 justify-center items-center">
                    <Spinner />
                    <p className="text-2xl">
                      Loading...
                    </p>
                  </div>
                ) : subreddits.length > 0 ? (
                  <ul>
                    {subreddits.map((subreddit, index) => (
                      <li key={index} className="mb-2">
                        <Subreddit
                          subreddit={subreddit}
                          handleSubredditClick={handleSubredditClick}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-2xl text-center mt-4">
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
