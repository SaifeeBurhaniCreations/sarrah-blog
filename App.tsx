import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Fashion } from './pages/Fashion';
import { Beauty } from './pages/Beauty';
import { Editorials } from './pages/Editorials';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { ArticleDetail } from './pages/ArticleDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ShopProvider } from './context/ShopContext';
import { BlogProvider } from './context/BlogContext';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';

const ScrollToTop = () => {
    const { pathname } = window.location;
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  return (
    <ShopProvider>
      <BlogProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen font-sans text-luxe-charcoal selection:bg-luxe-rose selection:text-luxe-black relative">
            <Navbar />
            <CartDrawer />
            <SearchOverlay />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/fashion" element={<Fashion />} />
                <Route path="/beauty" element={<Beauty />} />
                <Route path="/editorials" element={<Editorials />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </BlogProvider>
    </ShopProvider>
  );
};

export default App;