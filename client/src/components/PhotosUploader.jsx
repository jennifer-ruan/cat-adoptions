import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ photos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: fileName } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((photos) => {
      return [...photos, fileName];
    });
    setPhotoLink("");
  }
  function uploadPhoto(e) {
    const { files } = e.target;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: fileNames } = res;
        onChange((photos) => {
          return [...photos, ...fileNames];
        });
      });
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder={"Add using a link...jpg"}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 grow px-4 rounded-2xl"
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photos.length > 0 &&
          photos.map((link) => (
            <div className="h-32 flex" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:4000/uploads/" + link}
              ></img>
            </div>
          ))}
        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}
