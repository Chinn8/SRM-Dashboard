import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, BarChart3, Settings, UserCheck, GraduationCap, TrendingUp, Award } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

// Import the existing components
import StudentProfile from "@/components/student-management/StudentProfile";
import CourseEnrollment from "@/components/course-management/CourseEnrollment";
import RegistrationTracking from "@/components/registration/RegistrationTracking";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import AffiliatesManagement from "@/components/affiliates/AffiliatesManagement";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: BarChart3, color: 'bg-blue-500' },
    { id: 'students', label: 'Student Management', icon: Users, color: 'bg-green-500' },
    { id: 'courses', label: 'Course Enrollment', icon: BookOpen, color: 'bg-purple-500' },
    { id: 'registration', label: 'Registration Tracking', icon: UserCheck, color: 'bg-orange-500' },
    { id: 'analytics', label: 'Analytics Dashboard', icon: TrendingUp, color: 'bg-red-500' },
    { id: 'affiliates', label: 'Affiliates Management', icon: Award, color: 'bg-indigo-500' },
  ];

  const stats = [
    { title: "Total Students", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Active Courses", value: "45", change: "+3", icon: BookOpen, color: "text-green-600" },
    { title: "Pending Registrations", value: "127", change: "-8%", icon: UserCheck, color: "text-orange-600" },
    { title: "Completion Rate", value: "89.2%", change: "+2.1%", icon: GraduationCap, color: "text-purple-600" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'students':
        return <StudentProfile />;
      case 'courses':
        return <CourseEnrollment />;
      case 'registration':
        return <RegistrationTracking />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'affiliates':
        return <AffiliatesManagement />;
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center bg-gradient-to-r from-primary to-accent text-white p-8 rounded-2xl">
              <h1 className="text-4xl font-bold mb-4">Student Registration Dashboard</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Comprehensive web application for educational institutions to manage student registrations, 
                course enrollments, and academic data efficiently.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors cursor-pointer" 
                    onClick={() => setActiveSection('students')}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Users className="h-5 w-5" />
                    Student Profiles
                  </CardTitle>
                  <CardDescription>
                    Manage student information, contact details, and academic records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      2,847 Active
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      View All →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-300 transition-colors cursor-pointer"
                    onClick={() => setActiveSection('courses')}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <BookOpen className="h-5 w-5" />
                    Course Enrollment
                  </CardTitle>
                  <CardDescription>
                    Handle course registrations, capacity management, and scheduling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      45 Courses
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-green-600">
                      Manage →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors cursor-pointer"
                    onClick={() => setActiveSection('registration')}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <UserCheck className="h-5 w-5" />
                    Registration Tracking
                  </CardTitle>
                  <CardDescription>
                    Monitor registration status, approvals, and pending applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      127 Pending
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-purple-600">
                      Review →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-100 hover:border-red-300 transition-colors cursor-pointer"
                    onClick={() => setActiveSection('analytics')}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <BarChart3 className="h-5 w-5" />
                    Analytics Dashboard
                  </CardTitle>
                  <CardDescription>
                    View reports, trends, and data-driven insights for decision making
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      89.2% Rate
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      Analyze →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-colors cursor-pointer"
                    onClick={() => setActiveSection('affiliates')}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-indigo-700">
                    <Award className="h-5 w-5" />
                    Affiliates Management
                  </CardTitle>
                  <CardDescription>
                    Manage affiliate statistics, documents, and benefits content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                      450 Affiliates
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-indigo-600">
                      Manage →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 hover:border-gray-300 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    <Settings className="h-5 w-5" />
                    System Settings
                  </CardTitle>
                  <CardDescription>
                    Configure system preferences, user permissions, and integrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                      All Systems
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      Configure →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New student registration", user: "John Doe", time: "5 minutes ago", type: "success" },
                    { action: "Course capacity updated", user: "Admin", time: "15 minutes ago", type: "info" },
                    { action: "Registration approved", user: "Jane Smith", time: "1 hour ago", type: "success" },
                    { action: "System backup completed", user: "System", time: "2 hours ago", type: "info" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">by {activity.user}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-900 shadow-lg min-h-screen border-r dark:border-gray-700">
          <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">SRM Dashboard</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Student Registration Management</p>
            </div>
            <ThemeToggle />
          </div>
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeSection === item.id ? 'bg-white/20' : item.color}`}>
                    <item.icon className={`h-4 w-4 ${activeSection === item.id ? 'text-white' : 'text-white'}`} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
