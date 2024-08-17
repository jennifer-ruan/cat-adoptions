import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="relative flex justify-between items-center">
      <div className="w-1/3"></div>

      <Link
        to={"/"}
        className="absolute left-1/2 transform -translate-x-1/2 flex items-centered gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 56 56 "
        >
          <g fill="none">
            <path
              stroke="#80471c"
              stroke-linecap="round"
              stroke-width="4"
              d="M42 26C42 34.8366 33.9411 42 24 42C14.0589 42 6 34.8366 6 26M15 12.1405C17.6476 10.7792 20.7214 10 24 10C27.2786 10 30.3524 10.7792 33 12.1405"
            />
            <path
              stroke="#80471c"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M6 26V8.48814C6 6.757 8.05005 5.84346 9.33729 7.00098L15 12.093"
            />
            <path
              stroke="#80471c"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M42 26V8.48814C42 6.757 39.9499 5.84346 38.6627 7.00098L33 12.093"
            />
            <circle cx="30" cy="22" r="2" fill="#80471c" />
            <circle cx="18" cy="22" r="2" fill="#80471c" />
            <circle cx="24" cy="28" r="2" fill="#80471c" />
            <path
              stroke="#80471c"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M16 30L4 31"
            />
            <path
              stroke="#80471c"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M19 35L7 41"
            />
            <path
              stroke="#80471c"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M32 30L44 31"
            />
            <path
              stroke="#80471c"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M29 35L41 41"
            />
          </g>
        </svg>
        <span className="satisfy-regular text-4xl">Adopt a Cat</span>
      </Link>

      <Link
        to={user ? "/account" : "/login"}
        className="bg-white flex items-centered gap-2 border border-gray-300 rounded-full py-2 px-4"
      >
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
    </header>
  );
}

/**
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>I'm looking for...</div>
        <select>
          <option selected disabled>
            Age
          </option>
          <option>Kittens</option>
          <option>Youth</option>
          <option>Adults</option>
          <option>Seniors</option>
        </select>.
        at
        <select>
          Location
        </select>
      </div>
 */
