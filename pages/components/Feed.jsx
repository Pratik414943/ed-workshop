import Navbar from "./Navbar"; 
import TweetBox from "./TweetBox"; 
import Post from "./Post";  
import { useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'I love football!',
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Who do you think will win the World Cup?',
    }, 
    {
      id: 3, 
      author: 'Yashwant', 
      content: 'Suiiiiiiii'
    }
  ]);  
  return (
    <>
      <Navbar />
      <div className="main-feed">
        <TweetBox /> 
        {posts.map((post) => (
        <Post author={post.author} content={post.content} /> 
      ))}
      </div>
    </>
  );
};

export default Feed;
