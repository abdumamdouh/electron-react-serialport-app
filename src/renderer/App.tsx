import { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Main from './pages/Main';
import Menu from './components/Menu/Menu';

export default function App() {
  useEffect(() => {
    // disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Menu />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
