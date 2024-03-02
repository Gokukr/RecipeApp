import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import Header from './Header';
import Footer from './Footer';

function Culinarian() {
  const notify = (message) => toast(message);
  const [culinaryData, setCulinaryData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [updatedStatus, setStatus] = useState('');
  const [hasData, setHasData] = useState(true);

    function handleClick(selectedLabel) {
        setSelectedStatus(selectedLabel);
    }
    console.log(culinaryData);

    useEffect(() => {
        axios.get(`http://localhost:1200/api/detail/culinarian/${selectedStatus}`)
        .then((response) => {
            setCulinaryData(response.data.data);
            setHasData(response.data.count);
        });
      }, [selectedStatus]);

    function handleAccept(id){
        setStatus('Accepted');
        const culId = id;
        axios.put(`http://localhost:1200/api/detail/culinarian/${updatedStatus}/${culId}`)
        .then(() => {
            notify("Request Accepted! Status Updated");
        })
        .catch((error) => {
            notify(error);
        });
    }
    // console.log(updatedStatus);
    function handleReject(id) {
        setStatus('Rejected');
        const culId = id;
        axios.put(`http://localhost:1200/api/detail/culinarian/${updatedStatus}/${culId}`)
        .then(() => {
            notify("Request Rejected! Status Updated");
        })
        .catch((error) => {
            notify(error);
        });
    }
    // console.log(updatedStatus);

  return (
    <>
    <Header/>
    <ToastContainer />
    <div class="cul-body bg-white w-full h-screen overflow-hidden">
        <div class="cul-outer-container mx-40 bg-white">
            <div>
                <h2 class="text-[30px]">Culinarian's Requests</h2>
            </div>

            <nav className="flex gap-4 mt-10 ml-10">
                <span
                    className={`cursor-pointer py-2 px-4 rounded-md ${
                    selectedStatus === 'Pending' ? 'bg-[#2c3e50] text-white' : 'text-black'
                    }`}
                    onClick={() => handleClick('Pending')}
                >
                    Pending
                </span>
                <span
                    className={`cursor-pointer py-2 px-4 rounded-md ${
                    selectedStatus === 'Accepted' ? 'bg-green-500 text-white' : 'text-black'
                    }`}
                    onClick={() => handleClick('Accepted')}
                >
                Approved
                </span>
                <span
                    className={`cursor-pointer py-2 px-4 rounded-md ${
                    selectedStatus === 'Rejected' ? 'bg-red-500 text-white' : 'text-black'
                    }`}
                    onClick={() => handleClick('Rejected')}
                >
                Rejected
                </span>
            </nav>
            <hr className="h-1 bg-gray-400 ml-3"></hr>
            
            {(hasData === true) &&
                <div>
                <ol>
                    <div class="data-set-cul flex flex-col justify-between  list list-disc ">
                    {Array.isArray(culinaryData) ? (
                      culinaryData.map((data, index) => (
                        <li key={index} class="flex justify-between place-items-start px-4 gap-4 py-4 mb-2 border-2 border-solid border-black rounded-xl">
                            {/* <span>{index+1}.</span> */}
                            <div class="flex flex-col gap-3 justify-between items-center  w-[25%] ">
                                <span> Name</span>
                                <span class="pt-2 text-[18px]">{ data.f_name } {data.l_name}</span>
                            </div>
                            <div class="flex flex-col gap-3 justify-between items-center w-[25%]">
                                <span> Specialization</span>
                            <span class="pt-2 text-[18px]">
                            <div class="container flex flex-col justify-between items-center">
                                {Array.isArray(data.specialization) ? (
                                    data.specialization.map((Specialization, index) => (
                                    <span key={index}>
                                        {Specialization}
                                    </span>
                                ))
                                ) : (
                                    <span>{ data.Specialization }</span>
                                )
                                }
                            </div>
                            </span>
                            </div>
                            <div class="flex flex-col pl-4 gap-3 justify-center items-center w-[25%]">
                                <span>Bio</span>
                            <span class="pt-2 text-[18px] flex flex-wrap break-words">{ data.bio }</span>
                            </div>
                            {((selectedStatus === 'pending') || (selectedStatus === 'Pending')) && (
                            <div class="flex justify-end w-[25%]">
                                <button autocomplete="off" class="text-base bg-green-500 text-white px-4 py-1 rounded-md ml-4"
                                    onClick={() => handleAccept(data.id)}>
                                    Accept 
                                </button>
                                <button autocomplete="off" class="text-base bg-red-500 text-white px-4 py-1 rounded-md ml-4"
                                    onClick={() => handleReject(data.id)}>
                                    Reject 
                                </button>
                            </div>
                            )}
                            {((selectedStatus === 'approved') || (selectedStatus === 'Accepted')) && (
                            <div class="flex justify-end w-[25%]">
                                <button autocomplete="off" class="text-base bg-red-500 text-white px-4 py-1 rounded-md ml-4"
                                    onClick={() => handleReject(data.id)}>
                                    Reject 
                                </button>
                            </div>
                            )}
                        </li>
                      ))
                      ) : (
                        <li>No data available</li>
                    )}
                    </div>
                    {/* </li> */}
                </ol>
                </div>
            }

            {(hasData === false) && 
                <div class="no-data w-full text-black flex flex-col justify-center items-center gap-5 py-10">
                    <img src="http://127.0.0.1:8080/No_data.png" alt='no-data'></img>
                    <h2 class="no-data-h2 text-[30px]">Check Other Tabs</h2>
                </div>
            }
            
        </div>
    </div>
    <Footer/>
    </>   
  );
}

export default Culinarian;
