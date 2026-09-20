import { useState, useEffect } from 'react';
import api from '../../lib/api';
import Navbar from '../Nav/Navbar';
import Footer from '../Footer/Footer';

export default function InquiryForm() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await api.get('/showInquiries');
      // Preserve the `done` status from the database
      const inquiriesWithStatus = response.data.data.map(inquiry => ({
        ...inquiry,
        done: inquiry.done === 1, // Convert `done` from MySQL (1 or 0) to boolean (true or false)
      }));
      setInquiries(inquiriesWithStatus);
    } catch {
      setError('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = async (id, done) => {
    try {
      const response = await api.post(`/inquiries/${id}/status`, {
        done: done ? 0 : 1,
      });
      if (response.status === 200) {
        setInquiries((prevInquiries) =>
          prevInquiries.map((inquiry) =>
            inquiry.id === id ? { ...inquiry, done: !done } : inquiry
          )
        );
      } else {
        setError('Failed to update status');
      }
    } catch {
      setError('Failed to update status');
    }
  };

  const clearDoneOrders = async () => {
    try {
      const response = await api.delete('/inquiries/clear-done');
      if (response.status === 200) {
        setInquiries((prevInquiries) => prevInquiries.filter((inquiry) => !inquiry.done));
      } else {
        setError('Failed to clear done orders');
      }
    } catch {
      setError('Failed to clear done orders');
    }
  };

  return (
    <div className='dark:bg-darkColor'>
      <Navbar />
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black mb-6 md:mb-10 text-center text-fontColor dark:text-white">Recent Inquiries</h1>

        {loading && <p className="text-center" role="status">Loading inquiries…</p>}
        {error && <p className="text-center text-red-600" role="alert">{error}</p>}


        <div className="hidden md:block overflow-x-auto shadow-xl rounded-xl">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gradient-to-r from-fontColor to-gray-900 dark:from-indigo-800 dark:to-purple-800 text-white text-white">
              <tr>
                <th className="p-4 text-left text-lg dark:text-white">Order</th>
                <th className="p-4 text-left text-lg dark:text-white">Name</th>
                <th className="p-4 text-left text-lg dark:text-white">Phone</th>
                <th className="p-4 text-left text-lg dark:text-white">Message</th>
                <th className="p-4 text-left text-lg dark:text-white">Date</th>
                <th className="p-4 text-left text-lg dark:text-white">Done</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, index) => (
                <tr key={inquiry.id} className="border-t dark:hover:bg-fontColor hover:bg-gray-50 transition-all duration-200">
                  <td className="p-4 font-semibold text-fontColor dark:text-white">{index + 1}</td>
                  <td className={`p-4 ${inquiry.done ? 'line-through text-gray-500 dark:text-white' : 'dark:text-white text-fontColor'}`}>{inquiry.name}</td>
                  <td className={`p-4 ${inquiry.done ? 'line-through text-gray-500 dark:text-white' : 'dark:text-white text-fontColor'}`}>{inquiry.phone}</td>
                  <td className={`p-4 ${inquiry.done ? 'line-through text-gray-500 dark:text-white' : 'dark:text-white text-fontColor'}`}>{inquiry.message}</td>
                  <td className="p-4 text-gray-700 dark:text-white">{new Date(inquiry.created_at).toLocaleString()}</td>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={inquiry.done}
                      onChange={() => toggleDone(inquiry.id, inquiry.done)}
                      className="h-5 w-5 cursor-pointer accent-indigo-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {inquiries.map((inquiry, index) => (
            <div key={inquiry.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Order: {index + 1}</span>
                <input
                  type="checkbox"
                  checked={inquiry.done}
                  onChange={() => toggleDone(inquiry.id, inquiry.done)}
                  className="h-5 w-5 cursor-pointer accent-indigo-600"
                />
              </div>
              <div className="mt-2">
                <p className={`text-sm ${inquiry.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  <span className="font-semibold">Name:</span> {inquiry.name}
                </p>
                <p className={`text-sm ${inquiry.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  <span className="font-semibold">Phone:</span> {inquiry.phone}
                </p>
                <p className={`text-sm ${inquiry.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  <span className="font-semibold">Message:</span> {inquiry.message}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Date:</span> {new Date(inquiry.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={clearDoneOrders}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
          >
            Clear Done Orders
          </button>
        </div>
      </div>
      <Footer />
    </ div>
  );
}
