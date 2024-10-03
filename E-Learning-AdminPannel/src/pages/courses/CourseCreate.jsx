import React, { useState } from 'react';

// Sample data
const initialCourses = [
  {
    id: 1,
    title: 'Introduction to React',
    instructor: 'John Doe',
    duration: '4 weeks',
    status: 'Active',
    videoUrl: '',
  },
  {
    id: 2,
    title: 'JavaScript Basics',
    instructor: 'Jane Smith',
    duration: '3 weeks',
    status: 'Active',
    videoUrl: '',
  },
];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenModal = () => {
    setSelectedCourse(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = (course) => {
    if (isEditing) {
      setCourses(courses.map(c => (c.id === course.id ? course : c)));
    } else {
      setCourses([...courses, { ...course, id: courses.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Courses Management</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded">Add New Course</button>
      </div>

      {/* Courses List */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Course Title</th>
            <th className="p-3 text-left">Instructor</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(course => (
            <tr key={course.id}>
              <td className="p-3">{course.title}</td>
              <td className="p-3">{course.instructor}</td>
              <td className="p-3">{course.duration}</td>
              <td className="p-3">{course.status}</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline" onClick={() => handleEdit(course)}>Edit</button>
                <button className="text-red-500 hover:underline ml-2" onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Course Modal */}
      {showModal && (
        <Modal 
          course={selectedCourse} 
          onSave={handleSave} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

// Modal Component for Adding/Editing Courses
const Modal = ({ course, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    duration: '',
    status: 'Active',
    videoUrl: '',
  });

  React.useEffect(() => {
    if (course) {
      setFormData(course);
    }
  }, [course]);

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
        <h3 className="text-xl mb-4">{course ? 'Edit Course' : 'Add New Course'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Instructor Name"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="Video URL"
            className="border p-2 rounded mb-4 w-full"
          />
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

export default Courses;
