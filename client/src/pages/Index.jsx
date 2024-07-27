import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [cats, setCats] = useState([]);
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
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cats.length > 0 &&
        cats.map((cat) => (
          <Link to={"/cat/" + cat._id}>
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {cat.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + cat.photos?.[0]}
                />
              )}
            </div>
            <h2 className="font-bold">{cat.name}</h2>
            <h3 className="text-sm text-gray-500">{getCatAge(cat.age)}</h3>
            <div className="mt-1">
              <span>{cat.location}</span>
            </div>
          </Link>
        ))}
    </div>
  );
}
