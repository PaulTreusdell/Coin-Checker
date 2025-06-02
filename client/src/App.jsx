import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom" 
import LoginPage from "./scenes/LoginPage"
import HomePage from "./scenes/HomePage";
import CoinChecker from "./scenes/CoinChecker";
import Register from "./scenes/Register";
import Profile from "./scenes/Profile";

function App() {
  const isAuth = true; //Change later
  return (
    <div className="app">
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} /> 
          <Route 
          path="/home" 
          element={isAuth ? <HomePage /> : <Navigate to="/"  />} 
          />
          <Route 
          path="/profile" 
          element={isAuth ? <Profile /> : <LoginPage />} //Same functionality as using Navigate to
          />
          <Route 
          path="/check" 
          element={isAuth ? <CoinChecker /> : <LoginPage />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
