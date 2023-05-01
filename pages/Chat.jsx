import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db, database } from "./base";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { ref, set } from "firebase/database";

const Chat = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Add a new message to Firestore
  const addMessage = async () => {
    const timestamp = new Date().getTime();
    const senderId = session.user.email;
    const receiverId = ""; // Replace with receiver email
    const message = { timestamp, senderId, receiverId, text };

    try {
      await addDoc(collection(db, "messages"), message);
      setText("");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  // Listen for new messages in Firestore
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("senderId", "==", session.user.email),
      where("receiverId", "==", "") // Replace with receiver email
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [session]);

  // Add user to Realtime Database
  useEffect(() => {
    try {
      // Replace dots with underscores in user name
      const userId = session.user.name.replace(".", "_");

      // Set user data in the database
      set(ref(database, `users/${userId}`), {
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
    }
  }, [session]);

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200">{/* Sidebar */}</div>
      <div className="w-3/4">
        {/* Chat box */}
        {messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMessage()}
        />
        <button onClick={addMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
