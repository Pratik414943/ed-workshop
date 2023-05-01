import { useState, useEffect } from "react";
import { database } from "./base";
import { onValue, ref, set, push, remove } from "firebase/database";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";

const Feed = () => {
  const { data: session } = useSession();
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [replyToTweetId, setReplyToTweetId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({});

  // Fetch initial data from Firebase
  useEffect(() => {
    const dbRef = ref(database, "tweets");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tweetList = Object.entries(data).map(([key, value]) => ({
          id: key,
          user: value.user,
          text: value.text,
        }));
        setTweets(tweetList);
      }
    });
  }, []);

  // Fetch replies for a tweet
  const fetchReplies = (tweetId) => {
    const dbRef = ref(database, "tweets");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const repliesList = Object.entries(data)
          .filter(([key, value]) => value.replyTo === tweetId)
          .map(([key, value]) => ({
            id: key,
            user: value.user,
            text: value.text,
          }));
        setReplies((prevState) => ({
          ...prevState,
          [tweetId]: repliesList,
        }));
      }
    });
  };

  // Post a new tweet to Firebase
  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(database, "/tweets");
    const newTweetRef = push(dbRef);
    set(newTweetRef, {
      id: newTweetRef.key,
      user: session.user.name,
      text: newTweet,
    });
    setNewTweet("");
  };

  // Post a reply to a tweet
  const handleReplySubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(database, "/tweets");
    const newTweetRef = push(dbRef);
    set(newTweetRef, {
      id: newTweetRef.key,
      user: session.user.name,
      text: replyText,
      replyTo: replyToTweetId,
    });
    setReplyToTweetId(null);
    setReplyText("");
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
          </form>
        </div>
        <div className="">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="wrapper feed">
              <div className="tweet">
                <div className="tweet-content">
                  <div className="tweet-header">
                    <h3>{tweet.user}</h3>
                    <button onClick={() => handleDelete(tweet.id)}>
                      Delete
                    </button>
                  </div>
                  <p>{tweet.text}</p>
                  <button onClick={() => fetchReplies(tweet.id)}>
                    View replies
                  </button>
                </div>
              </div>
              {replies[tweet.id] && (
                <div className="replies">
                  {replies[tweet.id].map((reply) => (
                    <div key={reply.id} className="tweet">
                      <div className="tweet-content">
                        <div className="tweet-header">
                          <h3>{reply.user}</h3>
                          <button onClick={() => handleDelete(reply.id)}>
                            Delete
                          </button>
                        </div>
                        <p>{reply.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="textbox">
                    <form onSubmit={handleReplySubmit}>
                      <div className="upper flex">
                        <input
                          className="text-area"
                          placeholder="Reply"
                          type="text"
                          value={replyText}
                          onChange={(event) => setReplyText(event.target.value)}
                        />
                        <button type="submit" className="btn1">
                          Reply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
