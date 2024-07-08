import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Permissions() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleButtonClick = (id) => {
        setSelectedUserId(selectedUserId === id ? null : id);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                const hiddenUsers = JSON.parse(localStorage.getItem('hiddenUsers')) || [];
                const filteredUsers = response.data.filter(user => !hiddenUsers.includes(user._id));
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        fetchUsers();
    }, []);

    const selectedUser = users.find(user => user._id === selectedUserId);

    return (
        <div className='mt-[70px]'>
            <h1 className="text-2xl font-semibold mb-4 flex justify-center items-center">Marketing Team
             Permissions</h1>
            <table className="w-[1000px] ml-[150px] bg-white border border-gray-300 mt-5">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="py-2 px-[100px] border-b text-center">{user.name}</td>
                            <td className="py-2 px-[100px] border-b text-center">{user.role}</td>
                            <td className="py-2 px-[100px] border-b text-center">
                                <button 
                                    className='bg-green-500 h-9 w-[150px]' 
                                    onClick={() => handleButtonClick(user._id)}
                                >
                                    Set Permissions
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <div className='mt-[50px] mx-[340px]'>
                    <h2 className="text-xl font-semibold mb-4">Permissions for {selectedUser.name}</h2>
                    <table className="w-[600px] border-collapse bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Features</th>
                                <th className="py-2 px-4 border-b">Please tick to assign</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-[100px] border-b text-center">Email Collection</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <input type="checkbox" />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-[100px] border-b text-center">Email Scheduling</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <input type="checkbox" />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-[100px] border-b text-center">Tracking</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <input type="checkbox" />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-[100px] border-b text-center">Reporting</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <input type="checkbox" />
                                </td>
                            </tr>

                            <tr>
                                <td className="py-2 px-[100px] border-b text-center">Templates</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <input type="checkbox" />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Permissions;
