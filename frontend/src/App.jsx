import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pets } from "./components/Pets/Pets";
import { Users } from "./components/Users/Users";
import { Main } from "./components/Main/Main";
import { User } from "./components/Users/User";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users" element={<Users />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/user/:idUser" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
