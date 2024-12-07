import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Comments } from 'components/Comments/Comments';
import { Header } from 'components/Header/Header';
import { Drawer } from 'components/Drawer/Drawer';
import { PostList } from 'components/PostList/PostList';
import { ScrollToTopButton } from 'components/ScrollToTopButton/ScrollToTopButton';
import { Footer } from 'components/Footer/Footer';

import { setTheme, toggleDrawer, setSearchQuery } from '../redux/slices/appSlice';

import {
  setLoading as setRedditPostsLoading,
  setPosts,
  setComments,
  toggleComments,
  setLoadingComments,
  setLastLoadedCommentsPermalink,
} from '../redux/slices/redditPostsSlice';

import {
  setSubreddits,
  setLoading as setSubredditsLoading,
} from '../redux/slices/subredditsSlice';

import {
  extractComments,
  formatPosts,
  formatSubreddits
} from 'utilities/helpers';

import { fetchJson } from 'utilities/redditJsonApi';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const { theme, isDrawerOpen, searchQuery } = useSelector((state) => state.app);

  const {
    posts,
    isLoading: isLoadingPosts,
    comments,
    isShowComments,
    isLoadingComments,
    lastLoadedCommentsPermalink,
  } = useSelector((state) => state.redditPosts);

  const {
    subreddits,
    isLoading: isLoadingSubreddits,
  } = useSelector((state) => state.subreddits);

  useEffect(() => {
    dispatch(setRedditPostsLoading(true));

    const fetchData = async () => {
      dispatch(setRedditPostsLoading(true));
      dispatch(setSubredditsLoading(true));

      const postsJsonData = await fetchJson('https://www.reddit.com/r/popular.json');
      const subredditsJsonData = await fetchJson('https://www.reddit.com/subreddits.json');

      if (postsJsonData) {
        dispatch(setPosts(formatPosts(postsJsonData)));
      }

      if (subredditsJsonData) {
        dispatch(setSubreddits(formatSubreddits(subredditsJsonData)));
      }

      dispatch(setRedditPostsLoading(false));
      dispatch(setSubredditsLoading(false));
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [theme]);

  const handleBurgerClick = () => {
    dispatch(toggleDrawer());
  }

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    localStorage.theme = newTheme;
  };

  const toggleCommentsVisibility = () => {
    dispatch(toggleComments());
  };

  const fetchComments = async (url) => {
    const commentsJsonData = await fetchJson(url);

    if (commentsJsonData) {
      dispatch(setComments(extractComments(commentsJsonData)));
    }
  };

  const handleCommentsButtonClick = async (commentsPermalink) => {
    dispatch(setLoadingComments(true));
    toggleCommentsVisibility();

    if (commentsPermalink !== lastLoadedCommentsPermalink) {
      dispatch(setLastLoadedCommentsPermalink(commentsPermalink));
      await fetchComments(`https://www.reddit.com${commentsPermalink}.json`);
    }

    dispatch(setLoadingComments(false));
  };

  const handleSubredditClick = async (subredditName) => {
    if (isDrawerOpen) {
      dispatch(handleBurgerClick);
    }

    dispatch(setRedditPostsLoading(true));

    const postsJsonData = await fetchJson(`https://www.reddit.com/${subredditName}.json`);

    if (postsJsonData) {
      dispatch(setPosts(formatPosts(postsJsonData)));
    }

    dispatch(setRedditPostsLoading(false));
  };

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setRedditPostsLoading(true));

    const postsJsonData = await fetchJson(
      `https://www.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}`
    );

    if (postsJsonData) {
      dispatch(setPosts(formatPosts(postsJsonData)));
    }

    dispatch(setRedditPostsLoading(false));
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
        searchQuery={searchQuery}
        setSearchQuery={(query) => dispatch(setSearchQuery(query))}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />
      <div className="bg-orange-400">
        <div className="md:flex md:flex-row-reverse md:container md:mx-auto">
          <Drawer
            subreddits={subreddits}
            isDrawerOpen={isDrawerOpen}
            handleBurgerClick={handleBurgerClick}
            isLoading={isLoadingSubreddits}
            handleSubredditClick={handleSubredditClick}
          />
          <PostList
            posts={posts}
            handleCommentsButtonClick={handleCommentsButtonClick}
            isLoading={isLoadingPosts}
          />
          <ScrollToTopButton />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
