import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import CategorySection from '../components/CategorySection';
import ProductGrid from '../components/ProductGrid';
import About from '../components/About';
import ContactSection from '../components/ContactSection';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <TrustBar />
            <ProductGrid limit={8} showViewAll />
            <CategorySection />
            <About />
            <ContactSection />
        </>
    );
};

export default Home;
