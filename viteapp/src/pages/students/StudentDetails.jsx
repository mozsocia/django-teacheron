import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EntityName, ApiUrl, ReactRouterPath } from "./enums";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}${id}/show`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [id]);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header className="page-header">
        <div className="mb-4 md:mb-0">
          <h1 className="page-title">{EntityName}</h1>
        </div>
        <div className="page-header-right-actions grid grid-cols-max-content gap-2">
          <Link to={`${ReactRouterPath}list`}>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              <svg
                className="w-5 h-5 fill-current opacity-70 mr-1 md:mr-2"
                viewBox="0 0 24 24"
              >
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
              </svg>
              <span className="hidden md:inline-block">List {EntityName}</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="card">
        <header className="card-header">
          <h2 className="card-title"> {EntityName} Details</h2>
        </header>
        <div className="card-body">
          <div className="space-y-1">
            <div className="detail-section">
              <div className="detail-item">
                <div className="detail-item-title">Name :</div>
                <div className="detail-item-p">
                  <p>
                    {student.user.name}
                  </p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Email :</div>
                <div className="detail-item-p">
                  <p>{student.user.email}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Phone :</div>
                <div className="detail-item-p">
                  <p>{student.user.phone}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Education :</div>
                <div className="detail-item-p">
                  <p>{student.education}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-item-title">Bio :</div>
                <div className="detail-item-p">
                  <p>{student.bio}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Date of Birth :</div>
                <div className="detail-item-p">
                  <p>{student.user.date_of_birth}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-item-title">Is Active: </div>
                <div className="detail-item-p">
                  <p>{student.is_active ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-item-title">Is Verified: </div>
                <div className="detail-item-p">
                  <p>{student.is_verified ? "Yes" : "No"}</p>
                </div>
              </div>


              <Link to={`${ReactRouterPath}${student.id}/edit/`}>
                <button className="btn btn-indigo-outline mt-3">
                  <span className="hidden md:inline-block">
                    Edit {EntityName}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
