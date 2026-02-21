import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/LandingPageVideo.mp4';

/* ── Marquee Strip ────────────────────────────────────── */
const marqueeItems = [
    'Western', 'Ethnic', 'Indo-Western', 'Sustainable', 'Curated',
    'Western', 'Ethnic', 'Indo-Western', 'Sustainable', 'Curated',
];

const Hero: React.FC = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Layered Gradient Overlay — warmer, more editorial */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/20 to-charcoal/65" />

            {/* Center-aligned Editorial Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

                {/* Pre-title tag */}
                <p className="text-cream/60 text-2xs tracking-mega uppercase mb-6 animate-stagger-1 opacity-0">
                    New Collection · 2026
                </p>

                {/* Main Headline */}
                <h1 className="font-serif text-cream leading-none mb-0 animate-stagger-2 opacity-0">
                    <span className="block text-5xl sm:text-7xl md:text-9xl font-bold tracking-tight text-shadow drop-shadow-2xl">
                        Curated
                    </span>
                    <span className="block text-5xl sm:text-7xl md:text-9xl font-bold tracking-tight text-shadow drop-shadow-2xl mt-1">
                        Elegance
                    </span>
                </h1>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8 animate-stagger-3 opacity-0">
                    <div className="h-px w-16 bg-cream/30" />
                    <span className="text-accent text-2xs tracking-ultra uppercase">For Every Occasion</span>
                    <div className="h-px w-16 bg-cream/30" />
                </div>

                {/* Subtext */}
                <p className="text-cream/75 max-w-md font-display text-base sm:text-lg font-light leading-relaxed mb-10 animate-stagger-3 opacity-0">
                    From sourcing the finest fabrics to crafting every thread with purpose — we own our design.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 animate-stagger-4 opacity-0">
                    <Link
                        to="/shop"
                        className="group relative px-10 py-3.5 bg-cream text-charcoal overflow-hidden text-2xs uppercase tracking-ultra font-semibold hover:text-cream transition-colors duration-400"
                    >
                        <span className="relative z-10">Shop Collection</span>
                        <div className="absolute inset-0 bg-charcoal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400 ease-luxury" />
                    </Link>

                    <Link
                        to="/about"
                        className="px-10 py-3.5 text-cream border border-cream/40 hover:border-cream hover:bg-cream/10 text-2xs uppercase tracking-ultra font-semibold transition-all duration-300"
                    >
                        Our Story
                    </Link>
                </div>

                {/* Scroll cue */}
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-stagger-4 opacity-0">
                    <span className="text-cream/40 text-2xs tracking-ultra uppercase">Scroll</span>
                    <div className="w-px h-10 bg-gradient-to-b from-cream/40 to-transparent" />
                </div>
            </div>

            {/* Bottom Marquee Strip */}
            <div className="absolute bottom-0 left-0 right-0 bg-charcoal/80 backdrop-blur-xs border-t border-cream/10 py-3 overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee">
                    {marqueeItems.map((item, i) => (
                        <React.Fragment key={i}>
                            <span className="text-cream/60 text-2xs tracking-ultra uppercase mx-6">{item}</span>
                            <span className="text-accent text-2xs mx-2">✦</span>
                        </React.Fragment>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {marqueeItems.map((item, i) => (
                        <React.Fragment key={`d-${i}`}>
                            <span className="text-cream/60 text-2xs tracking-ultra uppercase mx-6">{item}</span>
                            <span className="text-accent text-2xs mx-2">✦</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
