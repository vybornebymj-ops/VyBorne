import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-lg text-gray-500">
                <p className="mb-4">Last Updated: January 2025</p>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">1. Agreement to Terms</h2>
                <p className="mb-4">
                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and VyBorne (“we,” “us” or “our”), concerning your access to and use of the VyBorne website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                </p>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">2. Intellectual Property Rights</h2>
                <p className="mb-4">
                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">3. User Representations</h2>
                <p className="mb-4">
                    By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                </p>
            </div>
        </div>
    );
};

export default TermsOfService;
