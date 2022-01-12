import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import PartnerWithUs from './components/PartnerWithUs'
import Feedback from './components/Feedback'
import Login from './components/Login';
import Signup from './components/Signup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Admin from './components/Admin';
import Notestate from './context/notes/Notestate';



toast.configure()
function App() {

  return (
    <>
      <Notestate>
        <Router>
          <Navbar toast={toast} />
          <div className="mainbody" style={{ marginTop: "5rem" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/partner" element={<PartnerWithUs toast={toast} />} />
              <Route path="/admin" element={<Admin toast={toast} />} />
              <Route path="/feedback" element={<Feedback toast={toast} />} />
              <Route path="/login" element={<Login toast={toast} />} />
              <Route path="/signup" element={<Signup toast={toast} />} />
            </Routes>
          </div>
        </Router>
      </Notestate>

    </>
  );
}

export default App;
