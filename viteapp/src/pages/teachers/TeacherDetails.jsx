import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EntityName, ApiUrl, ReactRouterPath } from "./enums";
import { useParams } from "react-router-dom";

const TeacherDetails = () => {
  const [teacher, setTeacher] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}${id}/show`);
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [id]);

  const formatDate = (dateString) => {
    // Create a Date object from the string, considering the time zone information
    const date = new Date(dateString.replace('Z', ''));

    // Use the Intl.DateTimeFormat API for formatting
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC', // Specify UTC time zone for accurate formatting
    };

    // Format the date according to the options
    return date.toLocaleString(undefined, options);
  };

  const renderDetailItem = (key, value) => {
    // Remove underscores from the key
    const formattedKey = key.replace(/_/g, ' ');

    // Check if the value is a boolean
    if (typeof value === 'boolean') {
      return (
        <div className="detail-item" key={key}>
          <div className="detail-item-title">{formattedKey}:</div>
          <div className="detail-item-p">
            <p>{value ? 'Yes' : 'No'}</p>
          </div>
        </div>
      );
    } else if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Check if the value is a date string (YYYY-MM-DD)
      return (
        <div className="detail-item" key={key}>
          <div className="detail-item-title">{formattedKey}:</div>
          <div className="detail-item-p">
            <p>{formatDate(value)}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="detail-item" key={key}>
          <div className="detail-item-title">{formattedKey}:</div>
          <div className="detail-item-p">
            <p>{value}</p>
          </div>
        </div>
      );
    }
  };


  const renderProfileDetails = () => {
    return Object.entries(teacher).map(([key, value]) => {
      if (key !== 'user') {
        return renderDetailItem(key, value);
      } else {
        return null; // Don't render the user object directly
      }
    });
  };

  if (!teacher) {
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
                    {teacher.user.name}
                  </p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Email :</div>
                <div className="detail-item-p">
                  <p>{teacher.user.email}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Phone :</div>
                <div className="detail-item-p">
                  <p>{teacher.user.phone}</p>
                </div>
              </div>

              {renderProfileDetails()}

              <Link to={`${ReactRouterPath}${teacher.id}/edit/`}>
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

export default TeacherDetails;
