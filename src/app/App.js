import './App.css';

import { Header } from 'components/Header/Header';
import { Drawer } from 'components/Drawer/Drawer';
// import { CommunityList } from 'components/CommunityList/CommunityList';
import { PostList } from 'components/PostList/PostList';
import { Footer } from 'components/Footer/Footer';

import mockPosts from 'mocks/mockPosts.json';
import mockSubreddits from 'mocks/mockSubreddits.json';

function App() {
  // const posts = [
  //   { id: 0, title: 'Post title 1', description: 'Post description 1' },
  //   { id: 1, title: 'Post title 2', description: 'Post description 2' },
  // ];

  // const communities = [
  //   { name: 'Community 1', url: 'community-url-1' },
  //   { name: 'Community 2', url: 'community-url-2' },
  //   { name: 'Community 3', url: 'community-url-3' },
  // ];

  // console.log(mockPosts);

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
  console.log(posts);

  const subreddits = mockSubreddits.data.children.map((subreddit) => ({
    id: subreddit,
    name: subreddit.data.display_name_prefixed,
    members: subreddit.data.subscribers,
    image: subreddit.data.icon_img,
  }));
  console.log(subreddits);

  return (
    <div className="bg-orange-400">
      <Header />
      {/* <CommunityList communities={communities} /> */}
      <Drawer subreddits={subreddits} />
      <PostList posts={posts} />
      <Footer />
    </div>
  );
}

export default App;
