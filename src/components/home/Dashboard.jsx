"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Briefcase,
  MapPin,
  ExternalLink,
  Filter,
  Search,
  Plus,
} from "lucide-react";
import axios from "axios";

const JobTrackerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    pending: 0,
    rejected: 0,
    weeklyTotal: 0,
    weeklyInterviews: 0,
  });

  // Fetch applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/all`
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jobs = response.data;

        // Normalize status for consistency
        const normalizeStatus = (status) => {
          if (!status) return "unknown";
          const s = status.toLowerCase();
          if (s.includes("Interviewing")) return "interview";
          if (s.includes("Offer")) return "offer";
          if (s.includes("Pending")) return "pending";
          if (s.includes("Rejected")) return "rejected";
          if (s.includes("Applied")) return "applied";
          return "unknown";
        };

        const jobsWithNormalizedStatus = jobs.map((job) => ({
          ...job,
          status: normalizeStatus(job.status),
        }));

        // Calculate stats
        const total = jobsWithNormalizedStatus.length;
        const interviews = jobsWithNormalizedStatus.filter(
          (j) => j.status === "interview"
        ).length;
        const offers = jobsWithNormalizedStatus.filter(
          (j) => j.status === "offer"
        ).length;
        const pending = jobsWithNormalizedStatus.filter(
          (j) => j.status === "pending"
        ).length;
        const rejected = jobsWithNormalizedStatus.filter(
          (j) => j.status === "rejected"
        ).length;

        // Weekly trends
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentApplications = jobsWithNormalizedStatus.filter(
          (job) => new Date(job.createdAt) >= oneWeekAgo
        );

        const weeklyTotal = recentApplications.length;
        const weeklyInterviews = recentApplications.filter(
          (j) => j.status === "interview"
        ).length;

        // Update state
        setApplications(jobsWithNormalizedStatus);
        setFilteredApplications(jobsWithNormalizedStatus);
        setStats({
          totalApplications: total,
          interviews,
          offers,
          pending,
          rejected,
          weeklyTotal,
          weeklyInterviews,
        });
      } catch (error) {
        console.error("Error fetching applications:", error);

        // Reset state on error
        setApplications([]);
        setFilteredApplications([]);
        setStats({
          totalApplications: 0,
          interviews: 0,
          offers: 0,
          pending: 0,
          rejected: 0,
          weeklyTotal: 0,
          weeklyInterviews: 0,
        });
      }
    };

    fetchApplications();
  }, []);

  // Filter and search functionality with case-insensitive status matching
  useEffect(() => {
    let filtered = applications;

    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (app) => app.status?.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [applications, selectedFilter, searchTerm]);

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "interview":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "offer":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "applied":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "interview":
        return <Calendar className="h-4 w-4" />;
      case "offer":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <FileText className="h-4 w-4" />;
      case "applied":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Sort applications by created date (most recent first) and limit display
  const recentApplications = [...filteredApplications]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 9); // Show more applications

  // Format date helper
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = now - date;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return "Today";
      } else if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year:
            date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
        });
      }
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-slate-900">
                  Job Tracker
                </h1>
                <p className="text-slate-600">
                  Monitor your application progress
                </p>
              </div>
            </div>
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              <Plus className="h-5 w-5 mr-2" />
              Add Application
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.totalApplications}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    {stats.weeklyTotal > 0
                      ? `+${stats.weeklyTotal} this week`
                      : "No new applications"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Interviews</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.interviews}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    {stats.weeklyInterviews > 0
                      ? `+${stats.weeklyInterviews} this week`
                      : "Keep applying!"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Offers</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.offers}
                </p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    {stats.offers > 0 ? "Congratulations!" : "Keep going!"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.pending}
                </p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">
                    {stats.pending > 0 ? "Awaiting response" : "All caught up!"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">
              Recent Applications
            </h3>
            <p className="text-slate-600 mt-1">
              Your latest job applications and their status
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentApplications.map((app) => (
                <div
                  key={app._id}
                  className="group relative bg-slate-50 rounded-xl border border-slate-200 p-6 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 text-lg group-hover:text-blue-600 transition-colors duration-200">
                        {app.position || "Position not specified"}
                      </h4>
                      <p className="text-slate-600 font-medium">
                        {app.company || "Company not specified"}
                      </p>
                    </div>
                    {app.applicationUrl && (
                      <a
                        href={app.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Open application link"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-slate-600">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm truncate">
                        {app.location || "Location not specified"}
                      </span>
                    </div>

                    {app.salary && (
                      <div className="flex items-center text-slate-600">
                        <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">
                          {app.salary}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusIcon(app.status)}
                        <span className="ml-1 capitalize">
                          {app.status || "Unknown"}
                        </span>
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDate(app.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredApplications.length === 0 && applications.length > 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No applications found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}

            {applications.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No applications yet
                </h3>
                <p className="text-slate-600">
                  Start by adding your first job application to track your
                  progress.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobTrackerDashboard;
