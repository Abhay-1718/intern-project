import React, { useState } from 'react';

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: user?.username || `USER-${user?.name || ''}`,
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
    },
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) newErrors.name = 'Name is required and must be at least 3 characters.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is required and must be valid.';
    if (!formData.phone) newErrors.phone = 'Phone is required.';
    if (!formData.address.street) newErrors.street = 'Street is required.';
    if (!formData.address.city) newErrors.city = 'City is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{user ? 'Edit User' : 'Add User'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Phone:</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="border p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Address (Street):</label>
        <input
          type="text"
          value={formData.address.street}
          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
          className="border p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.street && <span className="text-red-500 text-sm">{errors.street}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Address (City):</label>
        <input
          type="text"
          value={formData.address.city}
          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
          className="border p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
        Submit
      </button>
    </form>
  );
};

export default UserForm;
