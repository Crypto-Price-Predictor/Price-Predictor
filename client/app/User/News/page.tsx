import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100','300','400', '500'],
});

interface NewsPageProps {
  value: boolean;
}

// interface News {
//   title: string;
//   url: string;
//   score: number;
// }


interface DataItem {
  ticker: string;
  date: number;
  time: string;
  title: string;
  compound: number;
}

const NewsPage: React.FC<NewsPageProps> = ({ value }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api'); // Adjust the URL if your Flask app runs on a different host/port
        const jsonData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        console.log("API response:",response.data);
        if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else {
          console.error('Unexpected data format: Expected an array');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format the timestamp to a readable date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Converts to 'MM/DD/YYYY' format
  };

  if (loading) {
    return <div className={`${
      value ? 'text-white' : 'text-black'
    }`}>Loading...</div>;
  }

  return (
    // <div className="flex">
        <div className={`${
            value ? 'text-white' : 'text-black'
          } align-middle text-center font-bold text-xl mb-2`}>
      {/* <h1>Data from Flask API</h1> */}
      <div className="text-lg font-serif font-normal">
      <table className={ `min-w-full border-collapse border ${
  value ? 'bg-gray-800 text-white' : 'bg-white text-black'
} shadow-lg` }>
        <thead>
          <tr>
            {/* <th>Ticker</th> */}
            <th className="py-3 px-6 border-b">Date</th>
            <th className="py-3 px-6 border-b">Time</th>
            <th className="py-3 px-6 border-b">Title</th>
            <th className="py-3 px-6 border-b">Compound</th>
          </tr>
        </thead>
        <tbody>
          {
              data.map((item, index) => (

               <tr key={index}
                className={`${
                  index % 2 === 0 
                  ? value ? "bg-gray-900" : "bg-gray-50"
                  : value ? "bg-gray-800" : "bg-white"
                } hover:bg-gray-100 transition duration-150`}>
                  {/* <td>{item.ticker}</td> */}
                  <td className="py-3 px-6 border-b">{formatDate(item.date)}</td>
                  <td className="py-3 px-6 border-b">{item.time !== 'N/A' ? item.time : 'N/A'}</td>
                  <td className="py-3 px-6 border-b">{item.title}</td>
                  <td className="py-3 px-6 border-b">{item.compound}</td>
                </tr>
          )) }
        </tbody>
      </table>
    </div>


      // </div>
  );
};

export default NewsPage;




