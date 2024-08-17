import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Adoptions from "./Cats";
import AccountNav from "../components/AccountNav";

export default function Profile() {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "settings";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav user={user} />
      {subpage === "settings" && (
        <div className="text-center max-w-lg mx-auto text-lg font-bold">
          Logged in as {user.name} ({user.email})
          <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "adopted" && <Adoptions />}
    </div>
  );
}
