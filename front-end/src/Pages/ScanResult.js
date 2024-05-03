import NBar from "../components/NBar";
import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import './ScanStyles.css';
import { Link } from "react-router-dom";

export default function ScanResult() {

    const columns = [
        {
            name: "IP Address",
            options: {
                setCellHeaderProps: () => ({
                    style: { textAlign: 'left' }
                })
            }
        },
        {
            name: "Services",
            options: {
                customBodyRender: (value) => (
                    <div>
                        {value.split(",").map((os, index) => (
                            <div key={index}>{os.trim()}</div>
                        ))}
                    </div>
                )
            }
        },
        {
            name: "Operating System",
            options: {
                customBodyRender: (value) => (
                    <div>
                        {value.split(",").map((os, index) => (
                            <div key={index}>{os.trim()}</div>
                        ))}
                    </div>
                )
            }
        },
        {
            name: "Vulnerabilities",
            options: {
                customBodyRender: (value) => (
                    <div>
                        {value.split(",").map((vuln, index) => (
                            <div key={index}>
                                {vuln.includes("High:") && <span style={{ color: 'red' }}>{vuln.trim()}</span>}
                                {vuln.includes("Medium:") && <span style={{ color: 'orange' }}>{vuln.trim()}</span>}
                                {vuln.includes("Low:") && <span style={{ color: 'green' }}>{vuln.trim()}</span>}
                            </div>
                        ))}
                    </div>
                )
            }
        },
        {
            name: "Details",
            options: {
                customBodyRender: (value) => (
                    <Link to="/Vuln" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Extend
                    </Link>
                )
            }
        },
    ];

    const data = [
        ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
        ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
        ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
        ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
        ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
        ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],

    ];

    const options = {
        disableSelectionOnClick: 'disable',
        responsive: 'standard',
        selectableRows: 'none',
        tableBodyHeight: '600px',
        tableBodyMaxHeight: 'none',
        pagination: true,
        filter: false,
        download: false,
        viewColumns: false
    };

    const getMuiTheme = () => createTheme({
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        paddingLeft: '6px',
                        paddingRight: '6px',
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
    );
}
