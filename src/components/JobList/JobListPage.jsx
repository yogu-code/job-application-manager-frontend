"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import JobList from "./JobList";
import axios from "axios";

const JobListPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const [jobs, setJobs] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    status: "",
    applicationDate: "",
    notes: "",
    jobLink: "",
    location: "",
  });

  // Define valid statuses with labels + colors
  const statuses = [
    { id: "Applied", label: "Applied", color: "bg-blue-100 text-blue-800" },
    {
      id: "Interview",
      label: "Interview",
      color: "bg-yellow-100 text-yellow-800",
    },
    { id: "Offer", label: "Offer", color: "bg-green-100 text-green-800" },
    { id: "Rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      const matchesLocation =
        locationFilter === "all" ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [jobs, searchTerm, statusFilter, locationFilter]);

  const uniqueLocations = useMemo(() => {
    const locations = [...new Set(jobs.map((job) => job.location))];
    return locations.filter(Boolean);
  }, [jobs]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/all`
        );
        const normalizedJobs = response.data.map((job) => ({
          ...job,
          status: job.status,
          notes: job.notes || job.note || "",
        }));
        setJobs(normalizedJobs);
      } catch (error) {
        console.error(
          "Error fetching jobs:",
          error.response?.data || error.message
        );
      }
    };
    fetchJobs();
  }, []);

  const handleAddJob = () => {
    setEditingJob(null);
    setShowModal(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setFormData(job);
    setShowModal(true);
  };

  const handleDeleteJob = (jobId) => {
    if (
      window.confirm("Are you sure you want to delete this job application?")
    ) {
      setJobs(jobs.filter((job) => job.id !== jobId));
    }
  };

  const handleViewJob = (job) => {
    // For now, we'll show an alert with job details
    // In a real app, this would navigate to a detailed view
    alert(
      `Job Details:\n\nTitle: ${job.jobTitle}\nCompany: ${job.company}\nStatus: ${job.status}\nLocation: ${job.location}\nApplication Date: ${job.applicationDate}\nNotes: ${job.notes}`
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJob(null);
    setFormData({
      jobTitle: "",
      company: "",
      status: "applied",
      applicationDate: "",
      notes: "",
      jobLink: "",
      location: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      setJobs(
        jobs.map((job) =>
          job.id === editingJob.id ? { ...formData, id: editingJob.id } : job
        )
      );
    } else {
      const newJob = {
        ...formData,
        id: Math.max(...jobs.map((j) => j.id), 0) + 1,
      };
      setJobs([...jobs, newJob]);
    }
    handleCloseModal();
  };

  const handleStatusChange = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, status: newStatus } : job
      )
    );

    // (Optional) also send update to backend
    // axios
    //   .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${jobId}`, {
    //     status: newStatus,
    //   })
    //   .catch((err) => {
    //     console.error(
    //       "Failed to update status:",
    //       err.response?.data || err.message
    //     );
    //   });
  };

  // const getStatusColor = (statusId) => {
  //   const status = statuses.find((s) => s.id === statusId)
  //   return status ? status.color : "bg-gray-100 text-gray-800"
  // }

  // const formatDate = (dateString) => {
  //   const options = { year: "numeric", month: "short", day: "numeric" }
  //   return new Date(dateString).toLocaleDateString(undefined, options)
  // }

  console.log("Rendered with jobs:", filteredJobs);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Job Applications
            </h1>
            <p className="mt-2 text-gray-600">
              Track and manage your job search progress
            </p>
          </div>
          <button
            onClick={() => router.push("/add-job")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Job
          </button>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          statuses={statuses}
          uniqueLocations={uniqueLocations}
          totalJobs={jobs.length}
          filteredCount={filteredJobs.length}
        />

        <JobList
          jobs={filteredJobs}
          statuses={statuses}
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
          onViewJob={handleViewJob}
          onAddJob={handleAddJob}
          onStatusChange={handleStatusChange} // ✅ new prop
        />
      </div>

      {/* Add/Edit Job Modal */}
      {showModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {editingJob
                        ? "Edit Job Application"
                        : "Add New Job Application"}
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Frontend Developer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company *
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Tech Solutions Inc."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Application Date *
                            </label>
                            <input
                              type="date"
                              name="applicationDate"
                              value={formData.applicationDate}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {statuses.map((status) => (
                                <option key={status.id} value={status.id}>
                                  {status.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. San Francisco, CA or Remote"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Link
                          </label>
                          <input
                            type="url"
                            name="jobLink"
                            value={formData.jobLink}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://example.com/job-posting"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes
                          </label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add any additional notes about this application..."
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {editingJob ? "Update Application" : "Add Application"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListPage;
