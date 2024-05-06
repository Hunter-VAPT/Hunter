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

    const handleNewScan = async () => {
        try {
          setIsLoading(true);
          // Simulating a new scan creation
          setTimeout(() => {
            setIsPopupOpen(true);
            setIsLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Error creating new scan:', error);
          setIsLoading(false);
        }
      };
    return (
        <>
        
        {/* <div> */}


        <div className="mt-6">
          <button
            onClick={handleNewScan}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Creating Scan
                <svg className="animate-spin h-5 w-5 text-white inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"></path>
                </svg>
              </>
            ) : (
              'Create New Scan'
            )}
          </button>
        </div>

      {isPopupOpen && <PopupMessage onClose={handleClosePopup} />}
    {/* </div> */}
        </>
    )
}