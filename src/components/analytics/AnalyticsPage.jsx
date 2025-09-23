"use client";
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Target, Calendar, Building, Users, 
  Award, Clock, CheckCircle, XCircle, AlertCircle, Eye,
  Filter, Download, RefreshCw, ArrowUp, ArrowDown, Briefcase
} from 'lucide-react';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [filterType, setFilterType] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/all`);
        setJobs(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Process job data for analytics
  const processJobData = () => {
    if (jobs.length === 0) return {
      overallStats: {},
      monthlyData: [],
      applicationStatusData: [],
      positionTypeAnalysis: [],
      responseTimeData: [],
      weeklyTrendData: [],
      topPerformingCompanies: []
    };

    // Calculate overall statistics
    const totalApplications = jobs.length;
    const accepted = jobs.filter(job => job.status === 'Offer').length;
    const rejected = jobs.filter(job => job.status === 'Rejected').length;
    const pending = jobs.filter(job => job.status === 'Applied').length;
    const interviews = jobs.filter(job => job.status === 'Interview').length;
    const offers = jobs.filter(job => job.status === 'Offer').length;
    
    const successRate = totalApplications > 0 ? (accepted / totalApplications) * 100 : 0;
    const interviewRate = totalApplications > 0 ? (interviews / totalApplications) * 100 : 0;
    const offerRate = totalApplications > 0 ? (offers / totalApplications) * 100 : 0;
    
    // Calculate average response time (days from application to last update)
    const responseTimes = jobs.map(job => {
      const appDate = new Date(job.applicationDate);
      const updateDate = new Date(job.updatedAt);
      return Math.ceil((updateDate - appDate) / (1000 * 60 * 60 * 24));
    });
    const avgResponseTime = responseTimes.length > 0 
      ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) 
      : 0;

    // Group by month
    const monthlyMap = {};
    jobs.forEach(job => {
      const date = new Date(job.applicationDate);
      const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = {
          month: monthKey,
          applications: 0,
          interviews: 0,
          offers: 0,
          rejected: 0,
          pending: 0
        };
      }
      
      monthlyMap[monthKey].applications += 1;
      
      if (job.status === 'Interview') monthlyMap[monthKey].interviews += 1;
      if (job.status === 'Offer') monthlyMap[monthKey].offers += 1;
      if (job.status === 'Rejected') monthlyMap[monthKey].rejected += 1;
      if (job.status === 'Applied') monthlyMap[monthKey].pending += 1;
    });
    
    const monthlyData = Object.values(monthlyMap).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA - dateB;
    });

    // Application status distribution
    const applicationStatusData = [
      { name: 'Accepted', value: accepted, color: '#10B981' },
      { name: 'Rejected', value: rejected, color: '#EF4444' },
      { name: 'Pending', value: pending, color: '#F59E0B' },
      { name: 'Interviews', value: interviews, color: '#3B82F6' }
    ];

    // Group by position type
    const positionMap = {};
    jobs.forEach(job => {
      const position = job.position || 'Unknown';
      if (!positionMap[position]) {
        positionMap[position] = {
          position,
          applications: 0,
          interviews: 0,
          offers: 0
        };
      }
      
      positionMap[position].applications += 1;
      if (job.status === 'Interview') positionMap[position].interviews += 1;
      if (job.status === 'Offer') positionMap[position].offers += 1;
    });
    
    const positionTypeAnalysis = Object.values(positionMap).map(item => ({
      ...item,
      successRate: item.applications > 0 ? (item.offers / item.applications) * 100 : 0
    })).sort((a, b) => b.applications - a.applications).slice(0, 5);

    // Response time distribution
    const responseTimeMap = {
      '1-3 days': 0,
      '4-7 days': 0,
      '1-2 weeks': 0,
      '2-4 weeks': 0,
      '1+ months': 0
    };
    
    responseTimes.forEach(days => {
      if (days <= 3) responseTimeMap['1-3 days'] += 1;
      else if (days <= 7) responseTimeMap['4-7 days'] += 1;
      else if (days <= 14) responseTimeMap['1-2 weeks'] += 1;
      else if (days <= 30) responseTimeMap['2-4 weeks'] += 1;
      else responseTimeMap['1+ months'] += 1;
    });
    
    const responseTimeData = Object.entries(responseTimeMap).map(([timeRange, count]) => ({
      timeRange,
      count,
      percentage: totalApplications > 0 ? (count / totalApplications) * 100 : 0
    }));

    // Group by week
    const weeklyMap = {};
    jobs.forEach(job => {
      const date = new Date(job.applicationDate);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = `Week ${Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000))}`;
      
      if (!weeklyMap[weekKey]) {
        weeklyMap[weekKey] = {
          week: weekKey,
          applications: 0,
          interviews: 0,
          offers: 0
        };
      }
      
      weeklyMap[weekKey].applications += 1;
      if (job.status === 'Interview') weeklyMap[weekKey].interviews += 1;
      if (job.status === 'Offer') weeklyMap[weekKey].offers += 1;
    });
    
    const weeklyTrendData = Object.values(weeklyMap).sort((a, b) => {
      const weekA = parseInt(a.week.replace('Week ', ''));
      const weekB = parseInt(b.week.replace('Week ', ''));
      return weekA - weekB;
    }).slice(-4); // Get last 4 weeks

    // Top performing companies
    const companyMap = {};
    jobs.forEach(job => {
      const company = job.company;
      if (!companyMap[company]) {
        companyMap[company] = {
          company,
          applications: 0,
          interviews: 0,
          offers: 0
        };
      }
      
      companyMap[company].applications += 1;
      if (job.status === 'Interview') companyMap[company].interviews += 1;
      if (job.status === 'Offer') companyMap[company].offers += 1;
    });
    
    const topPerformingCompanies = Object.values(companyMap)
      .map(company => ({
        ...company,
        rate: company.applications > 0 ? (company.interviews / company.applications) * 100 : 0
      }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 5);

    return {
      overallStats: {
        totalApplications,
        accepted,
        rejected,
        pending,
        interviews,
        offers,
        successRate,
        interviewRate,
        offerRate,
        avgResponseTime,
        improvement: {
          successRate: 2.1,
          interviewRate: -1.2,
          applications: 15
        }
      },
      monthlyData,
      applicationStatusData,
      positionTypeAnalysis,
      responseTimeData,
      weeklyTrendData,
      topPerformingCompanies
    };
  };

  const {
    overallStats,
    monthlyData,
    applicationStatusData,
    positionTypeAnalysis,
    responseTimeData,
    weeklyTrendData,
    topPerformingCompanies
  } = processJobData();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            trendValue={overallStats.improvement?.applications}
            color="blue"
          />
          <StatCard
            title="Success Rate"
            value={formatPercentage(overallStats.successRate)}
            icon={Target}
            trend="up"
            trendValue={overallStats.improvement?.successRate}
            color="green"
          />
          <StatCard
            title="Interview Rate"
            value={formatPercentage(overallStats.interviewRate)}
            icon={Users}
            trend="down"
            trendValue={overallStats.improvement?.interviewRate}
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
                <p className="text-sm text-gray-600">Offers</p>
                <p className="text-lg font-semibold text-gray-900">{overallStats.offers}</p>
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

          {/* Weekly Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Application Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Applications"
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="interviews" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Interviews"
                />
                <Line 
                  type="monotone" 
                  dataKey="offers" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Offers"
                />
              </LineChart>
            </ResponsiveContainer>
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Strong Performance</span>
              </div>
              <p className="text-sm text-green-700">
                {positionTypeAnalysis.length > 0 && positionTypeAnalysis[0].successRate > 10 ? (
                  `Your success rate with ${positionTypeAnalysis[0].position} positions (${formatPercentage(positionTypeAnalysis[0].successRate)}) is significantly higher than other positions. Consider focusing more on these roles.`
                ) : (
                  "Your application strategy is showing positive results. Continue with your current approach while optimizing for higher response rates."
                )}
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Optimization Opportunity</span>
              </div>
              <p className="text-sm text-blue-700">
                {overallStats.interviewRate > 10 ? (
                  `Your interview rate is ${formatPercentage(overallStats.interviewRate)}. Focus on improving interview skills to convert more interviews to offers.`
                ) : (
                  "Consider refining your application materials to increase your interview rate. Tailoring your resume to each job posting can significantly improve results."
                )}
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Response Pattern</span>
              </div>
              <p className="text-sm text-yellow-700">
                {responseTimeData.length > 0 && responseTimeData[1].percentage > 20 ? (
                  `${responseTimeData[1].percentage}% of companies respond within 4-7 days. Follow up on applications that haven't responded after 2 weeks to improve your visibility.`
                ) : (
                  "The average response time is " + overallStats.avgResponseTime + " days. Consider following up on applications after 2 weeks if you haven't heard back."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;