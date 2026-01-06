import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/LandingPageVideo.mp4';

const Hero: React.FC = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Video Background with Slow Zoom */}
            <video
                className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Cinematic Overlay - Gradient for better text readability without dimming everything */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>

            {/* Content - Editorial Layout */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-12 text-center md:text-left">
                <div className="max-w-7xl w-full mx-auto animate-fade-in-up">
                    <h1 className="text-white font-serif font-bold leading-none mb-6">
                        <span className="block text-4xl sm:text-7xl md:text-9xl tracking-tight drop-shadow-2xl opacity-95">
                            Curated Elegance
                        </span>
                        <span className="block mt-3 text-lg sm:text-2xl md:text-3xl font-sans font-light tracking-[0.2em] uppercase text-white/80">
                            For Every Occasion
                        </span>
                    </h1>

                    <div className="h-px w-24 bg-white/50 mb-8 mx-auto md:mx-0"></div>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start tracking-wide">
                        <p className="text-sm text-gray-200 md:text-base max-w-lg font-light leading-relaxed text-shadow-sm">
                            We own our design and act as proud makers—from sourcing the finest fabrics to crafting every thread with purpose.
                        </p>

                        <div className="flex gap-6">
                            <Link
                                to="/shop"
                                className="group relative px-8 py-3 bg-white text-gray-900 overflow-hidden text-xs uppercase tracking-[0.2em] font-medium hover:text-white transition-colors duration-300"
                            >
                                <span className="relative z-10">Shop Collection</span>
                                <div className="absolute inset-0 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                            </Link>

                            <Link
                                to="/about"
                                className="group relative px-8 py-3 text-white border border-white/30 text-xs uppercase tracking-[0.2em] font-medium hover:border-white transition-colors duration-300"
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
