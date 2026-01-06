import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import About from '../components/About';
import ProductGrid from '../components/ProductGrid';
import ContactSection from '../components/ContactSection';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <CategorySection />
            <About />
            <ProductGrid />
            <ContactSection />
        </>
    );
};

export default Home;
