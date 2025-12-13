import Header from './components/Header';
import About from './components/About';
import CategorySection from './components/CategorySection';
import ContactSection from './components/ContactSection';
import LocationGuard from './components/LocationGuard';
import NewsletterModal from './components/NewsletterModal';
import CookieBanner from './components/CookieBanner';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <LocationGuard>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
          <Header />
          <CartSidebar />
          <main className="flex-grow">
            <Hero />
            <CategorySection />
            <About />
            <ProductGrid />
            <ContactSection />
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
