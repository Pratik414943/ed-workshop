import { useState, useEffect } from "react";
import { database } from "./base";
import { onValue, ref, set, push, remove } from "firebase/database";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";

const Feed = () => {
  const { data: session } = useSession();
  const [tweets, setTweets] = useState([]);
  // State for creating new tweets and replies
  const [newTweet, setNewTweet] = useState("");
  const [replyToTweetId, setReplyToTweetId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Fetch initial data from Firebase
  useEffect(() => {
    const dbRef = ref(database, "tweets");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tweetList = Object.entries(data).map(([key, value]) => {
          const repliesList = value.replies
            ? Object.entries(value.replies).map(([replyKey, replyValue]) => ({
                id: replyKey,
                user: replyValue.user,
                text: replyValue.text,
              }))
            : [];
          return {
            id: key,
            user: value.user,
            text: value.text,
            replies: repliesList,
          };
        });
        setTweets(tweetList);
      }
    });
  }, []);

  // Post a new tweet to Firebase
  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(database, "tweets");
    const newTweetRef = push(dbRef);
    set(newTweetRef, {
      id: newTweetRef.key,
      user: session.user.name,
      text: newTweet,
    });
    setNewTweet("");
  };

  // Post a reply to a tweet
  const handleReplySubmit = (event, tweetId) => {
    event.preventDefault();
    const dbRef = ref(database, `/tweets/${tweetId}/replies`);
    const newTweetRef = push(dbRef);
    set(newTweetRef, {
      id: newTweetRef.key,
      user: session.user.name,
      text: replyText,
      replyTo: tweetId,
    });
    setReplyToTweetId(null);
    setReplyText("");
  };

  const handleDelete = (id) => {
    const tweetRef = ref(database, `/tweets/${id}`);
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
              <div className="feed-header">
                <div className="feed-header-details">
                  <span className="feed-header-user">{tweet.user}:</span>
                  <span className="feed-header-text">{tweet.text}</span>
                </div>
                <div className="feed-header-actions">
                  <button onClick={() => handleDelete(tweet.id)}>Delete</button>
                  <button onClick={() => setReplyToTweetId(tweet.id)}>
                    Reply
                  </button>
                </div>
              </div>
              <div className="replies">
                {replyToTweetId === tweet.id && (
                  <form
                    onSubmit={(event) => handleReplySubmit(event, tweet.id)}
                  >
                    <input
                      type="text"
                      placeholder="Reply to this tweet"
                      value={replyText}
                      onChange={(event) => setReplyText(event.target.value)}
                    />
                    <button type="submit" className="reply-btn">Reply</button>
                  </form>
                )}
                {tweet.replies.map((reply) => (
                  <div key={reply.id} className="reply">
                    <div className="reply-header">
                      <div className="reply-header-details">
                        <span className="reply-header-user">{reply.user}: </span>
                        <span className="reply-header-text">{reply.text}</span>
                      </div>
                      <div className="reply-header-actions">
                        <button onClick={() => handleDelete(reply.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Feed;
