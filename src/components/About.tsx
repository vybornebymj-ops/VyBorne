import React, { useState, useEffect } from 'react';
import floralDress from '../assets/founder-images/floral-dress.png';
import blueDress from '../assets/founder-images/blue-dress.png';
import officeDress from '../assets/founder-images/office-dress.png';

const About: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [floralDress, blueDress, officeDress];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000); // Change image every 6 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section id="about" className="relative py-24 overflow-hidden min-h-[600px] flex items-center">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Founder's Vision ${index + 1}`}
                            className="w-full h-full object-cover animate-ken-burns"
                        />

                        {/* Dark Gradient Overlay for readability */}
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-10 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Founder's Message
                </h2>

                <div className="prose prose-lg prose-invert mx-auto italic leading-relaxed text-gray-50 drop-shadow-md font-medium">
                    <p className="mb-8 text-xl">
                        From the very beginning, VyBorně was imagined as more than a fashion label—it was envisioned as a feeling. A feeling of confidence, elegance, and purpose woven into every thread.
                    </p>

                    <p className="mb-8">
                        As someone who believes that clothing holds the power to shape how we express ourselves, I often found myself questioning one thing:
                        <br />
                        <span className="font-semibold text-orange-200 text-xl block mt-4">"Why should we choose between looking extraordinary and living responsibly?"</span>
                    </p>

                    <p className="mb-8">
                        VyBorně was born from that question.
                    </p>

                    <p className="mb-8">
                        I wanted to create a brand that celebrates the modern woman—her strength, her individuality, her dreams—while honoring the planet she walks on. A brand where Western chic, ethnic grace, and Indo-western creativity blend effortlessly with mindful craftsmanship.
                    </p>

                    <p className="mb-8">
                        Every piece at VyBorně reflects what I care about most:
                        <br />
                        <span className="text-orange-100">timeless design, thoughtful sustainability, and a deep respect for the people who craft our garments.</span>
                    </p>

                    <p className="mb-10">
                        Our mission is simple—
                        <br />
                        to empower women to express their true selves through fashion that feels good, looks exquisite, and leaves a positive impact.
                    </p>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 inline-block shadow-2xl border border-white/20">
                        <p className="mb-6 font-medium">
                            To every woman who chooses VyBorně:<br />
                            Thank you for believing in conscious fashion. Thank you for choosing pieces that tell a story—your story.
                        </p>
                        <p className="font-bold text-2xl text-orange-50">
                            Together, let’s redefine the future of fashion: bold, beautiful, and sustainable.
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/30 inline-block px-12">
                        <p className="text-sm uppercase tracking-wide text-gray-300 mb-2">With gratitude and vision,</p>
                        <p className="font-script text-3xl text-orange-200">Hemalatha Kalavakolli</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
