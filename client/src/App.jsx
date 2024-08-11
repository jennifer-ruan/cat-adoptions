import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Profile from "./pages/Profile";
import Adoptions from "./pages/Adoptions";
import CatForm from "./pages/CatForm";
import CatPage from "./pages/CatPage";
import Requests from "./pages/Requests";
import Request from "./pages/Request";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/adopted" element={<Adoptions />} />
          <Route path="/account/adopted/new" element={<CatForm />} />
          <Route path="/account/adopted/:id" element={<CatForm />} />
          <Route path="/cat/:id" element={<CatPage />} />
          <Route path="/account/cats" element={<Requests />} />
          <Route path="/account/cats/:id" element={<Request />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
