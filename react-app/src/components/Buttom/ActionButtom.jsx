import React from 'react';

export const ActionButtom = ({ onClick, icon, text, className = "bg-yellow-300 hover:bg-yellow-200" }) => {
    return (
        <button
            type="button"
            className={`${className} text-gray-800 my-3 py-2 px-4 rounded flex items-center space-x-2`}
            onClick={onClick}
        >
            <img src={icon} width="22" height="22" />
            <span>{text}</span>
        </button>
    )
}