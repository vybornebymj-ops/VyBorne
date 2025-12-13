import React, { useEffect, useState } from 'react';
import { FiGlobe } from 'react-icons/fi';

interface LocationGuardProps {
    children: React.ReactNode;
}

const LocationGuard: React.FC<LocationGuardProps> = ({ children }) => {
    // Default to true (allowed) to prevent flashing blocking screen on load/failure
    // Only block if explicitly detected as non-IN
    const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLocation = async () => {
            // Bypass for testing ?geo_bypass=true
            const params = new URLSearchParams(window.location.search);
            if (params.get('geo_bypass') === 'true') {
                setIsAllowed(true);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();

                // Allow only India ('IN')
                const isIndia = data.country_code === 'IN';
                setIsAllowed(isIndia);

                if (!isIndia) {
                    console.log(`Access restricted. User location: ${data.country_name}`);
                }
            } catch (error) {
                console.error('Failed to determine location, defaulting to allowed:', error);
                // Fail open: allow access if API fails to avoid blocking legitimate users on network errors
                setIsAllowed(true);
            } finally {
                setLoading(false);
            }
        };

        checkLocation();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (isAllowed === false) {
        return (
            <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                    <FiGlobe size={48} className="text-gray-400" />
                </div>
                <h1 className="text-4xl font-serif text-gray-900 mb-4">We're Going Global Soon</h1>
                <p className="max-w-md text-gray-600 text-lg mb-8 leading-relaxed">
                    VyBorne is currently available exclusively in India. We are working hard to bring our collections to your region.
                </p>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 max-w-sm w-full">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-2">Stay Updated</p>
                    <p className="text-gray-900">Follow us on social media for launch announcements.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default LocationGuard;
