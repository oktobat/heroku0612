import React, {useState} from 'react';
import {Route, Routes}  from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Community from './pages/Community'
import About from './pages/About'
import News from './pages/News'
import Product from './pages/Product'
import Login from './pages/Login'
import Join from './pages/Join'
import Store from './pages/Store'
import { AirContext } from './context/AirContext'

const App = () => {

  const [active, setActive] = useState(0)
  const [loging, setLoging] = useState(false)

  return (
    <AirContext.Provider value={{active, setActive, loging, setLoging}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/news" element={<News />} />
          <Route path="/community" element={<Community />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>
      </Routes>
    </AirContext.Provider>
  );
};

export default App;