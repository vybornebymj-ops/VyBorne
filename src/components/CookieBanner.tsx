import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BiCookie } from 'react-icons/bi';

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true, // Always true
        analytics: true,
        marketing: true
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Delay slightly to not conflict with newsletter animation
            setTimeout(() => {
                setIsVisible(true);
            }, 1000);
        }
    }, []);

    const savePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem('cookie_consent', JSON.stringify(prefs));
        setIsVisible(false);
    };

    const handleAcceptAll = () => {
        savePreferences({ necessary: true, analytics: true, marketing: true });
    };

    const handleRejectAll = () => {
        savePreferences({ necessary: true, analytics: false, marketing: false });
    };

    const handleSavePreferences = () => {
        savePreferences(preferences);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-40 p-4 animate-slide-up">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-6 md:p-8">

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <BiCookie className="text-accent text-xl" />
                            <h3 className="text-lg font-serif font-medium text-gray-900">We use cookies</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
                            By clicking "Accept All", you consent to our use of cookies.
                        </p>

                        <button
                            onClick={() => setShowPreferences(!showPreferences)}
                            className="text-sm font-medium text-gray-900 underline hover:text-accent flex items-center gap-1"
                        >
                            {showPreferences ? 'Hide Preferences' : 'Manage Preferences'}
                            {showPreferences ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                    </div>

                    {/* Buttons (Desktop Right) */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start md:items-center justify-end whitespace-nowrap">
                        {!showPreferences && (
                            <>
                                <button
                                    onClick={handleRejectAll}
                                    className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
                                >
                                    Reject All
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black transition-colors w-full sm:w-auto"
                                >
                                    Accept All
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Preferences Details */}
                {showPreferences && (
                    <div className="mt-8 border-t border-gray-100 pt-6 space-y-4 animate-fade-in">
                        {/* Necessary */}
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Necessary</h4>
                                <p className="text-xs text-gray-500 mt-1">Essential for the website to function.</p>
                            </div>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-not-allowed opacity-70">
                                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                            </div>
                        </div>

                        {/* Analytics */}
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Analytics</h4>
                                <p className="text-xs text-gray-500 mt-1">Help us understand how you use the site.</p>
                            </div>
                            <button
                                onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${preferences.analytics ? 'bg-accent' : 'bg-gray-200'}`}
                            >
                                <span className={`${preferences.analytics ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
                            </button>
                        </div>

                        {/* Marketing */}
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Marketing</h4>
                                <p className="text-xs text-gray-500 mt-1">Used to deliver relevant advertisements.</p>
                            </div>
                            <button
                                onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${preferences.marketing ? 'bg-accent' : 'bg-gray-200'}`}
                            >
                                <span className={`${preferences.marketing ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
                            </button>
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={handleRejectAll}
                                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={handleSavePreferences}
                                className="px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black transition-colors"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CookieBanner;
