import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Stickywall from './pages/Stickywall';
import Daily from './pages/Daily';
import Upcoming from './pages/Upcoming';
import Sidebar from './component/Sidebar';
function App() {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/Stickywall" element={<Stickywall />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/upcoming" element={<Upcoming />} />
      </Routes>
    </Router>
  );
}

export default App;
