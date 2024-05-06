import NBar from "../components/NBar";
import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import './ScanStyles.css';
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";


export default function ScanResult() {
    
    const {id} = useParams();
    const SCAN_RESULT_URL = `scan/${id}`
    const [data,setData] = useState([])

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
                                {vuln.includes("Critical:") && <span style={{ color: 'red' }}>{vuln.trim()}</span>}
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
                    <Link to={value} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Extend
                    </Link>
                )
            }
        },
    ];

    // const data = [
    //     ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
    //     ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
    //     ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
    //     ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
    //     ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],
    //     ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],

    // ];

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


    useEffect(()=>{
        (async function(){
          const response = await api.get(SCAN_RESULT_URL);
          // ["192.168.1.5", "Port: 3000/tcp,Service: http,Version: Node.js Express framework, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 135/tcp,Service: msrpc,Version: Microsoft Windows RPC, ⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,Port: 139/tcp,Service: netbios-ssn,Version: Microsoft Windows netbios-ssn, ", "Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", "High: 10, Medium: 7, Low: 40", "Open"],

          
          if(response.status === 200){
            const hosts = response.data.hosts;
            

            const tableData = hosts.map((host)=>{
                const vulnerabilities = {
                    critical:0,
                    high:0,
                    medium:0,
                    low:0
                }
                let services = "";
                const ports = host.ports;
                for(const [i,port] of ports.entries()){
                    services += `Port: ${port.port_number},`;
                    if(port.service_name){
                        services += `Service: ${port.service_name},`;
                    }
                    if(port.service_version){
                        services += `Version: ${port.service_version},`;
                    }
                    if(i !== ports.length -1){
                        services+= "⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘⁘,";
                    }

                    for(const vulnerability of port.vulnerabilities){
                        if(vulnerability.score >= 9 && vulnerability.score<= 10){
                            vulnerabilities.critical += 1;
                        }else if(vulnerability.score >= 7 && vulnerability.score<= 8.9){
                            vulnerabilities.high += 1;
                        }else if(vulnerability.score >= 4 && vulnerability.score<= 6.9){
                            vulnerabilities.medium += 1;
                        }else{
                            vulnerabilities.low += 1;
                        }
                }
            }
            
            const vulns = `Critical: ${vulnerabilities.critical}, High: ${vulnerabilities.high}, Medium: ${vulnerabilities.medium}, Low: ${vulnerabilities.low}`;
            return [host.ip_address,services,"Microsoft Windows 11 21H2 (95%), Microsoft Windows Server 2022 (91%), Microsoft Windows 10 (91%),", vulns, `${host.id}`];
        })
            
            setData(tableData);
          }
          
          })()
      },[])
    
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
