import React from 'react';
import About from '../components/About';
import FounderNote from '../components/FounderNote';

const AboutPage: React.FC = () => {
    return (
        <div className="pt-20">
            <About />
            <FounderNote />
        </div>
    );
};

export default AboutPage;
