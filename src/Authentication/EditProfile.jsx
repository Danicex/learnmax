import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export default function EditProfile() {
    const { adminId, api_endpoint} = useContext(AuthContext);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [profileInput, setProfileInput] = useState({
        hotel_name: '',
        description: '',
        address: '',
        name: '',
        currency: '',
        account_number: ''
    });
    const options = countryList().getData();
    const [countryValue, setCountryValue] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${api_endpoint}0/admins/${adminId}/admin_profile/`).then(
            res=>{setProfileInput(res.data)
            }
        )
    },[])
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        } else {
            setPreview(null);
        }
    };

    const handleStateChange = (e) => {
        const { name, value } = e.target;
        setProfileInput({ ...profileInput, [name]: value });
    };

    const handleProfilePost = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('admin_profile[phone_number]', phoneNumber);
        formData.append('admin_profile[hotel_name]', profileInput.hotel_name);
        formData.append('admin_profile[description]', profileInput.description);
        formData.append('admin_profile[address]', profileInput.address);
        formData.append('admin_profile[name]', profileInput.name);
        formData.append('admin_profile[country]', countryValue);
        formData.append('admin_profile[currency]', profileInput.currency);
        formData.append('admin_profile[account_number]', profileInput.accountNumber);
        if (image) {
            formData.append('admin_profile[image]', image);
        }

        axios.put(`${api_endpoint}/admins/${adminId}/admin_profile/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res.status);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleCountryChange = (selectedOption) => {
        setCountryValue(selectedOption);
    };

    return (
        <form className='register-form-layout w-4/5 px-4  m-auto'>
            <h1 className='text-4xl font-bold tracking-tightsm:text-2xl mt-5'>Edit Profile</h1>

            <div className="space-y-12 ">

                <div className="border-b border-slate-80/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="hotel_name" className="block text-sm font-medium leading-6 ">
                                Hotel name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-1">
                                    <input
                                        id="hotel_name"
                                        name="hotel_name"
                                        type="text"
                                        value={profileInput.hotel_name}
                                        onChange={handleStateChange}
                                        placeholder="Nestlin Grove"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 ">
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={profileInput.description}
                                    onChange={handleStateChange}
                                    placeholder='A brief text to market your hotel'
                                    className="block w-full px-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6">Write a few details about your hotel.</p>
                        </div>
                       
                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 ">
                                Cover photo
                            </label>
                            {preview && (<img src={preview} style={{ width: '200px' }} alt="Preview" />)}
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-300/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                    <div className="mt-4 flex text-sm leading-6">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-gray-100 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 px-2 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 ">Personal Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                                Full name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder='John Doe'
                                    value={profileInput.name}
                                    onChange={handleStateChange}
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="phone_number" className="block text-sm font-medium leading-6 ">
                                Phone number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="tel"
                                    value={phoneNumber}
                                    placeholder='+123 - 456 -789'
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 ">
                                bank account number
                            </label>
                            <div className="mt-2">
                                <input
                                    id=""
                                    name="account_number"
                                    type="text"
                                    placeholder='2233897586'
                                    value={profileInput.accountNumber}
                                    onChange={handleStateChange}
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="phone_number" className="block text-sm font-medium leading-6 ">
                                currency
                            </label>
                            <div className="mt-2">
                                <input
                                    id="currency"
                                    name="currency"
                                    type="tel"
                                    value={profileInput.currency}
                                    placeholder='USD'
                                    onChange={handleStateChange}
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 ">
                                Country
                            </label>
                            <div className="mt-2">
                                <Select
                                    options={options}
                                    value={countryValue}
                                    onChange={handleCountryChange}
                                    placeholder="Select a country"
                                    id='country-list'
                                />

                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="address" className="block text-sm font-medium leading-6 ">
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={profileInput.address}
                                    placeholder='123 Main St'
                                    onChange={handleStateChange}
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleProfilePost}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 mb-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                    Save
                </button>
            </div>
        </form>
    );
}


