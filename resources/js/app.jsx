import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/home/Home';
import ShopPage from './pages/shop/Shop';
import AboutPage from './pages/about/About';
import CartPage from './pages/cart/Cart';
import ProductPage from './pages/product/Product'
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
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>, document.getElementById('root')
);

