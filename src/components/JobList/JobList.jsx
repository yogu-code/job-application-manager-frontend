"use client";
import {
  Edit,
  Trash2,
  Eye,
  MapPin,
  Building,
  Calendar,
  X,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
const JobList = ({
  jobs,
  statuses,
  onEditJob,
  onDeleteJob,
  onViewJob,
  onStatusChange, // 👈 new handler
}) => {
  const [selectedJob, setSelectedJob] = useState(null); // 👈 modal state
  const [editingJob, setEditingJob] = useState(null); // for editing
  const getStatusColor = (statusId) => {
    const status = statuses.find(
      (s) => s.id.toLowerCase() === statusId.toLowerCase()
    );
    return status ? status.color : "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // update only status
  const handleStatusUpdate = async (jobId, newStatus) => {
    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${jobId}`,
        { status: newStatus } // 👈 only updating status
      );
      console.log("Status updated:", data);
      onStatusChange(jobId, newStatus); // keep local state in sync
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  // handle update form submit
  const handleUpdateJob = async (jobData) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${jobData._id}`,
        jobData
      );
      alert("Job updated successfully");
      setEditingJob(null);
      window.location.reload(); // temporary, better: update local state
      return data;
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${jobId}`
      );
      alert("Job deleted successfully");
      // Refresh page OR remove from local state if jobs are managed here
      window.location.reload(); // temporary, better: use state update
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {jobs.length === 0 ? (
          <li key="no-jobs" className="px-6 py-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No matching applications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </li>
        ) : (
          jobs.map((job) => (
            <li key={job._id}>
              <div className="px-6 py-6 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-lg">
                          {job.company.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 px-4">
                      <div>
                        <div className="flex items-center space-x-3">
                          <p className="text-lg font-semibold text-gray-900 truncate">
                            {job.jobTitle}
                          </p>

                          {/* 🔽 Status dropdown */}
                          <select
                            value={job.status}
                            onChange={(e) =>
                              handleStatusUpdate(job._id, e.target.value)
                            } // 👈 direct call
                            className={`ml-3 inline-flex text-xs leading-5 font-semibold rounded-full px-3 py-1 ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {statuses.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mt-2 flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Building className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {job.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            Applied: {formatDate(job.applicationDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedJob(job)} // 👈 open modal
                      className="inline-flex items-center p-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingJob(job)} // open edit modal
                      className="inline-flex items-center p-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      title="Edit Job"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        onDeleteJob(job._id);
                        handleDeleteJob(job._id);
                      }}
                      className="inline-flex items-center p-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                      title="Delete Job"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {job.jobLink && (
                      <a
                        href={job.jobLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        View Job
                      </a>
                    )}
                  </div>
                </div>

                {job.notes && (
                  <div className="mt-3 flex items-start">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {job.notes.length > 120
                        ? `${job.notes.substring(0, 120)}...`
                        : job.notes}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 scale-95 animate-scaleIn">
            {/* Close button with hover effect */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>

            {/* Header with gradient accent */}
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedJob.jobTitle}
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <Building className="h-4 w-4 mr-1" />
                <span>{selectedJob.company}</span>
              </div>
            </div>

            {/* Job details with improved layout */}
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-gray-800">
                    {selectedJob.location || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 mr-3 text-green-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </p>
                  <p className="text-gray-800">
                    {formatDate(selectedJob.applicationDate)}
                  </p>
                </div>
              </div>

              {selectedJob.notes && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium text-blue-700 uppercase tracking-wider mb-1">
                    Notes
                  </p>
                  <p className="text-gray-700">{selectedJob.notes}</p>
                </div>
              )}
            </div>

            {/* Action button with improved styling */}
            {selectedJob.jobLink && (
              <a
                href={selectedJob.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Job Posting
              </a>
            )}
          </div>
        </div>
      )}

      {/* Update Application Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 scale-95 animate-scaleIn">
            <button
              onClick={() => setEditingJob(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Update Application
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onEditJob(editingJob);
                setEditingJob(null);
                handleUpdateJob(editingJob);
              }}
              className="space-y-5"
            >
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={editingJob.jobTitle}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, jobTitle: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter job title"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={editingJob.company}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, company: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, location: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter job location"
                  />
                </div>
              </div>

              {/* Application Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={
                      editingJob.applicationDate
                        ? new Date(editingJob.applicationDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        applicationDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={editingJob.notes}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Add any notes about this application"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
