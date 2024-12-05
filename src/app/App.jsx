import { useEffect, useState } from 'react';

import { Header } from 'components/Header/Header';
import { Drawer } from 'components/Drawer/Drawer';
import { PostList } from 'components/PostList/PostList';
import { Footer } from 'components/Footer/Footer';

import mockPosts from 'mocks/mockPosts.json';
import mockSubreddits from 'mocks/mockSubreddits.json';
import mockComments from 'mocks/mockComments.json';

import { extractComments, getTheme, generatePictureTag } from 'utilities/helpers';

import './App.css';
import { Comments } from 'components/Comments/Comments';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const [isShowComments, setIsShowComments] = useState(false);
  const [comments, setComments] = useState(extractComments(mockComments));

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
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.theme = theme;
  };

  const toggleCommentsVisibility = () => {
    setIsShowComments(!isShowComments);
  };

  const handleCommentsButtonClick = (commentsPermalink) => {
    toggleCommentsVisibility();
    // setComments([comments[0]]);
    console.log(commentsPermalink);
  };

  const posts = mockPosts.data.children.map((post) => ({
    id: post.data.id,
    title: post.data.title,
    description: post.data.selftext,
    pictureTag: generatePictureTag(post.data),
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
      {isShowComments && (
        <Comments
          isShowComments={isShowComments}
          comments={comments}
          handleCloseButtonClick={toggleCommentsVisibility}
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
        />
        <PostList posts={posts} handleCommentsButtonClick={handleCommentsButtonClick} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
