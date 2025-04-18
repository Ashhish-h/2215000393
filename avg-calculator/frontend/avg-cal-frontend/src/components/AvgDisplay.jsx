import { useState } from 'react';
import axios from 'axios';

export default function AvgDisplay() {
  const [type, setType] = useState('e');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:9876/numbers/${type}`);
    setData(res.data);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-2xl ">
      <h1 className="text-2xl font-bold mb-4 text-center">Average Calculator</h1>
      <div className="flex gap-2 justify-center mb-4 ">
        {['p', 'f', 'e', 'r'].map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded-full font-semibold ${
              type === t ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
        <button onClick={fetchData} className="px-4 py-2 bg-green-500 rounded-full">
          Fetch
        </button>
      </div>
      {data && (
        <div className="space-y-2 text-sm text-black">
          <p><strong>Window Prev State:</strong> {JSON.stringify(data.windowPrevState)}</p>
          <p><strong>Window Curr State:</strong> {JSON.stringify(data.windowCurrState)}</p>
          <p><strong>Numbers:</strong> {JSON.stringify(data.numbers)}</p>
          <p><strong>Average:</strong> {data.avg}</p>
        </div>
      )}
    </div>
  );
}
