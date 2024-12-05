import { useEffect, useState } from 'react';

import { Comments } from 'components/Comments/Comments';
import { Header } from 'components/Header/Header';
import { Drawer } from 'components/Drawer/Drawer';
import { PostList } from 'components/PostList/PostList';
import { Footer } from 'components/Footer/Footer';

import {
  extractComments,
  getTheme,
  formatPosts,
  formatSubreddits
} from 'utilities/helpers';
import { fetchJson } from 'utilities/redditJsonApi';

import './App.css';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const [isShowComments, setIsShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [lastLoadedCommentsPermalink, setLastLoadedCommentsPermalink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const postsJsonData = await fetchJson('https://www.reddit.com/r/popular.json');
      const subredditsJsonData = await fetchJson('https://www.reddit.com/subreddits.json');

      if (postsJsonData) {
        setPosts(formatPosts(postsJsonData));
      }

      if (subredditsJsonData) {
        setSubreddits(formatSubreddits(subredditsJsonData));
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [theme]);

  const handleBurgerClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.theme = newTheme;
  };

  const toggleCommentsVisibility = () => {
    setIsShowComments(!isShowComments);
  };

  const fetchComments = async (url) => {
    const commentsJsonData = await fetchJson(url);

    if (commentsJsonData) {
      setComments(extractComments(commentsJsonData));
    }
  };

  const handleCommentsButtonClick = async (commentsPermalink) => {
    setIsLoadingComments(true);

    toggleCommentsVisibility();

    if (commentsPermalink !== lastLoadedCommentsPermalink) {
      setLastLoadedCommentsPermalink(commentsPermalink);

      await fetchComments(`https://www.reddit.com${commentsPermalink}.json`);
    }

    setIsLoadingComments(false);
  };

  return (
    <div className="bg-orange-400 h-screen flex flex-col">
      {isShowComments && (
        <Comments
          isShowComments={isShowComments}
          comments={comments}
          handleCloseButtonClick={toggleCommentsVisibility}
          isLoadingComments={isLoadingComments}
        />
      )}
      <Header
        handleBurgerClick={handleBurgerClick}
        theme={theme}
        handleThemeSwitcherClick={changeTheme}
      />
      <div className="md:flex md:flex-row-reverse md:container md:mx-auto">
        <Drawer
          subreddits={subreddits}
          isDrawerOpen={isDrawerOpen}
          handleBurgerClick={handleBurgerClick}
          isLoading={isLoading}
        />
        <PostList
          posts={posts}
          handleCommentsButtonClick={handleCommentsButtonClick}
          isLoading={isLoading}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
