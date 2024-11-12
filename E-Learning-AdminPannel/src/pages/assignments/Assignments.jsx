import React, { useState } from 'react';

// Sample assignment data
const initialAssignments = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Read chapters 1-3 and complete the exercises.',
    dueDate: '2024-10-10',
    assignedTo: 'All Students',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'JavaScript Basics',
    description: 'Complete the JavaScript basics quiz.',
    dueDate: '2024-10-12',
    assignedTo: 'All Students',
    status: 'Completed',
  },
];

const Assignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenModal = () => {
    setSelectedAssignment(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = (assignment) => {
    if (isEditing) {
      setAssignments(assignments.map(a => (a.id === assignment.id ? assignment : a)));
    } else {
      setAssignments([...assignments, { ...assignment, id: assignments.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Assignments Management</h2>
      <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Assignment</button>

      {/* Assignments List */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-left">Assigned To</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment.id}>
              <td className="p-3">{assignment.title}</td>
              <td className="p-3">{assignment.description}</td>
              <td className="p-3">{assignment.dueDate}</td>
              <td className="p-3">{assignment.assignedTo}</td>
              <td className="p-3">{assignment.status}</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline" onClick={() => handleEdit(assignment)}>Edit</button>
                <button className="text-red-500 hover:underline ml-2" onClick={() => handleDelete(assignment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assignment Modal */}
      {showModal && (
        <Modal 
          assignment={selectedAssignment} 
          onSave={handleSave} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

// Modal Component for Adding/Editing Assignments
const Modal = ({ assignment, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    status: 'Pending',
  });

  React.useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    }
  }, [assignment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h3 className="text-xl mb-4">{assignment ? 'Edit Assignment' : 'Add New Assignment'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Assignment Title"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
            required
          >
            <option value="">Select User</option>
            <option value="All Students">All Students</option>
            <option value="Specific Student">Specific Student</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assignments;
