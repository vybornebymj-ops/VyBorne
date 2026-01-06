import React from 'react';

const ShippingPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shipping & Returns</h1>
            <div className="prose prose-lg text-gray-500">

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Shipping Policy</h2>
                <p className="mb-4">
                    <strong>Processing Time:</strong> All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays.
                </p>
                <p className="mb-4">
                    <strong>Shipping Rates & Delivery Estimates:</strong> Shipping charges for your order will be calculated and displayed at checkout. Estimated delivery time is 5-7 business days for standard shipping.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Return Policy</h2>
                <p className="mb-4">
                    <strong>Return Window:</strong> You have 7 calendar days to return an item from the date you received it.
                </p>
                <p className="mb-4">
                    <strong>Eligibility:</strong> To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging. Your item needs to have the receipt or proof of purchase.
                </p>
                <p className="mb-4">
                    <strong>Refunds:</strong> Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment).
                </p>
            </div>
        </div>
    );
};

export default ShippingPolicy;
