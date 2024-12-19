import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Desc from './Desc';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/desc' element={<Desc />} />
    </Routes>
  );
};

export default Routing;