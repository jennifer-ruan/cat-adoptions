import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import CatImg from "../components/CatImg";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
          messages.map((message) => (
            <Link to={`/account/messages/${message._id}`}>
              <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
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
