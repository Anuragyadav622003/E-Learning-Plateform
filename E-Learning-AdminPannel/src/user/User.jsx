import React, { useState } from 'react';

// Sample user data (in a real application, you would fetch this from an API)
const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'student', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'instructor', status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'admin', status: 'inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'student', status: 'active' },
  // Add more users as needed
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Adjust based on your needs

  // Handle searching users
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filtering users by role
  const handleFilterRole = (e) => {
    setFilterRole(e.target.value);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get filtered and paginated users
  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(user => (filterRole ? user.role === filterRole : true));

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  // Handle editing a user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle saving user changes
  const handleSave = () => {
    setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {/* Search and Filter Options */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border p-2 rounded w-1/3"
          onChange={handleSearch}
        />
        <select onChange={handleFilterRole} className="border p-2 rounded ml-2">
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* User List Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id}>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline" onClick={() => handleEdit(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* User Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-xl mb-4">Edit User</h3>
            <input
              type="text"
              value={selectedUser.name}
              onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="border p-2 rounded mb-4 w-full"
            />
            <input
              type="email"
              value={selectedUser.email}
              onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="border p-2 rounded mb-4 w-full"
            />
            <select
              value={selectedUser.role}
              onChange={e => setSelectedUser({ ...selectedUser, role: e.target.value })}
              className="border p-2 rounded mb-4 w-full"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
