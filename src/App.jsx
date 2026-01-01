import NavBar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} ></Route>
        <Route path="/test" element={<div>test Page</div>} ></Route>
      </Routes>
      <div className="p-10">
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
