import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Home from "../../pages/Home/Home";
import LoginForm from "../../pages/LoginForm/LoginForm";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

const App = () => {
  return (
    <div className="app">
      <Nav />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/user/login" element={<LoginForm />} />

          {/* <Route path="/user/signup" element={<h1>Page (Inscription)</h1>} /> */}

          {/* route dynamique */}

          <Route path="/user/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
