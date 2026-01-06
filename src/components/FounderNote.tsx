import React from 'react';

const FounderNote: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-serif text-gray-900 mb-8">A Commitment to Authenticity</h2>
                <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                    {/* Decorative quote mark */}
                    <div className="absolute top-4 left-4 text-9xl text-gray-50 opacity-50 font-serif leading-none">"</div>

                    <div className="relative z-10">
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            At VyBorne, we believe that trust is the most valuable fabric we weave.
                            You won't find fake or AI-generated reviews here. Instead, we offer you
                            our unwavering promise: <strong>uncompromised quality in every stitch</strong>.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            We let our craftsmanship speak for itself. We invite you to experience the
                            VyBorne difference firsthand, and we look forward to earning your genuine praise.
                        </p>

                        <div className="mt-8 flex flex-col items-center">
                            <div className="w-16 h-px bg-accent mb-4"></div>
                            <h3 className="text-xl font-medium text-gray-900 font-serif">Hemalatha</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Founder, VyBorne</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderNote;
