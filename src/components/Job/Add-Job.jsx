"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Calendar,
  MapPin,
  Link,
  FileText,
  Briefcase,
} from "lucide-react";
import axios from "axios";

const AddJobForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    position: "", // Added position field
    status: "Applied",
    applicationDate: new Date().toISOString().split('T')[0], // Default to today
    notes: "",
    jobLink: "",
    location: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    
    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }
    
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    
    if (!formData.applicationDate) {
      newErrors.applicationDate = "Application date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/add`,
        formData
      );
      
      console.log("Response:", response.data);
      
      // Reset form after submission
      setFormData({
        jobTitle: "",
        company: "",
        position: "",
        status: "Applied",
        applicationDate: new Date().toISOString().split('T')[0],
        notes: "",
        jobLink: "",
        location: "",
      });
      
      // Show success message
      alert("Job application added successfully!");
      
      // Redirect to dashboard
      router.push("/applications");
      
    } catch (error) {
      console.error(
        "Error adding job application:",
        error.response?.data || error.message
      );
      
      // Handle validation errors from backend
      if (error.response?.status === 400) {
        const backendErrors = error.response.data.errors || {};
        setErrors(backendErrors);
      } else {
        alert(
          "There was an error adding your job application. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Job Application
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Keep track of your job applications and stay organized throughout
            your job search journey.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-xl font-semibold text-white">
              Application Details
            </h2>
            <p className="text-blue-100 mt-1">
              Fill in the information about your job application
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4" />
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                      errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-sm">{errors.jobTitle}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Building2 className="w-4 h-4" />
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. Tech Solutions Inc."
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm">{errors.company}</p>
                  )}
                </div>

                {/* Added Position Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4" />
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                      errors.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. Senior Developer"
                  />
                  {errors.position && (
                    <p className="text-red-500 text-sm">{errors.position}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="e.g. San Francisco, CA or Remote"
                  />
                </div>
              </div>
            </div>

            {/* Application Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Application Details
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4" />
                    Application Date *
                  </label>
                  <input
                    type="date"
                    name="applicationDate"
                    value={formData.applicationDate}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                      errors.applicationDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.applicationDate && (
                    <p className="text-red-500 text-sm">{errors.applicationDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-white"
                  >
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <Link className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Additional Information
                </h3>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Link className="w-4 h-4" />
                  Job Link
                </label>
                <input
                  type="url"
                  name="jobLink"
                  value={formData.jobLink}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="https://example.com/job-posting"
                />
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="w-4 h-4" />
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                  placeholder="Add any additional notes about this application, interview details, contacts, or follow-up reminders..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/applications")}
                className="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  "Add Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;