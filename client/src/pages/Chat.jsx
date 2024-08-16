import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import CatImg from "../components/CatImg";

export default function Chat() {
  const { id } = useParams();
  const { user, ready } = useContext(UserContext);
  const [newReply, setNewReply] = useState("");
  const [messages, setMessages] = useState(null);
  const [cat, setCat] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/messages/${id}`).then((response) => {
        const foundMessages = response.data;
        if (foundMessages) {
          setMessages(foundMessages);
          setCat(foundMessages[0].cat);
        }
      });
    }
  }, [id]);

  function messageIsOurs(message) {
    if (message.sender === user._id) {
      return true;
    }
    return false;
  }

  function chatClasses(message) {
    let classes =
      "relative mb-2 flex justify-between gap-4 py-4 px-10 rounded-2xl";
    if (messageIsOurs(message)) {
      classes += " bg-white border self-end ml-auto shadow-md";
    } else {
      classes += " bg-gray-200 mr-auto";
    }
    return classes;
  }

  function sendReply(e) {
    e.preventDefault();
    if (newReply === "") return;
    const data = { message: newReply, parentMessageId: id };
    setMessages([
      ...messages,
      { ...data, sender: user._id, sentAt: new Date() },
    ]);
    axios.post("/messages", data).then(setNewReply(""));
    42015;
  }

  if (!messages || !ready || !user) {
    return "";
  }

  return (
    <div className="p-2">
      <div className="mt-4 gap-2 flex flex-col items-center justify-center">
        <Link to={`/cat/${cat._id}`}>
          <CatImg
            cat={cat}
            className="shadow-md w-24 aspect-square object-cover rounded-lg"
          />
        </Link>
        <h2 className="text-2xl">{cat.name}</h2>
      </div>
      <div className="flex flex-col gap-4 mt-14">
        {messages.length > 0 &&
          messages.map((message) => (
            <div className={chatClasses(message)}>
              <p>{message.message}</p>
              <p className="text-xs text-gray-500 absolute right-2 -top-5">
                {format(new Date(message.sentAt), "MMM dd HH:mm")}
              </p>
            </div>
          ))}
      </div>
      <div className="my-2 rounded-2xl flex gap-2">
        <input
          type="text"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <button className="primary chat" onClick={(e) => sendReply(e)}>
          Send
        </button>
      </div>

      <Link to={`/account/messages`}>
        <button className="bg-white text-black left-10 top-16 border shadow-md flex p-3 rounded-full fixed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}
