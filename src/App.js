import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMovie from "./Pages/All_Movie/AllMovie";
import Detail from "./Pages/Detail/Detail";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./Pages/Navbar/Navbar";
import Search from "./Pages/Seacrh/Search";
import Categories from "./Pages/Categories/Categories";
import Footer from "./Pages/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AllMovie" element={<AllMovie />} />
          <Route path="/DetailPage/:id" element={<Detail />} replace />
          <Route path="/Search/:name" element={<Search />} replace />
          <Route path="/Categories/:genres" element={<Categories />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
