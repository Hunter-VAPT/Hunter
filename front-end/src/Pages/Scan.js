import React, { useEffect, useState } from 'react';
import NBar from "../components/NBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { NewScanButton } from '../components/NewScanButton';
import '../index.css'
import './ScanStyles.css'

export default function Scan() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [status, setStatus] = useState(0); // 0 for "Running", 1 for "Completed"
  const [data,setData] = useState([]);
  const SCANS_URL = 'scan/all';

  const columns = [
    { name: "Scan Name" },
    { name: "Date" },
    { 
      name: "Status",
      options: {
        customBodyRender: (value) => (
          <span className={`font-bold ${value ===  'ongoing'  ? 'text-red-500' : 'text-green-500'}`}>
            {value === 'ongoing' ? (
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
        customBodyRender: (url) => (
          <Link to={url}  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Show Result
          </Link>
        ),
      },
    },
  ];


  const options = {
    tableBodyMaxHeight: 'none',
    filter: false,
    download: false,
    selectableRows:false,
    viewColumns: false,
    pagination:true,
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

  useEffect(()=>{
    (async function(){
      const response = await api.get(SCANS_URL);
      
      if(response.status === 200){
        let tableDate = response.data.map((row)=>{
          return [row.name,row.start_time,row.status,`${row.id}`];
        });
        setData(tableDate)
      }
      
      })()
  },[])

  return (
    <>
      <NBar />

      <div className="container mx-auto w-100">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={""}
            data={data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
        <NewScanButton />
      </div>
    </>
  );
}
