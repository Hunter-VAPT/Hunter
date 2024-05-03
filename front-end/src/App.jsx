import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Scan from './Pages/Scan';
import Contact from './Pages/Contact';
import Manual from './Pages/Manual';
import { LoginSignup } from './components/LoginSignup/LoginSignup';
import NBar from './components/NBar';
import Home from './Pages/Home';
import ScanResult from './Pages/ScanResult';
import Vuln from './Pages/Vuln';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route index element={<Home />} />

          <Route path="/home" element={<Home />} />

          <Route path="/scan" element={<Scan />} />

          <Route path="/manual" element={<Manual />} />

          <Route path="/contact" element={<Contact />} />

          <Route path='/LoginSignup' element={<LoginSignup/>} />

          <Route path='/ScanResult' element={<ScanResult />} />

          <Route path='/Vuln' element={<Vuln />} />
        </Routes>

      </BrowserRouter>

    </div >
  );
}

export default App;
