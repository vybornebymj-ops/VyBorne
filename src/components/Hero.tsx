import React from 'react';
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
                <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/10 p-8 md:p-14 rounded-2xl border border-white/20 shadow-2xl animate-fade-in-up">
                    <h1 className="text-4xl tracking-tight font-serif font-bold text-white sm:text-5xl md:text-7xl mb-6">
                        <span className="block mb-2">Curated Elegance</span>
                        <span className="block text-accent-light text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-wide">
                            For Every Occasion
                        </span>
                    </h1>

                    <p className="mt-4 text-base text-gray-100 sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        We own our design and act as proud makers—from sourcing the finest fabrics to crafting every thread with purpose.
                    </p>

                    <div className="mt-10 sm:flex sm:justify-center gap-4">
                        <div className="rounded-md shadow">
                            <a
                                href="#shop"
                                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-gray-900 bg-white hover:bg-gray-100 md:text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Shop Collection
                            </a>
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <a
                                href="#about"
                                className="w-full flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-gray-900 md:text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Our Story
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
