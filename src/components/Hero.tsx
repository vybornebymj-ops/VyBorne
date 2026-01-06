import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/LandingPageVideo.mp4';

const Hero: React.FC = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto animate-fade-in-up">
                    <h1 className="text-5xl tracking-tight font-serif font-bold text-white sm:text-7xl md:text-8xl mb-8 leading-none">
                        <span className="block mb-4 drop-shadow-lg">Curated Elegance</span>
                        <span className="block text-white text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-[0.2em] uppercase opacity-90">
                            For Every Occasion
                        </span>
                    </h1>

                    <p className="mt-8 text-lg text-white/90 sm:text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
                        We own our design and act as proud makers—from sourcing the finest fabrics to crafting every thread with purpose.
                    </p>

                    <div className="mt-12 sm:flex sm:justify-center gap-6">
                        <div className="rounded-none">
                            <Link
                                to="/shop"
                                className="w-full flex items-center justify-center px-10 py-4 border border-white text-base font-medium text-gray-900 bg-white hover:bg-transparent hover:text-white md:text-lg transition-all duration-300 uppercase tracking-widest"
                            >
                                Shop Collection
                            </Link>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Link
                                to="/about"
                                className="w-full flex items-center justify-center px-10 py-4 border border-white text-base font-medium text-white hover:bg-white hover:text-gray-900 md:text-lg transition-all duration-300 uppercase tracking-widest"
                            >
                                Our Story
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
