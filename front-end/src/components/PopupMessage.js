import React, { useState } from 'react';
import api from '../api/axios';

const SCAN_URL = 'scan/'

const PopupMessage = ({ closePopup }) => {
    const [ipsValue, setIpsValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [error, setError] = useState('');
    const handleInputChange = (e) => {
        setIpsValue(e.target.value);
    };

    const handleSubmit = async () => {
        if (!nameValue || !ipsValue) {
            setError('Name and IP address are required')
            return;
        }

        try {
            const response = await api.post(SCAN_URL, {
                ips: ipsValue,
                name: nameValue
            })

            setError('')
            closePopup()
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.error)
            }
        }
        // closePopup();
    };


    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
            <div className="z-50 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 flex justify-center items-center">Enter IP Address</h2>

                {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                    <span className="font-medium">{error}</span>
                </div>}

                <input
                    type="text"
                    className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
                    placeholder="Name"
                    value={nameValue}
                    onChange={(e) => { setNameValue(e.target.value) }}
                />


                <input
                    type="text"
                    className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
                    placeholder="Enter IP Address"
                    value={ipsValue}
                    onChange={handleInputChange}
                />

                <p className="text-gray-600 mb-4">
                    Please enter an IP address or a network address using CIDR notation/subnet.
                    <br />
                    You can use commas to separate multiple entries and dashes to represent periods.
                    <br />
                    For example: 10.10.10.10, 192.168.1.77-129, 192.168.1.0/24
                </p>

                <div className='flex justify-center items-center'><button onClick={handleSubmit} className="bg-black  text-white font-bold py-2 px-4 rounded-full">Submit</button>
                    <button onClick={closePopup} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full ml-2">Close</button></div>

            </div>
        </div>
    );
};

export default PopupMessage;
