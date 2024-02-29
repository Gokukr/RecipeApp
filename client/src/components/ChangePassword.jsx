import React from "react";
import {useState} from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

const ChangePasswordModal = ({ show }) => {
  const notify = (message) => toast(message);
  // const Navigate = useNavigate();
  const userId = Cookies.get("user_id");
  const [oldPassword, setOldPassword]= useState('');
  const [newPassword, setNewPassword]= useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const [verify, setVerify]= useState(false);
  const handleChange1 = (event) => setOldPassword(event.target.value); 
  const handleChange2 = (event) => setNewPassword(event.target.value);
  const handleChange3 = (event) => setConfirmPassword(event.target.value);
  const handleChangePassword = () => {
    if(oldPassword === '' || newPassword === '' || confirmPassword === ''){
      notify("Fields Empty !!");
      window.location.reload();
    }
    else if(newPassword !== confirmPassword){
      notify("Password Mismatch");
    }
    else{
      axios.get(`http://localhost:1200/api/detail/Password/${oldPassword}/${userId}`)
      .then((response) => {
        setVerify(response.data.msg);
      });

      if(verify === true){
        notify("Old Passowrd Verified");
      }
      else {
        notify("Wrong Old Password");
      }

      if(verify === true && newPassword === confirmPassword) {
        axios.put(`http://localhost:1200/api/detail/changePassword/${newPassword}/${userId}`)
        .then((response) => {
          notify("Password Changed Successfully");
        });
      }
    }
  }
  const cancelDelete = () => {
    window.location.reload();
  };
  
  return (
    <div>
      <ToastContainer />
      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left flex flex-col justify-center items-center">
                    <h3
                      class="text-[18px] font-semibold leading-6 text-gray-900 "
                      id="modal-title"
                    >
                      Change Password
                    </h3>
                    
                    <div class="password-container flex flex-col justify-center items-center w-[470px] my-2 ">
                      {/* <label for="old-password">Old Password:</label> */}
                      <input type="password" id="old-password" name="old_password" placeholder="OLD PASSWORD"required class="my-2 rounded-lg border border-gray-300 p-2 w-[80%]"onChange={handleChange1}/>
                      {/* <label for="new-password">New Password:</label> */}
                      <input type="password" id="new-password" name="new_password" placeholder="NEW PASSWORD" required class="my-2 rounded-lg border border-gray-300 p-2 w-[80%]"onChange={handleChange2}/>
                      {/* <label for="confirm-password">Confirm New Password:</label> */}
                      <input type="password" id="confirm-password" name="confirm_password" placeholder="CONFIRM NEW PASSWORD" required class="my-2 rounded-lg border border-gray-300 p-2 w-[80%]"onChange={handleChange3}/>
                    </div>

                    
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-center items-center sm:px-6">
                <button
                  type="button"
                  class=" w-full rounded-md bg-[#3498db] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleChangePassword}
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="mt-3 w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
