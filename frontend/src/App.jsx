import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/signup'
          element={!user ? <Signup /> : <Navigate to='/' />}
        />
      </Routes>
    </Router>
  );
}

export default App;
