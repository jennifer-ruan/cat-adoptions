import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Request() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/messages").then((response) => {
        const foundMessage = response.data.find(({ _id }) => _id === id);
        if (foundMessage) {
          setMessage(foundMessage);
        }
      });
    }
  }, [id]);
  if (!message) {
    return "";
  }
  return <div>single booking: {id}</div>;
}
