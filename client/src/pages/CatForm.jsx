import { useEffect, useState, useContext } from "react";
import Preferences from "../components/Preferences";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function CatForm() {
  const { id } = useParams();
  const [isNew, setIsNew] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { user, ready } = useContext(UserContext);

  useEffect(() => {
    if (!id) return;
    axios.get("/cats/" + id).then((response) => {
      const { data } = response;
      setName(data.name);
      setAge(data.age);
      setLocation(data.location);
      setPhotos(data.photos);
      setDescription(data.description);
      setPreferences(data.preferences);
      setIsNew(false);
    });
  }, [id]);

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
  async function saveCat(e) {
    e.preventDefault();
    const catData = {
      name,
      age,
      location,
      photos,
      description,
      preferences,
    };
    if (id) {
      await axios.put("/cats", { id, ...catData });
    } else {
      await axios.post("/cats", catData);
    }
    setRedirect(true);
  }

  async function deleteCat(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this cat?")) {
      alert("Cat has been deleted!");
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/cats"} />;
  }

  if (!ready) {
    return "Loading...";
  }
  return (
    <div>
      <AccountNav user={user} />
      <form onSubmit={saveCat}>
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
        {isNew ? (
          <button className="primary my-4" onClick>
            Create
          </button>
        ) : (
          <div className="flex gap-4">
            <button className="my-4 p-2 w-full rounded-2xl" onClick={deleteCat}>
              Delete
            </button>
            <button className="primary my-4">Save</button>
          </div>
        )}
      </form>
    </div>
  );
}
