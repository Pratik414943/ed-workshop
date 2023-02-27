import Navbar from "./Navbar"; 
import TweetBox from "./TweetBox"; 
import Post from "./Post"; 

const Feed = () => {
  
  return (
    <>
      <Navbar />
      <div className="main-feed">
        <TweetBox /> 
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default Feed;
