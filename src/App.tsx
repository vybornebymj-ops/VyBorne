import MarketingBanner from './components/MarketingBanner';
import Header from './components/Header';
import LocationGuard from './components/LocationGuard';
import NewsletterModal from './components/NewsletterModal';
import CookieBanner from './components/CookieBanner';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy';

import Shop from './pages/Shop';

import AboutPage from './pages/AboutPage';

function App() {
  useEffect(() => {
    if (window.location.pathname === '/whatsapp') {
      window.location.href = 'https://api.whatsapp.com/send?phone=919963581446';
    }
  }, []);

  return (
    <CartProvider>
      <LocationGuard>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
          <MarketingBanner />
          <Header />
          <CartSidebar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
            </Routes>
          </main>
          <Footer />
          <NewsletterModal />
          <CookieBanner />
        </div>
      </LocationGuard>
    </CartProvider>
  );
}

export default App;
