"use client";
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Target, Calendar, Building, Users, 
  Award, Clock, CheckCircle, XCircle, AlertCircle, Eye,
  Filter, Download, RefreshCw, ArrowUp, ArrowDown
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [filterType, setFilterType] = useState('all');

  // Mock data for analytics
  const overallStats = {
    totalApplications: 145,
    accepted: 12,
    rejected: 89,
    pending: 44,
    interviews: 18,
    offers: 6,
    successRate: 8.3, // (accepted/total) * 100
    interviewRate: 12.4, // (interviews/total) * 100
    offerRate: 4.1, // (offers/total) * 100
    avgResponseTime: 14, // days
    improvement: {
      successRate: 2.1,
      interviewRate: -1.2,
      applications: 15
    }
  };

  const monthlyData = [
    { month: 'Jan', applications: 18, interviews: 2, offers: 1, rejected: 12, pending: 3 },
    { month: 'Feb', applications: 22, interviews: 3, offers: 0, rejected: 15, pending: 4 },
    { month: 'Mar', applications: 25, interviews: 4, offers: 2, rejected: 16, pending: 3 },
    { month: 'Apr', applications: 20, interviews: 2, offers: 1, rejected: 13, pending: 4 },
    { month: 'May', applications: 28, interviews: 3, offers: 1, rejected: 19, pending: 5 },
    { month: 'Jun', applications: 32, interviews: 4, offers: 1, rejected: 14, pending: 13 }
  ];

  const applicationStatusData = [
    { name: 'Accepted', value: 12, color: '#10B981' },
    { name: 'Rejected', value: 89, color: '#EF4444' },
    { name: 'Pending', value: 44, color: '#F59E0B' }
  ];

  const companyTypeAnalysis = [
    { type: 'Startups', applications: 45, interviews: 8, offers: 3, successRate: 17.8 },
    { type: 'Mid-size', applications: 62, interviews: 7, offers: 2, successRate: 11.3 },
    { type: 'Enterprise', applications: 38, interviews: 3, offers: 1, successRate: 7.9 }
  ];

  const positionTypeAnalysis = [
    { position: 'Frontend', applications: 38, interviews: 6, offers: 2, successRate: 15.8 },
    { position: 'Backend', applications: 32, interviews: 4, offers: 1, successRate: 12.5 },
    { position: 'Full Stack', applications: 41, interviews: 5, offers: 2, successRate: 12.2 },
    { position: 'DevOps', applications: 18, interviews: 2, offers: 1, successRate: 11.1 },
    { position: 'Data Science', applications: 16, interviews: 1, offers: 0, successRate: 6.3 }
  ];

  const responseTimeData = [
    { timeRange: '1-3 days', count: 15, percentage: 10.3 },
    { timeRange: '4-7 days', count: 28, percentage: 19.3 },
    { timeRange: '1-2 weeks', count: 42, percentage: 29.0 },
    { timeRange: '2-4 weeks', count: 35, percentage: 24.1 },
    { timeRange: '1+ months', count: 25, percentage: 17.2 }
  ];

  const weeklyTrendData = [
    { week: 'Week 1', applications: 8, interviews: 1, offers: 0 },
    { week: 'Week 2', applications: 12, interviews: 2, offers: 1 },
    { week: 'Week 3', applications: 15, interviews: 1, offers: 0 },
    { week: 'Week 4', applications: 10, interviews: 3, offers: 1 }
  ];

  const topPerformingCompanies = [
    { company: 'TechCorp Inc.', applications: 3, interviews: 2, offers: 1, rate: 66.7 },
    { company: 'InnovateLab', applications: 2, interviews: 1, offers: 1, rate: 50.0 },
    { company: 'StartupXYZ', applications: 4, interviews: 2, offers: 0, rate: 50.0 },
    { company: 'DataTech', applications: 3, interviews: 1, offers: 0, rate: 33.3 },
    { company: 'CloudFirst', applications: 2, interviews: 1, offers: 0, rate: 50.0 }
  ];

  const formatPercentage = (value) => `${value.toFixed(1)}%`;

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && trendValue && (
              <div className={`flex items-center mt-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span>{Math.abs(trendValue)}% vs last period</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Analytics</h1>
              <p className="text-gray-600">Track your job application performance and success metrics</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value={overallStats.totalApplications}
            icon={Eye}
            trend="up"
            trendValue={overallStats.improvement.applications}
            color="blue"
          />
          <StatCard
            title="Success Rate"
            value={formatPercentage(overallStats.successRate)}
            icon={Target}
            trend="up"
            trendValue={overallStats.improvement.successRate}
            color="green"
          />
          <StatCard
            title="Interview Rate"
            value={formatPercentage(overallStats.interviewRate)}
            icon={Users}
            trend="down"
            trendValue={overallStats.improvement.interviewRate}
            color="purple"
          />
          <StatCard
            title="Offer Rate"
            value={formatPercentage(overallStats.offerRate)}
            icon={Award}
            color="yellow"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-lg font-semibold text-gray-900">{overallStats.accepted}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-lg font-semibold text-gray-900">{overallStats.rejected}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-lg font-semibold text-gray-900">{overallStats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-lg font-semibold text-gray-900">{overallStats.avgResponseTime} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Application Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                  name="Applications"
                />
                <Area 
                  type="monotone" 
                  dataKey="interviews" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                  name="Interviews"
                />
                <Area 
                  type="monotone" 
                  dataKey="offers" 
                  stackId="3"
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.6}
                  name="Offers"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Application Status Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Position Type Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Success Rate by Position Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={positionTypeAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="position" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="applications" fill="#E5E7EB" name="Applications" />
                <Bar dataKey="interviews" fill="#3B82F6" name="Interviews" />
                <Bar dataKey="offers" fill="#10B981" name="Offers" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Company Type Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance by Company Size</h3>
            <div className="space-y-4">
              {companyTypeAnalysis.map((company, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{company.type}</span>
                    <span className="text-sm font-semibold text-green-600">
                      {formatPercentage(company.successRate)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {company.applications} applications • {company.interviews} interviews • {company.offers} offers
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${company.successRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Response Time Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Response Time Distribution</h3>
            <div className="space-y-3">
              {responseTimeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.timeRange}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Companies */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Companies</h3>
            <div className="space-y-3">
              {topPerformingCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{company.company}</div>
                    <div className="text-sm text-gray-600">
                      {company.applications} apps • {company.interviews} interviews • {company.offers} offers
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    company.rate >= 50 ? 'bg-green-100 text-green-800' :
                    company.rate >= 25 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {formatPercentage(company.rate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Powered Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Strong Performance</span>
              </div>
              <p className="text-sm text-green-700">
                Your success rate with startups (17.8%) is significantly higher than enterprise companies. 
                Consider focusing more on startup applications.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Optimization Opportunity</span>
              </div>
              <p className="text-sm text-blue-700">
                Frontend positions show the highest success rate (15.8%). Your skills align well with 
                these roles - consider applying to more frontend positions.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Response Pattern</span>
              </div>
              <p className="text-sm text-yellow-700">
                29% of companies respond within 1-2 weeks. Follow up on applications that haven't 
                responded after 2 weeks to improve your visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;