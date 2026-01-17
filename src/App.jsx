import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import EditProfile from "./components/EditProfile";
import UserCard from "./components/UserCard";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Requests from "./components/Requests";

const AppRoutes = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Body />}>

        {/* Home route */}
        <Route
          index
          element={
            <div
              className="
                min-h-screen
                bg-gradient-to-br from-gray-800 via-gray-900 to-black
                flex justify-center items-start
                p-6
                overflow-y-auto
                pb-32
              "
            >
              <UserCard user={user} />
            </div>
          }
        />

        <Route path="login" element={<Login />} />
        <Route path="feed" element={<Feed />} />
        <Route path="profile" element={<Profile />} />
        <Route path="connections" element={<Connections />} />
        <Route path="edit-profile" element={<EditProfile user={user} />} />
        <Route path="requests" element={<Requests />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
