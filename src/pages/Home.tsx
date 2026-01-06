import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import FounderNote from '../components/FounderNote';
import ContactSection from '../components/ContactSection';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <ProductGrid />
            <FounderNote />
            <ContactSection />
        </>
    );
};

export default Home;
