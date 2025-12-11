import Header from './components/Header';
import About from './components/About';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        <CartSidebar />
        <main className="flex-grow">
          <Hero />
          <About />
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
