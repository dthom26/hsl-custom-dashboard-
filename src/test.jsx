import { useEffect, useState } from 'react'
import axios from 'axios'; // Import Axios
import { fetchCSVData } from './assets/utils';

export default function FetchCSVData({ csvUrl }) {
    // This component fetches CSV data from a given URL and displays it in a table format.
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        fetchCSVData(csvUrl).then(setCsvData);    // Fetch the CSV data when the component mounts
    }, [csvUrl]); 

    
    // Render the CSV data as a list or table
    return (
        <div>
            {csvData.length === 0 ? (
                <div>Loading...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(csvData[0]).map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, idx) => (
                            <tr key={idx}>
                                {Object.values(row).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}












  