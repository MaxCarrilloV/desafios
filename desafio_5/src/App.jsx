import "./App.css";
import CountryList from "./components/CountryList";
import logo from "./resources/Logo.svg";
import { Routes, Route } from "react-router-dom";
import Country from "./components/Country";
function App() {
  return (
    <main className="main">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Routes>
        <Route path="/" element={<CountryList />}/>
        <Route path="/:code" element={<Country />} />
      </Routes>
    </main>
  );
}

export default App;
