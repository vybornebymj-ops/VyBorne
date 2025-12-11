import React from 'react';
import { FiX } from 'react-icons/fi';

interface SizeGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <FiX size={24} />
                        </button>
                    </div>

                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <h3 className="text-xl leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                                Size Guide
                            </h3>
                            <div className="mt-2 text-sm text-gray-500">
                                <p className="mb-4">Use the chart below to determine your size. If you are between sizes, we recommend sizing up.</p>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust (in)</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist (in)</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hips (in)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">XS</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">32</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">24</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">34</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">S</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">34</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">26</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">36</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">M</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">36</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">28</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">38</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">L</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">38</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">30</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">40</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">XL</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">40</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">32</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">XXL</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">34</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">44</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SizeGuideModal;
