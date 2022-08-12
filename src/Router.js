import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import MyPage from './pages/MyPage.jsx';
import PostView from './pages/PostView.jsx';
import PostWrite from './pages/PostWrite.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/mypage' element={<MyPage />} />
        <Route exact path='/postView' element={<PostView />} />
        <Route exact path='/postWrite' element={<PostWrite/>} />
        <Route exact path='/postUpdate' element={<PostWrite/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
