"use client"
import { Edit, Trash2, Eye, MapPin, Building, Calendar } from "lucide-react"


const JobList = ({ jobs, statuses, onEditJob, onDeleteJob, onViewJob, onAddJob }) => {
  const getStatusColor = (statusId) => {
    const status = statuses.find((s) => s.id === statusId)
    return status ? status.color : "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" } 
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {jobs.length === 0 ? (
          <li className="px-6 py-12 text-center">
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No matching applications</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </li>
        ) : (
          jobs.map((job) => (
            <li key={job.id}>
              <div className="px-6 py-6 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-lg">{job.company.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 px-4">
                      <div>
                        <div className="flex items-center">
                          <p className="text-lg font-semibold text-gray-900 truncate">{job.jobTitle}</p>
                          <span
                            className={`ml-3 inline-flex text-xs leading-5 font-semibold rounded-full px-3 py-1 ${getStatusColor(job.status)}`}
                          >
                            {statuses.find((s) => s.id === job.status)?.label}
                          </span>
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
                      onClick={() => onViewJob(job)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditJob(job)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                      title="Edit Job"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteJob(job.id)}
                      className="inline-flex items-center p-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                      title="Delete Job"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {job.jobLink && (
                      <a
                        href={job.jobLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                      >
                        View Job
                        <svg
                          className="ml-1 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {job.notes && (
                  <div className="mt-3 flex items-start">
                    <svg
                      className="flex-shrink-0 mr-2 mt-0.5 h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {job.notes.length > 120 ? `${job.notes.substring(0, 120)}...` : job.notes}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default JobList
