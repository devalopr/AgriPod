import './App.css'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sigin from './components/SiginIn';
import User from './components/User';
import Monitor from './components/Monitor';
import KnowledgeBase from './components/KnowledgeBase';
import Chat from './components/Chat';
import Drone from './components/Drone';
import Scheme from './components/Scheme';
import Marketplace from './components/Marketplace';
import Analyze from './components/Analyze';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Sigin />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/monitor" element={<Monitor />}></Route>
          <Route path="/base" element={<KnowledgeBase />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/drone" element={<Drone />}></Route>
          <Route path="/scheme" element={<Scheme />}></Route>
          <Route path="/marketplace" element={<Marketplace />}></Route>
          <Route path="/analyze" element={<Analyze />}></Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App
