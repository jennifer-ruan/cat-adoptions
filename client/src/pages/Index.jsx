import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [cats, setCats] = useState([]);
  const [ageFilter, setAgeFilter] = useState("All");
  useEffect(() => {
    axios.get("/cats").then((res) => {
      setCats(res.data);
    });
  }, []);

  function getCatAge(age) {
    if (age < 1) {
      return "Kitten";
    }
    if (age < 4) {
      return "Young";
    }
    if (age < 10) {
      return "Adult";
    }
    return "Senior";
  }

  function filterCats() {
    if (ageFilter === "All") return cats;
    return cats.filter((cat) => getCatAge(cat.age) === ageFilter);
  }

  const filteredCats = filterCats();
  return (
    <div>
      <div className="flex justify-center items-start mt-6">
        <div className="bg-white flex gap-2 border border-gray-300 rounded-full py-2 px-8 text-xl">
          <div>I'm looking for...</div>
          <select onChange={(e) => setAgeFilter(e.target.value)}>
            <option selected value="All">
              All ages
            </option>
            <option value="Kitten">Kittens</option>
            <option value="Young">Youth</option>
            <option value="Adult">Adults</option>
            <option value="Senior">Seniors</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCats.length > 0 &&
          filteredCats.map((cat) => (
            <Link
              to={"/cat/" + cat._id}
              className="bg-white rounded-2xl overflow-hidden shadow shadow-md"
            >
              <div className="flex mb-2">
                {cat.photos?.[0] && (
                  <img
                    className="object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + cat.photos?.[0]}
                  />
                )}
              </div>
              <div className="px-4 pb-2">
                <h2 className="font-bold text-2xl">{cat.name}</h2>
                <h3 className="text-md text-gray-500">{getCatAge(cat.age)}</h3>
                <div className="mt-1">
                  <span>{cat.location}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
