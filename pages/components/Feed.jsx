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
        <div className="textbox">
          <form onSubmit={handleSubmit}>
            <div className="upper flex">
              <input
                className="text-area"
                placeholder="What's Happening"
                type="text"
                value={newTweet}
                onChange={(event) => setNewTweet(event.target.value)}
              />
              <button type="submit" className="btn1">
                Tweet
              </button>
            </div>
            <div className="bottom">
              <ul className="icons">
                <li>
                  <i className="fa-solid fa-paperclip"></i>
                </li>
                <li>
                  <i className="far fa-file-image"></i>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                </li>
                <li>
                  <i className="far fa-grin"></i>
                </li>
                <li>
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                </li>
              </ul>
            </div>
          </form>
        </div>
        <div className="">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="wrapper">
              {/* <div className="author">Yashwant</div> */}
              <div className="upper1">
                {tweet.text}
                <button onClick={() => handleDelete(tweet.id)} className="btn2">
                  {" "}
                  Delete
                </button>
              </div>
              <div className="bottom">
                <ul className="icons small">
                  <li>
                    <i className="fa-regular fa-comment"></i>
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-down"></i>
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-up"></i>
                  </li>
                  <li>
                    <i className="fa-solid fa-share"></i>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
