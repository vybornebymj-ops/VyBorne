import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import CategorySection from '../components/CategorySection';
import ProductGrid from '../components/ProductGrid';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <TrustBar />
            <ProductGrid limit={8} showViewAll />
            <CategorySection />
        </>
    );
};

export default Home;
