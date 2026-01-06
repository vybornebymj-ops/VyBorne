import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import ContactSection from '../components/ContactSection';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <ProductGrid />
            <ContactSection />
        </>
    );
};

export default Home;
