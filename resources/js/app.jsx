import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import ProductPage from './pages/Product'
import ErrorPage from './pages/Error';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <Router>
    <div className="App">
      <Header />
      <div className="App-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
          {/* <Route path="/cart" element={<CartPage />} /> */}
      </div>
      <Footer />
    </div>
  </Router>, document.getElementById('root')
);

