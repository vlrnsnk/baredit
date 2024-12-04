import { useEffect, useState } from 'react';

import { Header } from 'components/Header/Header';
import { Drawer } from 'components/Drawer/Drawer';
import { PostList } from 'components/PostList/PostList';
import { Footer } from 'components/Footer/Footer';

import mockPosts from 'mocks/mockPosts.json';
import mockSubreddits from 'mocks/mockSubreddits.json';

import { getTheme } from 'utilities/helpers';

import './App.css';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme());

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.theme = theme;
  };

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

  const posts = mockPosts.data.children.map((post) => ({
    id: post.data.id,
    title: post.data.title,
    description: post.data.selftext,
    // thumbnail: post.data.url,
    thumbnail: post.data.thumbnail,
    subreddit: post.data.subreddit_name_prefixed,
    author: post.data.author,
    numberOfComments: post.data.num_comments,
    commentsPermalink: post.data.permalink,
    ups: post.data.ups,
    downs: post.data.downs,
    created: post.data.created_utc,
  }));
  // console.log(posts);

  const subreddits = mockSubreddits.data.children.map((subreddit) => ({
    id: subreddit,
    name: subreddit.data.display_name_prefixed,
    members: subreddit.data.subscribers,
    image: subreddit.data.icon_img,
  }));
  // console.log(subreddits);

  return (
    <div className="bg-orange-400">
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
        />
        <PostList posts={posts} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
