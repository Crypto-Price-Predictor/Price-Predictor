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
    }`}>         <div className="flex justify-center items-center h-full p-56">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div></div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
        <div className={`${
            value ? 'text-white' : 'text-black'
          } align-middle text-center font-bold text-xl mb-2`}>
      
      <div className="text-lg font-serif font-normal">
      <table className={ `min-w-full border-collapse  ${
  value ? 'bg-gray-800 text-white' : 'bg-white text-black'
} shadow-lg` }>
        <thead>
          <tr>
            <th className="py-3 px-6 font-bold">Date</th>
            <th className="py-3 px-6 font-bold">Time</th>
            <th className="py-3 px-6 font-bold">Title</th>
            <th className="py-3 px-6 font-bold">Compound</th>
          </tr>
        </thead>
        <tbody>
          {
              data.map((item, index) => (

               <tr key={index}
                className={`bubble-container ${
                  index % 2 === 0 
                  ? value ? "bg-black" : "bg-gray-50"
                  : value ? "bg-[#000d1a]" : "bg-white"
                } hover:bg-gray-100 transition duration-150`}>
                  <td className="py-3 px-6 ">{formatDate(item.date)}</td>
                  <td className="py-3 px-6 ">{item.time !== 'N/A' ? item.time : 'N/A'}</td>
                  <td className="py-3 px-6 ">{item.title}</td>
                  <td className="py-3 px-6 ">{item.compound}</td>
                </tr>
          )) }
        </tbody>
      </table>
    </div>


   </div></div>
  );
};

export default NewsPage;




