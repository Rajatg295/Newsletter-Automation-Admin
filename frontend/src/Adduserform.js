import React, { useContext, useState } from 'react';
import { AppContext } from './context/AppContext';
import axios from 'axios';

const Adduserform = () => {
    const { login } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        role: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            image: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('role', formData.role);

        try {
            console.log('Form data:', formData);
            const response = await axios.post('http://localhost:5000/api/registeruser', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding user:', error);
            alert(error.response.data.message);
        }
    };

    return (
        <>
            {login && (
                <div>
                    <div className="mt-[100px] p-4 ">
                        <h1 className='text-[40px]'>Please fill out this form to <br /> <h1 className='text-blue-500'>Add Marketing Member</h1></h1>
                    </div>
                    <div className="w-[400px] mt-[-90px] ml-auto mr-[210px] p-4 bg-white shadow-lg rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm "
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm "
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    <option value="">Select a role</option>
                                    <option value="marketing">marketing</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Adduserform;
