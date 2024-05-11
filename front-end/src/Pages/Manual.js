import NBar from "../components/NBar";
import React from 'react';
import { BsInfoCircleFill, BsBook, BsSearch, BsCheckCircle, BsListCheck } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";


export default function Manual() {
  return (
    <>
        <NBar />
    <div className="flex justify-center items-center mt-32 bg-white">
      <div className="rounded-2xl p-16 custom-shadow">
        <h2 className="text-3xl font-bold mb-8 text-center mr-7	">
          <FaBook className="inline-block mr-2 text-blue-500 text-3xl" />
          Manual
        </h2>


        <div className="py-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FiInfo className="mr-2 text-blue-500 ml-2" />
            Introduction
          </h3>
          <p className="text-lg text-left mb-0 ml-2">
            Here, you'll find instructions to help you use Hunter software.
          </p>

        </div>

        <div className="py-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <BsSearch className="mr-2 text-blue-500 ml-2" />
            Scanning
          </h3>
          <p className="text-lg text-left mb-3 ml-2">
            To get started, simply follow the steps outlined below:
          </p>
          <ol className="list-decimal text-lg text-left pl-10 ml-2">
            <li>Login to your account.</li>
            <li>Navigate to the Scan page.</li>
            <li>Insert the desired IP addresses to scan.</li>
            <li>Click "Show Result" to see the scan result.</li>
          </ol>
        </div>

      </div>
    </div>
    </>
  );
}
