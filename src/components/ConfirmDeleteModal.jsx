import React from 'react';

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow-md z-10">
        <p>Are you sure you want to delete this user?</p>
        <div className="mt-4">
          <button className="bg-red-500 text-white p-2 mr-2" onClick={onConfirm}>Yes</button>
          <button className="bg-gray-300 p-2" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
