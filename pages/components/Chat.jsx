import { useState, useEffect } from "react";
import { db, database } from "./base"; 
import { collection, getDocs } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

export default function Feed() {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");

  // Fetch initial data from Firebase
  useEffect(() => {
    const dbRef = firebase.database().ref("tweets");
    dbRef.on("value", (snapshot) => {
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
    const dbRef = firebase.database().ref("tweets");
    dbRef.push({ text: newTweet });
    setNewTweet("");
  };

  // Render the feed
  return (
    <div>
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
          <li key={tweet.id}>{tweet.text}</li>
        ))}
      </ul>
    </div>
  );
}
