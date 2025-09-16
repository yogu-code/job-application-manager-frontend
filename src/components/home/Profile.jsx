"use client";

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Software Developer",
    location: "Mumbai, India",
    joined: "April 2025",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-base font-medium text-gray-900">{user.email}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Location</span>
            <span className="text-base font-medium text-gray-900">{user.location}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Joined</span>
            <span className="text-base font-medium text-gray-900">{user.joined}</span>
          </div>
        </div>

        {/* Button Row */}
        <div className="mt-8 flex space-x-3">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
