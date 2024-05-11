import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import NBar from '../components/NBar';
import './ContactStyles.css';
import { MdContacts } from "react-icons/md";

export default function Contact() {
  return (
    <>
        <NBar />
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="form-container rounded-2xl w-6/12 p-20 custom-shadow text-center">
        <div className="flex items-center justify-center mb-4">
          <MdContacts className="text-blue-500 mr-2 text-3xl" />
          <h2 className="text-3xl font-bold mb-0 mr-3">Contact</h2>
        </div>
        <p className="mb-4">You can reach out to us on:</p>
        <div className="flex flex-col space-y-4">
          <button
            className="flex items-center justify-start bg-black text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            onClick={() => window.open('https://twitter.com/ImY7Ya', '_blank')}
            >
            <FaXTwitter className="ml-6" />
            <span className='ml-2'>Yahya</span>
          </button>
          <button
            className="flex items-center justify-start bg-black text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            onClick={() => window.open('https://www.linkedin.com/in/yahyamajrashi', '_blank')}
            >
            <FaLinkedin className="ml-6" />
            <span className='ml-2'>Yahya</span>
          </button>
          <button
            className="flex items-center justify-start bg-black text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            onClick={() => window.open('https://twitter.com/Mohammed0x01', '_blank')}
            >
            <FaXTwitter className="ml-6" />
            <span className='ml-2'>Mohammed</span>

          </button>
          <button
            className="flex items-center justify-start bg-black text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            onClick={() => window.open('https://www.linkedin.com/in/mohammed-fahd-alzahrani/', '_blank')}
            >
            <FaLinkedin className="ml-6" />
            <span className='ml-2'>Mohammed</span>

          </button>
        </div>
      </div>
    </div>
            </>
  );
}
