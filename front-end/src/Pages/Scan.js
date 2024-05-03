import React, { useState } from 'react';
import NBar from "../components/NBar";
import PopupMessage from "../components/PopupMessage"; // Adjust the path as needed
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import './ScanStyles.css';

export default function Scans() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [status, setStatus] = useState(0); // 0 for "Running", 1 for "Completed"

  const columns = [
    { name: "Scan Name" },
    { name: "Date" },
    { 
      name: "Status",
      options: {
        customBodyRender: (value) => (
          <span className={`font-bold ${value === 0 ? 'text-red-500' : 'text-green-500'}`}>
            {value === 0 ? (
              <div className="flex items-center">
                Running
                <div className="ml-2">
                  <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"></path>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                Completed
                <div className="ml-2">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </span>
        )
      }
    },
    {
      name: "Result",
      options: {
        customBodyRender: () => (
          <a href="./ScanResult" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Show Result
          </a>
        ),
      },
    },
  ];

  const data = [
    ["New April University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 7, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    ["Home Network Scan", "January 31, 2024", status, "Open"],
    ["University Scan", "April 31, 2022", 1, "Open"],
    // Add more data as needed
  ];

  const options = {
    responsive: 'standard',
    selectableRows: true,
    tableBodyHeight: '600px',
    tableBodyMaxHeight: 'none',
    pagination: true, 
    filter: false,
    download: false,
    selectableRows: 'None', // Disable row selection
    viewColumns: false

  };

  const getMuiTheme = () => createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: { // Apply to both head and body
                    paddingLeft: '8px', // Reduce the left padding
                    paddingRight: '8px', // Maintain balance by reducing the right padding as well
                },
                head: {
                    paddingLeft: '5px',
                    paddingRight: '5px',
                },
                body: {
                    paddingLeft: '20px',
                    paddingRight: '20px',
                }
            }
        }
    }
});

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

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <NBar />

      <div className="tableStyle">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={""}
            data={data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
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
      </div>

      {isPopupOpen && <PopupMessage onClose={handleClosePopup} />}
    </div>
  );
}
