import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/SignIn'; 
import SignUp from './Components/SignUp';
import Feeds from './Components/Feeds';
import PostCard from './Components/PostCard';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/posts" element={<PostCard />} />
      </Routes>
    </Router>
  );
}

export default App;
