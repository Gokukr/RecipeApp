import React from "react";

const PopupDialog = ({ isOpen, onClose, onConfirm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log();
    onConfirm(event.target[0].value);
  };

  if (!isOpen) return null; // Render nothing if the popup is not open

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <form
        className="relative bg-white w-96 p-6 rounded-lg shadow-xl z-50"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold text-center mb-4">
          Are you sure ?
        </h2>
        <div className="md:col-span-2 sm:col-span-2 lg:col-span-5 xs:col-span-2 font-sans mb-6">
          <label
            htmlFor="rejectionMessage"
            className="block text-sm text-text font-medium leading-6 text-gray-900"
          >
            Rejection Message
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="rejectionMessage"
              id="rejectionMessage"
              className="block w-full box-border border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6 bg-textbg"
              placeholder="Enter rejection message"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 mr-2 rounded"
          >
            Yes
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupDialog;
