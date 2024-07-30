import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function MessageForm({ cat }) {
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState("");
  async function sendMessage() {
    const data = { cat: cat._id, message, recipient: cat.shelter };
    const response = await axios.post("/messages", data);
    const messageId = response.data._id;
    setRedirect(`/account/cats/${messageId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">Send a message</div>
      <div className="my-2 p-2 px-4 rounded-2xl">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Hi there, I'd love to inquire about ${cat.name} ...`}
        />
        <button onClick={sendMessage} className="primary">
          Send message
        </button>
      </div>
    </div>
  );
}
