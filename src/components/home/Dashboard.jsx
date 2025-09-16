"use client"

import { useState } from "react"
import {
  Building,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  Plus,
  Filter,
  Search,
  Bell,
  Settings,
  User,
  Briefcase,
} from "lucide-react"

const JobTrackerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // Static data
  const stats = {
    totalApplications: 47,
    interviews: 12,
    offers: 3,
    pending: 28,
  }

  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Frontend Developer",
      status: "Interview Scheduled",
      appliedDate: "2024-01-15",
      nextAction: "Technical Interview - Jan 22",
      salary: "$120,000",
      priority: "high",
      logo: "🔍",
    },
    {
      id: 2,
      company: "Meta",
      position: "React Developer",
      status: "Applied",
      appliedDate: "2024-01-14",
      nextAction: "Follow up in 3 days",
      salary: "$130,000",
      priority: "high",
      logo: "📘",
    },
    {
      id: 3,
      company: "Netflix",
      position: "Full Stack Engineer",
      status: "Phone Screening",
      appliedDate: "2024-01-10",
      nextAction: "Waiting for response",
      salary: "$125,000",
      priority: "medium",
      logo: "🎬",
    },
    {
      id: 4,
      company: "Spotify",
      position: "Software Engineer",
      status: "Rejected",
      appliedDate: "2024-01-08",
      nextAction: "Apply to similar roles",
      salary: "$110,000",
      priority: "low",
      logo: "🎵",
    },
    {
      id: 5,
      company: "Airbnb",
      position: "UI/UX Engineer",
      status: "Offer Extended",
      appliedDate: "2024-01-05",
      nextAction: "Response due Jan 25",
      salary: "$135,000",
      priority: "high",
      logo: "🏠",
    },
  ]

  const upcomingInterviews = [
    {
      company: "Google",
      position: "Frontend Developer",
      date: "Jan 22, 2024",
      time: "2:00 PM",
      type: "Technical Interview",
      interviewer: "John Smith",
    },
    {
      company: "Apple",
      position: "iOS Developer",
      date: "Jan 24, 2024",
      time: "10:00 AM",
      type: "System Design",
      interviewer: "Sarah Johnson",
    },
    {
      company: "Microsoft",
      position: "Cloud Engineer",
      date: "Jan 26, 2024",
      time: "3:30 PM",
      type: "Behavioral",
      interviewer: "Mike Davis",
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      Applied: "bg-blue-100 text-blue-800",
      "Interview Scheduled": "bg-yellow-100 text-yellow-800",
      "Phone Screening": "bg-purple-100 text-purple-800",
      "Offer Extended": "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      Accepted: "bg-emerald-100 text-emerald-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: "border-l-red-500",
      medium: "border-l-yellow-500",
      low: "border-l-green-500",
    }
    return colors[priority] || "border-l-gray-500"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Interviews</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.interviews}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Offers</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.offers}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications & Upcoming Interviews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Applications */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View all</button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div
                        key={app.id}
                        className={`border-l-4 ${getPriorityColor(app.priority)} bg-gray-50 p-4 rounded-r-lg`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{app.logo}</div>
                            <div>
                              <h4 className="font-medium text-gray-900">{app.position}</h4>
                              <p className="text-sm text-gray-600">{app.company}</p>
                              <p className="text-xs text-gray-500">{app.appliedDate}</p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}
                          >
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Interviews */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Upcoming Interviews</h3>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View all</button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{interview.position}</h4>
                            <p className="text-sm text-gray-600">{interview.company}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-500">{interview.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-500">{interview.time}</span>
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                            {interview.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Plus className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Add Application</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Schedule Interview</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Building className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Add Company</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <TrendingUp className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">View Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* {activeTab === "applications" && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">All Applications</h3>
                <div className="flex space-x-3">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Application
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company/Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{app.logo}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{app.position}</div>
                            <div className="text-sm text-gray-500">{app.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.appliedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.salary}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.nextAction}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "interviews" && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Interview Schedule</h3>
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Interview
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-6">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{interview.position}</h4>
                        <p className="text-gray-600">{interview.company}</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-500">Date & Time</p>
                            <p className="text-sm font-medium text-gray-900">
                              {interview.date} at {interview.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Interview Type</p>
                            <p className="text-sm font-medium text-gray-900">{interview.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Interviewer</p>
                            <p className="text-sm font-medium text-gray-900">{interview.interviewer}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                          Prepare
                        </button>
                        <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Application Success Rate</h3>
                <div className="text-3xl font-bold text-indigo-600">25.5%</div>
                <p className="text-sm text-gray-500 mt-2">12 interviews from 47 applications</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Average Response Time</h3>
                <div className="text-3xl font-bold text-green-600">5.2 days</div>
                <p className="text-sm text-gray-500 mt-2">Companies typically respond within a week</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">28</div>
                  <div className="text-sm text-gray-500">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <div className="text-sm text-gray-500">Interviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-500">Offers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">4</div>
                  <div className="text-sm text-gray-500">Rejected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">47</div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </main>
    </div>
  )
}

export default JobTrackerDashboard
