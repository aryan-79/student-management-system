"use client";
import CSVUpload from "@/components/CSVUpload";
import { useEffect, useState } from "react";
import {
  acceptApplication,
  rejectApplication,
} from "@/server-actions/applicationResponse";
import { useRouter } from "next/navigation";

const Admin = () => {
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/online-application");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.log("Error during fetch", error.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAccept = async (application) => {
    try {
      await acceptApplication(application);
      fetchApplications();
    } catch (error) {
      console.error("Error accepting application", error.message);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await rejectApplication(applicationId);
      fetchApplications();
    } catch (error) {
      console.error("Error rejecting application", error.message);
    }
  };

  return (
    <div>
      <h2 className="block">Admin page</h2>
      {applications.map((application) => (
        <div key={application._id}>
          <p>type: {typeof application._id}</p>
          <p>_id: {application._id}</p>
          <p>firstName: {application.firstName}</p>
          <p>middleName: {application.middleName}</p>
          <p>lastName: {application.lastName}</p>
          <p>email: {application.email}</p>
          <p>gradeIn12: {application.gradeIn12}</p>
          <p>gradeIn10: {application.gradeIn10}</p>

          <div className="flex justify-center gap-10">
            <button
              className="bg-primary"
              onClick={() => handleAccept(application)}
            >
              Accept
            </button>
            <button
              className="bg-danger-400"
              onClick={() => handleReject(application._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
      {/* <CSVUpload /> */}
      {/* <h3>Name: </h3>
      {applicationData.middleName ? (
        <p>
          applicationData.firstName + " " + applicationData.middleName+ " " +
          applicationData.lastName
        </p>
      ) : (
        applicationData.firstName + " " + applicationData.lastName
      )}

      <h3>Email</h3>
      <p>{applicationData.email}</p>
      <h3>
        12<sup>th</sup> grade
      </h3>
      <p>{applicationData.gradeIn12}</p>
      <h3>
        10<sup>th</sup> grade
      </h3>
      <p>{applicationData.gradeIn10}</p> */}
    </div>
  );
};

export default Admin;
