import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    // Fetch data from backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiFetch("/api/v1/students");
      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteClick = (studentId) => {
    setSelectedStudentId(studentId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Perform the deletion here
      const response = await apiFetch(`/api/v1/students/${selectedStudentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Optionally update the UI or perform any other action upon successful deletion
        console.log("Student deleted successfully!");
        setDeleteModalOpen(false);
        fetchData(); // Fetch updated data after deletion
      } else {
        console.error("Error deleting student:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Student Database</h1>
          <p className="page-subtitle">Manage and track all student information in one place</p>
        </div>

        <div className="add-btn-container">
          <Link to="/StudentForm">
            <button className="modern-btn modern-btn-primary">
              ➕ Add New Student
            </button>
          </Link>
        </div>

        <div className="modern-card">
          <table className="modern-table">
            <thead>
              <tr>
                <th scope="col">👤 Student ID</th>
                <th scope="col">📝 Full Name</th>
                <th scope="col">📞 Phone</th>
                <th scope="col">📧 Email</th>
                <th scope="col">🎓 Grade</th>
                <th scope="col">⚡ Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id} className="hover-scale">
                    <th scope="row" style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                      {student.studentID}
                    </th>
                    <td style={{ fontWeight: '500' }}>{student.name}</td>
                    <td>{student.phone}</td>
                    <td style={{ color: 'var(--primary-dark)' }}>{student.email}</td>
                    <td>
                      <span style={{ 
                        background: 'linear-gradient(135deg, var(--success-color), #059669)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: 'var(--border-radius)',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {student.grades}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/UpdateStudent/${student._id}`}>
                          <button className="modern-btn modern-btn-primary modern-btn-sm" title="Edit Student">
                            <EditIcon style={{ fontSize: 16 }} />
                            Edit
                          </button>
                        </Link>

                        <button
                          className="modern-btn modern-btn-danger modern-btn-sm"
                          title="Delete Student"
                          onClick={() => handleDeleteClick(student._id)}
                        >
                          <DeleteIcon style={{ fontSize: 16 }} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ 
                    textAlign: 'center', 
                    padding: '3rem',
                    color: 'var(--gray-500)',
                    fontStyle: 'italic'
                  }}>
                    <div>
                      <h4>No students found</h4>
                      <p>Start by adding your first student to the database!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirmation}
        />
      </div>
    </div>
  );
};

export default StudentList;
