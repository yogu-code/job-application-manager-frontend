"use client";
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Video, Phone, Building, Plus, X, Edit, Trash2, CheckCircle, AlertCircle, Eye } from 'lucide-react';

const InterviewPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [activeTab, setActiveTab] = useState('scheduled'); // 'scheduled' or 'accepted'

  // All accepted applications
  const acceptedApplications = [
    {
      id: 1,
      position: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      appliedDate: "Sept 10, 2025",
      status: "Interview Scheduled",
      applicationId: "APP-001",
      hasInterview: true
    },
    {
      id: 2,
      position: "Product Manager",
      company: "InnovateLab",
      appliedDate: "Sept 12, 2025", 
      status: "Interview Scheduled",
      applicationId: "APP-002",
      hasInterview: true
    },
    {
      id: 3,
      position: "UX Designer",
      company: "DesignStudio Pro",
      appliedDate: "Sept 8, 2025",
      status: "Interview Scheduled",
      applicationId: "APP-003",
      hasInterview: true
    },
    {
      id: 4,
      position: "Full Stack Engineer",
      company: "StartupXYZ",
      appliedDate: "Sept 15, 2025",
      status: "Interview Scheduled",
      applicationId: "APP-004",
      hasInterview: true
    },
    {
      id: 5,
      position: "Data Scientist",
      company: "DataTech Solutions",
      appliedDate: "Sept 5, 2025",
      status: "Accepted - Pending Interview",
      applicationId: "APP-005",
      hasInterview: false
    },
    {
      id: 6,
      position: "DevOps Engineer",
      company: "CloudFirst Inc.",
      appliedDate: "Sept 18, 2025",
      status: "Accepted - Pending Interview",
      applicationId: "APP-006",
      hasInterview: false
    }
  ];

  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: 1,
      position: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      date: "Sept 25, 2025",
      time: "10:00 AM",
      type: "Technical",
      venue: "Remote - Zoom",
      interviewer: "Sarah Johnson",
      interviewerEmail: "sarah.johnson@techcorp.com",
      stage: "Round 2",
      duration: "60 minutes",
      preparationNotes: "Review React hooks and state management",
      applicationId: "APP-001"
    },
    {
      id: 2,
      position: "Product Manager",
      company: "InnovateLab",
      date: "Sept 27, 2025", 
      time: "2:30 PM",
      type: "Behavioral",
      venue: "Office - 123 Innovation St, Suite 400",
      interviewer: "Mike Chen",
      interviewerEmail: "mike.chen@innovatelab.com",
      stage: "Round 1",
      duration: "45 minutes",
      preparationNotes: "Prepare STAR method examples for leadership scenarios",
      applicationId: "APP-002"
    },
    {
      id: 3,
      position: "UX Designer",
      company: "DesignStudio Pro",
      date: "Sept 30, 2025",
      time: "11:15 AM", 
      type: "Portfolio Review",
      venue: "Video Call - Google Meet",
      interviewer: "Emma Williams",
      interviewerEmail: "emma.williams@designstudio.com",
      stage: "Final Round",
      duration: "90 minutes",
      preparationNotes: "Present 3 key projects with design process walkthrough",
      applicationId: "APP-003"
    },
    {
      id: 4,
      position: "Full Stack Engineer",
      company: "StartupXYZ",
      date: "Oct 2, 2025",
      time: "3:00 PM",
      type: "Technical",
      venue: "Phone Interview",
      interviewer: "Alex Rodriguez",
      interviewerEmail: "alex@startupxyz.com",
      stage: "Round 1",
      duration: "75 minutes",
      preparationNotes: "Live coding session - JavaScript and Node.js focus",
      applicationId: "APP-004"
    }
  ]);

  const [formData, setFormData] = useState({
    applicationId: '',
    date: '',
    time: '',
    type: '',
    venue: '',
    interviewer: '',
    interviewerEmail: '',
    stage: '',
    duration: '',
    preparationNotes: ''
  });

  const interviewTypes = ['Technical', 'Behavioral', 'Portfolio Review', 'HR Screening', 'Final Round', 'Panel Interview'];
  const interviewStages = ['Round 1', 'Round 2', 'Round 3', 'Final Round', 'HR Screening'];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const selectedApp = acceptedApplications.find(app => app.applicationId === formData.applicationId);
    
    const newInterview = {
      id: Date.now(),
      position: selectedApp.position,
      company: selectedApp.company,
      ...formData,
      applicationId: formData.applicationId
    };

    if (editingInterview) {
      setUpcomingInterviews(prev => 
        prev.map(interview => 
          interview.id === editingInterview.id ? { ...interview, ...formData } : interview
        )
      );
      setEditingInterview(null);
    } else {
      setUpcomingInterviews(prev => [...prev, newInterview]);
    }

    setFormData({
      applicationId: '',
      date: '',
      time: '',
      type: '',
      venue: '',
      interviewer: '',
      interviewerEmail: '',
      stage: '',
      duration: '',
      preparationNotes: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (interview) => {
    setFormData({
      applicationId: interview.applicationId,
      date: interview.date,
      time: interview.time,
      type: interview.type,
      venue: interview.venue,
      interviewer: interview.interviewer,
      interviewerEmail: interview.interviewerEmail,
      stage: interview.stage,
      duration: interview.duration,
      preparationNotes: interview.preparationNotes
    });
    setEditingInterview(interview);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setUpcomingInterviews(prev => prev.filter(interview => interview.id !== id));
  };

  const getCompanyInitials = (companyName) => {
    return companyName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'technical':
        return 'bg-blue-100 text-blue-800';
      case 'behavioral':
        return 'bg-green-100 text-green-800';
      case 'portfolio review':
        return 'bg-purple-100 text-purple-800';
      case 'hr screening':
        return 'bg-orange-100 text-orange-800';
      case 'final round':
        return 'bg-red-100 text-red-800';
      case 'panel interview':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'interview scheduled':
        return 'bg-green-100 text-green-800';
      case 'accepted - pending interview':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLocationIcon = (venue) => {
    const lowerVenue = venue?.toLowerCase() || '';
    if (lowerVenue.includes('remote') || lowerVenue.includes('zoom') || lowerVenue.includes('meet')) {
      return <Video className="h-4 w-4 text-gray-400" />;
    } else if (lowerVenue.includes('phone')) {
      return <Phone className="h-4 w-4 text-gray-400" />;
    } else {
      return <MapPin className="h-4 w-4 text-gray-400" />;
    }
  };

  const availableApplications = acceptedApplications.filter(app => 
    !upcomingInterviews.some(interview => interview.applicationId === app.applicationId)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Management</h1>
          <p className="text-gray-600">Manage your accepted applications and schedule interviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accepted Applications</p>
                <p className="text-2xl font-bold text-gray-900">{acceptedApplications.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Scheduled Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingInterviews.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Scheduling</p>
                <p className="text-2xl font-bold text-gray-900">
                  {acceptedApplications.filter(app => !app.hasInterview).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Companies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(acceptedApplications.map(app => app.company)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'scheduled'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Scheduled Interviews ({upcomingInterviews.length})
              </button>
              <button
                onClick={() => setActiveTab('accepted')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'accepted'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Accepted Applications ({acceptedApplications.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Add Interview Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingInterview ? 'Edit Interview Details' : 'Schedule New Interview'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingInterview(null);
                    setFormData({
                      applicationId: '', date: '', time: '', type: '', venue: '',
                      interviewer: '', interviewerEmail: '', stage: '', duration: '', preparationNotes: ''
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Application *
                    </label>
                    <select
                      value={formData.applicationId}
                      onChange={(e) => setFormData(prev => ({ ...prev, applicationId: e.target.value }))}
                      required
                      disabled={editingInterview}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Choose an application</option>
                      {(editingInterview ? acceptedApplications : availableApplications).map(app => (
                        <option key={app.applicationId} value={app.applicationId}>
                          {app.position} - {app.company}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interview Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interview Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select type</option>
                      {interviewTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interview Stage *
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select stage</option>
                      {interviewStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 60 minutes"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Venue/Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Remote - Zoom, Office Address, Phone Interview"
                    value={formData.venue}
                    onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interviewer Name
                    </label>
                    <input
                      type="text"
                      value={formData.interviewer}
                      onChange={(e) => setFormData(prev => ({ ...prev, interviewer: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interviewer Email
                    </label>
                    <input
                      type="email"
                      value={formData.interviewerEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, interviewerEmail: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preparation Notes
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Add any preparation notes, topics to review, or special instructions..."
                    value={formData.preparationNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, preparationNotes: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingInterview(null);
                      setFormData({
                        applicationId: '', date: '', time: '', type: '', venue: '',
                        interviewer: '', interviewerEmail: '', stage: '', duration: '', preparationNotes: ''
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    {editingInterview ? 'Update Interview' : 'Schedule Interview'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'scheduled' ? (
          // Scheduled Interviews
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Scheduled Interviews</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Schedule Interview</span>
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {upcomingInterviews.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>No interviews scheduled yet.</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="mt-2 text-indigo-600 hover:text-indigo-500"
                  >
                    Schedule your first interview
                  </button>
                </div>
              ) : (
                upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">
                            {getCompanyInitials(interview.company)}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {interview.position}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(interview.stage)}`}>
                              {interview.stage}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1 mb-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <p className="text-sm font-medium text-gray-700">{interview.company}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{interview.time}</span>
                              {interview.duration && <span>({interview.duration})</span>}
                            </div>
                            <div className="flex items-center space-x-1">
                              {getLocationIcon(interview.venue)}
                              <span className="truncate">{interview.venue}</span>
                            </div>
                            {interview.interviewer && (
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{interview.interviewer}</span>
                              </div>
                            )}
                          </div>
                          
                          {interview.preparationNotes && (
                            <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                              <strong>Notes:</strong> {interview.preparationNotes}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(interview.type)}`}>
                          {interview.type}
                        </span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEdit(interview)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="Edit Interview"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(interview.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Interview"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          // All Accepted Applications
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">All Accepted Applications</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {acceptedApplications.map((application) => (
                <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {getCompanyInitials(application.company)}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{application.position}</h3>
                        <div className="flex items-center space-x-1 mb-1">
                          <Building className="h-4 w-4 text-gray-400" />
                          <p className="text-sm font-medium text-gray-700">{application.company}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Applied: {application.appliedDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>ID: {application.applicationId}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                      {!application.hasInterview && (
                        <button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, applicationId: application.applicationId }));
                            setShowAddForm(true);
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                        >
                          Schedule Interview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Schedule Interview</span>
            </button>
            <button 
              onClick={() => setActiveTab('accepted')}
              className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CheckCircle className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">View Applications</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Building className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Company Research</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Interview Tips</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;