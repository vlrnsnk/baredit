import { ReactComponent as CloseIcon } from 'assets/x-mark.svg';

const Drawer = () => {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-200/75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="fixed inset-y-0 right-0 pointer-events-none flex pl-10 max-w-full">
          <div className="relative pointer-events-none w-screen max-w-md">
            <div className="absolute left-0 top-0 -ml-8 sm:-ml-10 pt-4 pr-2 sm:pr-4 flex">
              <button
                className="relative rounde-md text-orange-00 hover:text-red focus:outline-none focus:ring-2 focus:ring-green outline-dashed size-12 flex justify-center items-center"
                type="button"
              >
                {/* <span className="absolute -inset-2.5"></span> */}
                <span className="sr-only"></span>
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col h-full overflow-y-scroll bg-white py-6 shadow-xl">
              <div className="px-4 sm:px-6">
                <h2 className="text-base font-semibold text-gray-900">Subreddits</h2>
              </div>
              <div className="relative flex-1 mt-6 px-4 sm:px-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas beatae alias voluptates, nisi distinctio, obcaecati deserunt perspiciatis quos maiores iure ullam quaerat iusto esse! Et itaque magnam quod expedita vero!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas beatae alias voluptates, nisi distinctio, obcaecati deserunt perspiciatis quos maiores iure ullam quaerat iusto esse! Et itaque magnam quod expedita vero!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas beatae alias voluptates, nisi distinctio, obcaecati deserunt perspiciatis quos maiores iure ullam quaerat iusto esse! Et itaque magnam quod expedita vero!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas beatae alias voluptates, nisi distinctio, obcaecati deserunt perspiciatis quos maiores iure ullam quaerat iusto esse! Et itaque magnam quod expedita vero!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Drawer };
