import React, { useState } from "react"
import PopupMessage from "./PopupMessage";

export const NewScanButton = ()=>{

    const [isLoading, setIsLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [status, setStatus] = useState(0); // 0 for "Running", 1 for "Completed"
    const [data,setData] = useState([]);
    const SCANS_URL = 'scan/all';
  

    const handleClosePopup = () => {
        setIsPopupOpen(false);
      };    

    const openPopup = async () => {
        try {
          setIsLoading(true);
          // Simulating a new scan creation
            setIsPopupOpen(true);
            setIsLoading(false);
        } catch (error) {
          console.error('Error creating new scan:', error);
          setIsLoading(false);
        }
      };
    return (
        <>
        <div className="flex justify-center mt-6">
          <button
            onClick={openPopup}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >Create New Scan</button>
        </div>
      {isPopupOpen && <PopupMessage closePopup={handleClosePopup} />}
        </>
    )
}