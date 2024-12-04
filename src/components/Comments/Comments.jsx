import { Comment } from "components/Comment/Comment";
import { ReactComponent as CloseIcon } from 'assets/x-mark.svg';

const Comments = ({ comments = [], handleCloseButtonClick }) => {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-200/75"></div>
      <div className="fixed inset-0 max-w-full m-4 bg-orange-400 rounded-2xl overflow-hidden">
        <div className="relative max-w-md">
          <div className="absolute z-20 right-1 top-1">
            <button
              className="size-12 flex justify-center items-center focus:ring-2 focus:ring-gray-900 dark:focus:ring-orange-400 dark:text-orange-400 dark:hover:text-gray-200 rounded-full text-gray-200"
              onClick={handleCloseButtonClick}
            >
              <span className="sr-only">Close Comments</span>
              <CloseIcon className="size-10" />
            </button>
          </div>
          <div className="h-screen overflow-y-auto shadow-xl dark:bg-gray-900 dark:text-gray-200">
            <div className="px-4">
              <h2 className="font-semibold text-3xl py-3 text-gray-900 dark:text-orange-400">
                Comments
              </h2>
              <hr />
            </div>
            <div>
              {comments.length > 0 ? (
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index}>
                      <Comment comment={comment} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Comments };
