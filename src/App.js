import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllMovie from './Pages/All_Movie/AllMovie';
import Detail from './Pages/Detail/Detail';
import HomePage from './Pages/HomePage/HomePage';
import Navbar from './Pages/Navbar/Navbar';
import Search from './Pages/Seacrh/Search';
import Categories from './Pages/Categories/Categories';
import Footer from './Pages/Footer/Footer';
import { createContext } from 'react';
import { useReducer } from 'react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

export const ContextAccses = createContext();

//INISIALISASI
const inisial = {
  isMasuk: '',
  openLogim: false,
  openRegis: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'BELUM_MASUK':
      return {
        isMasuk: true,
      };
    case 'RESET':
      return {
        isMasuk: '',
      };
    case 'LOGIN':
      return {
        ...state,
        openLogin: false,
      };
    case 'REGISTER':
      return {
        ...state,
        openRegis: false,
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, inisial);
  return (
    <div className="App">
      <ContextAccses.Provider value={{ state, dispatch }}>
        <AnimateSharedLayout>
          <AnimatePresence onExitComplete={true} mode="wait">
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/AllMovie" element={<AllMovie />} />
                <Route path="/DetailPage/:id" element={<Detail />} replace />
                <Route path="/Search/:name" element={<Search />} replace />
                <Route path="/categories/:genres" element={<Categories />} replace />
              </Routes>
            </BrowserRouter>
          </AnimatePresence>
        </AnimateSharedLayout>
      </ContextAccses.Provider>
      <Footer />
    </div>
  );
}

export default App;
