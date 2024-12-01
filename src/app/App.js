import './App.css';

import { Header } from 'components/Header/Header';
import { CommunityList } from 'components/CommunityList/CommunityList';
import { PostList } from 'components/PostList/PostList';
import { Footer } from 'components/Footer/Footer';

function App() {
  const posts = [
    { id: 0, title: 'Post title 1', description: 'Post description 1' },
    { id: 1, title: 'Post title 2', description: 'Post description 2' },
  ];

  const communities = [
    { name: 'Community 1', url: 'community-url-1' },
    { name: 'Community 2', url: 'community-url-2' },
    { name: 'Community 3', url: 'community-url-3' },
  ];

  return (
    <>
      <Header />
      <CommunityList communities={communities} />
      <PostList posts={posts} />
      <Footer />
    </>
  );
}

export default App;
