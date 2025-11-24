import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import { apiFetch } from "../api";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const UpdateStudent = () => {
  const { id } = useParams();
  const [value, setValue] = useState({
    studentID: "",
    name: "",
    phone: "",
    email: "",
    grades: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student details when component mounts or id changes
    const fetchStudentDetails = async () => {
      try {
        const response = await apiFetch(`/api/v1/students/${id}`);
        const data = await response.json();
        const studentDetails = data.student;

        setValue({
          studentID: studentDetails.studentID,
          name: studentDetails.name,
          phone: studentDetails.phone,
          email: studentDetails.email,
          grades: studentDetails.grades,
        });
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    if (id) fetchStudentDetails();
  }, [id]);

  const setData = (e) => {
    const { name, value } = e.target;

    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await apiFetch(`/api/v1/students/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (response.ok) {
          // Redirect or perform any other action upon successful update
          console.log("Student updated successfully!");
          // Reset form data after successful update
          setValue({
            studentID: "",
            name: "",
            phone: "",
            email: "",
            grades: "",
          });
          navigate("/"); // Redirect to home or any other page
        } else {
          console.error("Error updating student:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating student:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Update Student</h1>
        <p className="page-subtitle">Modify student information in the database</p>
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
              <h3 className="mb-0">✏️ Update Student Information</h3>
            </div>
            <div className="modern-card-body">
              <form onSubmit={updateStudent}>
                {/* Student ID */}
                <div className="modern-form-group">
                  <label htmlFor="studentID" className="modern-form-label">Student ID</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    id="studentID"
                    name="studentID"
                    placeholder="Enter student ID (e.g., STU001)"
                    onChange={setData}
                    value={value.studentID}
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
                    onChange={setData}
                    value={value.name}
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
                    onChange={setData}
                    value={value.phone}
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
                    onChange={setData}
                    value={value.email}
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
                    onChange={setData}
                    value={value.grades}
                    autocomplete="off"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="modern-btn modern-btn-success w-100"
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
                      ✅ Update Student
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
