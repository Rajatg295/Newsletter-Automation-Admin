import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', password: '' });

    const handleEditClick = (user) => {
        if (selectedUser && selectedUser._id === user._id) {
            setSelectedUser(null);
        } else {
            setSelectedUser(user);
            setEditForm({ name: user.name, email: user.email, password: user.password });
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append('name', editForm.name);
            formData.append('email', editForm.email);
            formData.append('password', editForm.password);


            await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, formData,{
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === selectedUser._id ? { ...user, ...editForm } : user
                )
            );
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    return (
        <div className='mt-16 mx-auto max-w-5xl p-4'>
            <h1 className='text-3xl font-bold text-center mb-8'>List Users</h1>
            <div className='overflow-x-auto overflow-y-auto'>
                <table className='min-w-full bg-white border border-gray-200 shadow-lg rounded-lg'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-6 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>Password</th>
                            <th className='px-14 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {users.map(user => (
                            <tr key={user._id} className='hover:bg-gray-50'>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-700'>{user.name}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-700'>{user.email}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-700'>{user.password}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-700 space-x-2'>
                                    <button onClick={() => handleEditClick(user)} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Edit</button>
                                    <button className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {selectedUser && (
                <>
                    <h2 className="text-xl font-semibold mb-4">Edit details of {selectedUser.name}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleInputChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editForm.email}
                                onChange={handleInputChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={editForm.password}
                                onChange={handleInputChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <button type="submit" className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>Save</button>
                            <button onClick={() => setSelectedUser(null)} className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'>Cancel</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default ListUsers;
