import NBar from "../components/NBar"
import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import MUIDataTable from "mui-datatables";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";


export default function Vuln() {

    const {scan_id,host_id} = useParams();
    const VULNERABLE_HOST_URL = `scan/${scan_id}/${host_id}`
    const [data,setData] = useState([])

    const columns = [
        {
            name: "CVE ID"
        },
        {
            name: "Service",
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
            name: "Description",
            options: {
                setCellProps: () => ({ style: { minWidth: "800px", maxWidth: "800px", whiteSpace: "pre-wrap" }}),
                customBodyRender: (data, type, row) => {return <div>{data}</div>}
          },    
        },
        {
            name: "Severity",
            options: {
                customBodyRender: (value) => {
                    let color;
                    switch (value.toLowerCase()) {
                        case "high":
                            color = "red";
                            break;
                        case "medium":
                            color = "orange";
                            break;
                        case "low":
                            color = "green";
                            break;
                        default:
                            color = "inherit";
                            break;
                    }
                    return (
                        <div style={{ color: color }}>{value}</div>
                    );
                }
            }
        },
        {
            name: "Details",
            options: {
                customBodyRender: (value) => <a target="__blank" href={`https://nvd.nist.gov/vuln/detail/${value}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Extend
                </a>,
            }
        }
        
    ]

    // const data = [
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Check out the customize-filter example: https://github.com/gregnb/mui-datatables/blob/master/examples/customize-filter/index.js Code Sandbox link here: https://codesandbox.io/s/github/patorjk/mui-datatables/tree/examplegrid_updates That example shows how to do a filter with a number range - min and max.", "High", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Wikis are enabled by wiki software, otherwise known as wiki engines. A wiki engine, being a form of a content management system, differs from other web-based systems such as blog software or static site generators, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[1] Wiki engines usually allow content to be written using a simplified", "Low", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Wikis are enabled by wiki software, otherwise known as wiki engines", "Medium", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "There are hundreds of thousands of wikis in use, both public and private, including wikis functioning as knowledge management resources, note-taking tools, community websites, and intranets", "Low", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Wikis are enabled by wiki software, otherwise known as wiki engines", "Medium", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Check out the customize-filter example: https://github.com/gregnb/mui-datatables/blob/master/examples/customize-filter/index.js Code Sandbox link here: https://codesandbox.io/s/github/patorjk/mui-datatables/tree/examplegrid_updates That example shows how to do a filter with a number range - min and max.", "High", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Check out the customize-filter example: https://github.com/gregnb/mui-datatables/blob/master/examples/customize-filter/index.js Code Sandbox link here: https://codesandbox.io/s/github/patorjk/mui-datatables/tree/examplegrid_updates That example shows how to do a filter with a number range - min and max.", "High", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Wikis are enabled by wiki software, otherwise known as wiki engines. A wiki engine, being a form of a content management system, differs from other web-based systems such as blog software or static site generators, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[1] Wiki engines usually allow content to be written using a simplified", "Low", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Wikis are enabled by wiki software, otherwise known as wiki engines", "Medium", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "There are hundreds of thousands of wikis in use, both public and private, including wikis functioning as knowledge management resources, note-taking tools, community websites, and intranets", "Low", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Wikis are enabled by wiki software, otherwise known as wiki engines", "Medium", "Open"],
    //     ["CVE-2017-0144", "Port: 3000/tcp,Service: http,Version: Node.js Express framework", "Check out the customize-filter example: https://github.com/gregnb/mui-datatables/blob/master/examples/customize-filter/index.js Code Sandbox link here: https://codesandbox.io/s/github/patorjk/mui-datatables/tree/examplegrid_updates That example shows how to do a filter with a number range - min and max.", "High", "Open"],
    // ];

    const options = {
        disableSelectionOnClick: 'disable',
        responsive: 'standard', // Ensure table is responsive
        selectableRows: false, // Disable row selection
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
                        paddingLeft: '5px',
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
          const response = await api.get(VULNERABLE_HOST_URL);
          if(response.status === 200){
            const dataTable = [];
            const ports = response.data.ports;
            for (const port of ports){
                const vulnerabilities = port.vulnerabilities;
                for (const vulnerability of vulnerabilities){
                    let severity = "";
                    if(vulnerability.score >= 9 && vulnerability.score<= 10){
                        severity = "Critical"
                    }else if(vulnerability.score >= 7 && vulnerability.score<= 8.9){
                        severity = "HIgh"
                        vulnerabilities.high += 1;
                    }else if(vulnerability.score >= 4 && vulnerability.score<= 6.9){
                        severity = "Medium"
                        vulnerabilities.medium += 1;
                    }else{
                        severity = "Low"
                        vulnerabilities.low += 1;
                    }
                    dataTable.push([vulnerability.cve, `Port: ${port.port_number},Service: ${port.service_name}, Version: ${port.service_version}`, vulnerability.description, severity, vulnerability.cve])
                }
            }
            setData(dataTable)
          }
        })()
      },[])

    return (
        <div>
            <NBar />
            <div className="container mx-auto">
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