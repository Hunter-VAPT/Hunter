import NBar from "../components/NBar"
import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import MUIDataTable from "mui-datatables";
import './ScanStyles.css';



export default function Vuln() {

    const columns = [
        {
            name: "On Service",
            options: {
                setCellHeaderProps: () => ({
                    style: { textAlign: 'left' }
                })
            }

        },
        {
            name: "Severity",
            options: {
                customBodyRender: (value) => {
                    return (
                        <div>
                            {value.split(",").map((os, index) => (
                                <div key={index}>{os.trim()}</div>
                            ))}
                        </div>
                    );
                }
            }
        },
        {
            name: "CVE ID",
            options: {
                customBodyRender: (value) => {
                    return (
                        <div>
                            {value.split(",").map((os, index) => (
                                <div key={index}>{os.trim()}</div>
                            ))}
                        </div>
                    );
                }
            }
        },{
            name: "Description",
            options: {
                customBodyRender: (value) => {
                    return (
                        <div>
                            {value.split(",").map((os, index) => (
                                <div key={index}>{os.trim()}</div>
                            ))}
                        </div>
                    );
                },
                
            }
        },
        {
            name: "Vuln Details",
            options: {
                customBodyRender: (value) => <a href="./ScanResult" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Extend Details
                </a>,
            }
        },


    ]

    const data = [
        ["Port: 445/TCP Service:, SMBv1", "Critical", "CVE-2017-0144", "...", "Open"],
        ["Port: 445/TCP Service:, SMBv1", "Critical", "CVE-2017-0144", "...", "Open"],
        ["Port: 445/TCP Service:, SMBv1", "Critical", "CVE-2017-0144", "...", "Open"],
        ["Port: 445/TCP Service:, SMBv1", "Critical", "CVE-2017-0144", "...", "Open"],
        ["Port: 445/TCP Service:, SMBv1", "Critical", "CVE-2017-0144", "...", "Open"],

    ];
    const options = {

        disableSelectionOnClick: 'disable',
        responsive: 'standard', // Ensure table is responsive
        selectableRows: 'none', // Disable row selection
        tableBodyHeight: '600px', // Set height of table body
        tableBodyMaxHeight: 'none', // Remove max height of table body
        pagination: true,
        filter: false,
        download: false,
        viewColumns: false
        
    };

    const getMuiTheme = () => createTheme({
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: { // Apply to both head and body
                        paddingLeft: '6px', // Reduce the left padding
                        paddingRight: '6px', // Maintain balance by reducing the right padding as well
                    },
                    head: {
                        paddingLeft: '1px',
                        paddingRight: '1px',
                    },
                    body: {
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }
                }
            }
        }
    });

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

            </div>

        </div>
    )
}
