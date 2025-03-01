import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Stickywall from './pages/Stickywall';
import Daily from './pages/Daily';
import Upcoming from './pages/Upcoming';
import Sidebar from './component/Sidebar';
import Signup from './pages/Signup';
import Login from './pages/Login';
function App() {
  return (
    <Router>
      {/* <Sidebar/> */}
      <Routes>
        <Route path="/Stickywall" element={<Stickywall />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

