import React from 'react';

export const Modal= ({ show, children }) => {

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-black p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                {children}
            </div>
        </div>
    )
}