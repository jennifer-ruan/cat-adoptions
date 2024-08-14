import { useEffect, useState, useContext } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import CatImg from "../components/CatImg";
import { UserContext } from "../UserContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Requests() {
  const [messages, setMessages] = useState([]);
  const { user, ready } = useContext(UserContext);
  useEffect(() => {
    axios.get("/messages").then((response) => {
      setMessages(response.data);
    });
  }, []);
  if (!ready) {
    return "Loading...";
  }
  return (
    <div>
      <AccountNav user={user} />
      <div>
        {messages?.length > 0 &&
          messages
            .sort((a, b) => (a.sentAt < b.sentAt ? 1 : -1))
            .map((message) => (
              <Link to={`/account/messages/${message._id}`}>
                <div className="mb-2 flex gap-4 border border-gray-200 rounded-2xl overflow-hidden shadow-md shadow-gray-300">
                  <div className="w-24">
                    <CatImg cat={message.cat} />
                  </div>
                  <div className="py-3 grow pr-3">
                    <div className="flex justify-between">
                      <h2 className="text-xl">{message.cat.name}</h2>
                      <p className="text-sm text-gray-500">
                        {format(new Date(message.sentAt), "MMM dd")}
                      </p>
                    </div>
                    <div className="mt-1">{message.message}</div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
