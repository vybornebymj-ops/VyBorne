```
import React from 'react';

const MarketingBanner: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white py-2.5 text-sm font-medium relative z-50 overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-block">
                <span className="mx-8">Free Shipping on All Orders Over ₹2999 | Limited Time Offer</span>
                <span className="mx-8">Free Shipping on All Orders Over ₹2999 | Limited Time Offer</span>
                <span className="mx-8">Free Shipping on All Orders Over ₹2999 | Limited Time Offer</span>
                <span className="mx-8">Free Shipping on All Orders Over ₹2999 | Limited Time Offer</span>
            </div>
        </div>
    );
};

export default MarketingBanner;
```
