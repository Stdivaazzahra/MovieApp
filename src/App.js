import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AllMovie from './Pages/All_Movie/AllMovie';
import Detail from './Pages/Detail/Detail';
import HomePage from './Pages/HomePage/HomePage';
import Navbar from './Pages/Navbar/Navbar';
import Search from './Pages/Seacrh/Search';
import Categories from './Pages/Categories/Categories';

function App() {
  const token = localStorage.getItem('token');
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AllMovie" element={token ? <AllMovie /> : <Navigate to="/" replace />} />
          <Route path="/DetailPage/:id" element={token ? <Detail /> : <Navigate to="/" replace />} />
          <Route path="/Search/:name" element={token ? <Search /> : <Navigate to="/" replace />} />
          <Route path="/categories/:genres" element={token ? <Categories /> : <Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
