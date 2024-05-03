import React, { useState } from 'react';

const PopupMessage = ({ onClose }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        // Handle submission logic here
        console.log('Submitted value:', inputValue);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
            <div className="z-50 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Enter IP Address</h2>

                <input
                    type="text"
                    className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
                    placeholder="Enter IP Address"
                    value={inputValue}
                    onChange={handleInputChange}
                />

                <p className="text-gray-600 mb-4">
                    Please enter an IP address or a network address using CIDR notation/subnet.
                    <br />
                    You can use commas to separate multiple entries and dashes to represent periods.
                    <br />
                    For example: 10.10.10.10, 192.168.1.77-129, 192.168.1.0/24
                </p>

                <button onClick={handleSubmit} className="bg-black text-white font-bold py-2 px-4 rounded-full">Submit</button>
                <button onClick={onClose} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full ml-2">Close</button>
            </div>
        </div>
    );
};

export default PopupMessage;
