import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageForm from "../components/MessageForm";

export default function CatPage() {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/cats/${id}`).then((res) => {
      setCat(res.data);
    });
  }, [id]);

  if (!cat) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4 justify-center">
          <div>
            <h2 className="text-3xl mr-48">Photos of {cat.name}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="bg-white text-black right-12 top-8 shadow shadow-black flex gap-1 py-2 px-4 rounded-2xl fixed"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {cat?.photos?.length > 0 &&
            cat.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white rounded-xl mb-2 -m-8 px-8 py-8">
      <h1 className="text-3xl">{cat.name}</h1>
      <h2 className="my-3 block font-semibold flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        SHELTER_NAME
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {cat.location}
      </h2>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {cat.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover min-w-full"
                  src={"http://localhost:4000/uploads/" + cat.photos[0]}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {cat.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + cat.photos[1]}
              />
            )}
            {cat.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + cat.photos[2]}
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 rounded-2xl bg-white shadow shadow-md shadow-gray-500"
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show more photos
        </button>
      </div>
      <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_2fr]">
        <div className="my-2">
          <h2 className="font-semibold text-2xl">Description</h2>
          {cat.description}
        </div>
        <div>
          <MessageForm cat={cat} />
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
