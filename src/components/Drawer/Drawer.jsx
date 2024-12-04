import { ReactComponent as CloseIcon } from 'assets/x-mark.svg';
import { Subreddit } from 'components/Subreddit/Subreddit';
import { useEffect, useState } from 'react';

const Drawer = ({ subreddits = [], isDrawerOpen, handleBurgerClick }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(isDrawerOpen);

  useEffect(() => {
    if (isDrawerOpen) {
      setIsOverlayVisible(true);
    } else {
      const timer = setTimeout(() => setIsOverlayVisible(false), 1000);

      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  return (
    <div className="relative z-10 md:z-0">
      <div className={`fixed inset-0 bg-gray-200/75 transition-opacity duration-1000 ${isDrawerOpen ? `opacity-100 visible` : `opacity-0`} ${isOverlayVisible ? `visible` : `invisible`} md:hidden`}></div>
      <div className={`fixed inset-0 overflow-hidden transform transition-transform duration-1000 ${isDrawerOpen ? `translate-x-0` : `translate-x-full`} md:relative`}>
        <div className="fixed inset-y-0 right-0 flex pl-10 max-w-full md:relative md:pl-0 md:mt-4">
          <div className="relative w-screen max-w-md md:w-max">
            <div className="absolute z-20 right-0 top-1 -ml-8 sm:-ml-10 pt-4 pr-2 sm:pr-4 flex md:hidden">
              <button
                className="relative rounded-md hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 size-10 flex justify-center items-center"
                type="button"
                onClick={handleBurgerClick}
              >
                <span className="sr-only"></span>
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col h-full overflow-y-scroll bg-white py-6 shadow-xl md:bg-gray-200 md:rounded-2xl md:me-4">
              <div className="px-4 sm:px-6 md:-mt-2">
                <h2 className="font-semibold text-3xl text-orange-500 ps-2 md:text-gray-900">Subreddits</h2>
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
