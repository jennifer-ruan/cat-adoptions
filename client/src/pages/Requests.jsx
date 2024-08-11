import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";

export default function Requests() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages").then((response) => {
      setMessages(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {messages?.length > 0 &&
          messages.map((message) => <div>{message.message}</div>)}
      </div>
    </div>
  );
}
