import Navbar from "./Navbar";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { useState, useEffect } from "react";
import { database } from "./base";
import { onValue, ref, on, set, push, remove } from "firebase/database";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");

  // Fetch initial data from Firebase
  useEffect(() => {
    const dbRef = ref(database, "tweets");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tweetList = Object.entries(data).map(([key, value]) => ({
          id: key,
          text: value.text,
        }));
        setTweets(tweetList);
      }
    });
  }, []);

  // Post a new tweet to Firebase
  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(database, "/tweets");
    const newTweetRef = push(dbRef);
    set(newTweetRef, {
      id: newTweetRef.key,
      text: newTweet,
    });
    setNewTweet("");
  };
  const handleDelete = (id) => {
    const tweetRef = ref(database, `/tweets/${id}`);
    console.log(tweetRef);
    remove(tweetRef);
  };

  return (
    <>
      <Navbar />
      <div className="main-feed">
        {/* <TweetBox />   */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTweet}
            onChange={(event) => setNewTweet(event.target.value)}
          />
          <button type="submit">Tweet</button>
        </form>
        <ul>
        {tweets.map((tweet) => ( 
          <li key={tweet.id}>
            <Post text={tweets.text} />
          </li>
        ))}
        </ul>
      </div>
    </>
  );
};

export default Feed;
