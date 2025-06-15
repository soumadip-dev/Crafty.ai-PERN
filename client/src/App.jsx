import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Layout from './pages/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import WriteArticle from './pages/WriteArticle.jsx';
import BlogTitle from './pages/BlogTitle.jsx';
import GenerateImages from './pages/GenerateImages.jsx';
import RemoveBackground from './pages/RemoveBackground.jsx';
import RemoveObject from './pages/RemoveObject.jsx';
import RviewResume from './pages/ReviewResume.jsx';
import Community from './pages/Community.jsx';
import { useAuth } from '@clerk/clerk-react';

const App = () => {
  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then(token => {
      console.log(token);
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitle />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<RviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
