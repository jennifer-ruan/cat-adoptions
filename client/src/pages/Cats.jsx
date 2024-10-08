import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../UserContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CatImg from "../components/CatImg";

export default function Cats() {
  const [cats, setCats] = useState([]);
  const { user, ready } = useContext(UserContext);
  useEffect(() => {
    axios.get("/user-cats").then(({ data }) => {
      setCats(data);
    });
  }, []);
  if (!ready) {
    return "Loading...";
  }
  return (
    <div>
      <AccountNav user={user} />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/cats/new"}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add a cat
        </Link>
      </div>
      <div className="mt-4">
        {cats.length > 0 &&
          cats.map((cat) => (
            <Link
              to={"/account/cats/" + cat._id}
              className="mb-2 flex cursor-pointer gap-4 bg-white p-4 rounded-2xl"
            >
              <div className="flex w-32 h-32 bg-white shrink-0">
                <CatImg cat={cat} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-bold">{cat.name}</h2>
                <p className="text-md mt-1">{cat.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
