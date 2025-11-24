import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import DuplicateDataModal from "./DuplicateDataModal";
import { apiFetch } from "../api";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const initialFormData = {
  studentID: "",
  name: "",
  phone: "",
  email: "",
  grades: "",
};

const StudentForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await apiFetch("/api/v1/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setFormData(initialFormData);
          navigate("/");
        } else {
          const data = await res.json();
          if (res.status === 400) {
            console.error("Bad Request:", data);
            openModal();
          } else {
            console.error("Error submitting form:", data.message);
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Add New Student</h1>
        <p className="page-subtitle">Fill in the details to add a new student to the system</p>
      </div>
      
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="back-button-container">
            <Link to="/" className="modern-btn modern-btn-secondary">
              ← Back to Home
            </Link>
          </div>

          <div className="modern-card">
            <div className="modern-card-header">
              <h3 className="mb-0">Student Information Form</h3>
            </div>
            <div className="modern-card-body">
              <form onSubmit={handleSubmit}>
                {/* Student ID */}
                <div className="modern-form-group">
                  <label htmlFor="studentID" className="modern-form-label">Student ID</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    id="studentID"
                    name="studentID"
                    placeholder="Enter student ID (e.g., STU001)"
                    onChange={handleChange}
                    value={formData.studentID}
                    autocomplete="off"
                    required
                  />
                </div>

                {/* Student Name */}
                <div className="modern-form-group">
                  <label htmlFor="studentName" className="modern-form-label">Full Name</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    id="studentName"
                    name="name"
                    placeholder="Enter student's full name"
                    onChange={handleChange}
                    value={formData.name}
                    autocomplete="name"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="modern-form-group">
                  <label htmlFor="studentPhone" className="modern-form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="modern-form-control"
                    id="studentPhone"
                    name="phone"
                    placeholder="Enter phone number (e.g., +1 234 567 8900)"
                    onChange={handleChange}
                    value={formData.phone}
                    autocomplete="tel"
                    required
                  />
                </div>

                {/* Email */}
                <div className="modern-form-group">
                  <label htmlFor="studentEmail" className="modern-form-label">Email Address</label>
                  <input
                    type="email"
                    className="modern-form-control"
                    id="studentEmail"
                    name="email"
                    placeholder="Enter email address"
                    onChange={handleChange}
                    value={formData.email}
                    autocomplete="email"
                    required
                  />
                </div>

                {/* Grade */}
                <div className="modern-form-group">
                  <label htmlFor="studentGrade" className="modern-form-label">Grade Level</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    id="studentGrade"
                    name="grades"
                    placeholder="Enter grade level (e.g., 10th Grade, A+)"
                    onChange={handleChange}
                    value={formData.grades}
                    autocomplete="off"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="modern-btn modern-btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="loading-container">
                      <BarLoader
                        color={"#ffffff"}
                        loading={loading}
                        css={override}
                        size={150}
                      />
                    </div>
                  ) : (
                    <>
                      ✨ Add Student
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Duplicate Data */}
      <DuplicateDataModal isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default StudentForm;
