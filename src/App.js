import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard/MainScreen';
import Account from './Pages/Dashboard/Account';
import Calculator from './Pages/Dashboard/Calculator';
import Bridge from './Pages/Dashboard/Bridge';
import PageNotFound from './Pages/404/error';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/asasgbvfdfsad-bridge-sdfsdfsdsdfsaf" element={<Bridge />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
