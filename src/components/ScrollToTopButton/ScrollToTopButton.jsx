import { ReactComponent as ArrowUp } from 'assets/arrow-up.svg';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);

    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`size-12 rounded-full text-orange-400 fixed bottom-5 right-5 sm:bottom-10 sm:right-10 p-2 bg-black/80 dark:bg-white/80 hover:bg-white/80 dark:hover:bg-black/80 shadow-lg transition-opacity animation-color duration-500 ease-in-out ${isVisible ? `opacity-100` : `opacity-0`}`}
    >
      <ArrowUp />
    </button>
  );
};

export { ScrollToTopButton };
