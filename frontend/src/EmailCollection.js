import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailCollection = () => {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get('http://localhost:5040/api/getsubscribe');
                setSubscribers(response.data);
            } catch (error) {
                console.error('Error fetching subscribers:', error);
            }
        };

        fetchSubscribers();
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-semibold mb-4">Email Collection</h1>
            <table className="w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Date Subscribed</th>
                    </tr>
                </thead>
                <tbody>
                    {subscribers.map(subscriber => (
                        <tr key={subscriber._id}>
                            <td className="py-2 px-4 border-b text-center">{subscriber.email}</td>
                            <td className="py-2 px-4 border-b text-center">{new Date(subscriber.dateSubscribed).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmailCollection;
