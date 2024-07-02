import { useState } from "react";
import Preferences from "../components/Preferences";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";

export default function CatForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [preferences, setPreferences] = useState([]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewCat(e) {
    e.preventDefault();
    await axios.post("/cats", {
      name,
      age,
      location,
      photos,
      description,
      preferences,
    });
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewCat}>
        {preInput("Name", "name of the cat.")}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name, for example: 'Karma'"
        />
        {preInput("Age", "age of the cat.")}
        <div className="flex mt-2 gap-4">
          <div className="flex gap-1 items-end">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="0"
            />
            <h3 className="mb-1">years</h3>
          </div>
        </div>
        {preInput("City", "location of the cat.")}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="city, state"
        />
        {preInput("Photos", "more = better.")}
        <PhotosUploader photos={photos} onChange={setPhotos} />
        {preInput(
          "Description",
          "the cat's backstory, personality, any special concerns."
        )}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=""
        />
        {preInput("Preferences", "likes and dislikes.")}
        <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Preferences selected={preferences} onChange={setPreferences} />
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
