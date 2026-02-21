import React from 'react';

interface TrustItem {
    icon: string;
    title: string;
    subtitle: string;
}

const items: TrustItem[] = [
    { icon: '🌿', title: 'Sustainable Fabrics', subtitle: 'Ethically sourced materials' },
    { icon: '↩', title: 'Easy Returns', subtitle: '7-day hassle-free returns' },
    { icon: '🔒', title: 'Secure Checkout', subtitle: 'Razorpay encrypted payments' },
    { icon: '🚚', title: 'Free Shipping', subtitle: 'On orders above ₹999' },
];

const TrustBar: React.FC = () => {
    return (
        <section className="bg-blush border-y border-stone/10 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-stone/15">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center text-center px-4 gap-2 scroll-reveal"
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <span className="text-3xl">{item.icon}</span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-ultra text-charcoal">{item.title}</p>
                                <p className="text-xs text-stone mt-0.5 font-display">{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
