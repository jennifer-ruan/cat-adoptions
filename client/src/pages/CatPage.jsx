import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
            <h2 className="text-3xl">Photos of {cat.name}</h2>
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
    <div className="mt-4 bg-gray-100 -m-8 px-8 py-8">
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
                  className="aspect-square object-cover min-w-full"
                  src={"http://localhost:4000/uploads/" + cat.photos[0]}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {cat.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + cat.photos[1]}
              />
            )}
            {cat.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  className="aspect-square object-cover relative top-2"
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
      <div className="my-4">
        <h2 className="font-semibold text-2xl">Description</h2>
        {cat.description}
      </div>
      <div className="grid grid-cols-2">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
