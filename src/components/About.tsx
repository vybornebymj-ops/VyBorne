import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="bg-orange-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-serif text-gray-900 mb-8">Founder's Message</h2>

                <div className="prose prose-lg mx-auto text-gray-700 italic">
                    <p className="mb-6">
                        From the very beginning, VyBorně was imagined as more than a fashion label—it was envisioned as a feeling. A feeling of confidence, elegance, and purpose woven into every thread.
                    </p>

                    <p className="mb-6">
                        As someone who believes that clothing holds the power to shape how we express ourselves, I often found myself questioning one thing:
                        <br />
                        <span className="font-medium">Why should we choose between looking extraordinary and living responsibly?</span>
                    </p>

                    <p className="mb-6">
                        VyBorně was born from that question.
                    </p>

                    <p className="mb-6">
                        I wanted to create a brand that celebrates the modern woman—her strength, her individuality, her dreams—while honoring the planet she walks on. A brand where Western chic, ethnic grace, and Indo-western creativity blend effortlessly with mindful craftsmanship.
                    </p>

                    <p className="mb-6">
                        Every piece at VyBorně reflects what I care about most:
                        <br />
                        timeless design, thoughtful sustainability, and a deep respect for the people who craft our garments.
                    </p>

                    <p className="mb-6">
                        Our mission is simple—
                        <br />
                        to empower women to express their true selves through fashion that feels good, looks exquisite, and leaves a positive impact.
                    </p>

                    <p className="mb-8">
                        To every woman who chooses VyBorně:
                        <br />
                        Thank you for believing in conscious fashion. Thank you for choosing pieces that tell a story—your story.
                    </p>

                    <p className="font-bold text-xl mb-2">
                        Together, let’s redefine the future of fashion: bold, beautiful, and sustainable.
                    </p>

                    <div className="mt-8 pt-6 border-t border-orange-200 inline-block px-12">
                        <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">With gratitude and vision,</p>
                        <p className="font-script text-2xl text-accent">Hemalatha Kalavakolli</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
