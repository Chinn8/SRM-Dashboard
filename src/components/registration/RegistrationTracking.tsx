import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, AlertCircle, XCircle, Search, Filter, Calendar, User } from 'lucide-react';

const RegistrationTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [registrations] = useState([
    {
      id: 1,
      studentName: 'Sarah Johnson',
      studentId: 'STU001',
      courseName: 'CS101 - Introduction to Computer Science',
      registrationDate: '2024-08-15',
      status: 'Completed',
      priority: 'Normal',
      semester: 'Fall 2024',
      paymentStatus: 'Paid',
      documents: ['Transcript', 'ID Copy']
    },
    {
      id: 2,
      studentName: 'Michael Chen',
      studentId: 'STU002',
      courseName: 'BUS201 - Business Management',
      registrationDate: '2024-08-16',
      status: 'Pending',
      priority: 'High',
      semester: 'Fall 2024',
      paymentStatus: 'Pending',
      documents: ['Transcript']
    },
    {
      id: 3,
      studentName: 'Emily Rodriguez',
      studentId: 'STU003',
      courseName: 'PSY301 - Developmental Psychology',
      registrationDate: '2024-08-17',
      status: 'In Review',
      priority: 'Normal',
      semester: 'Fall 2024',
      paymentStatus: 'Paid',
      documents: ['Transcript', 'ID Copy', 'Recommendation']
    },
    {
      id: 4,
      studentName: 'James Wilson',
      studentId: 'STU004',
      courseName: 'MATH205 - Calculus II',
      registrationDate: '2024-08-18',
      status: 'Rejected',
      priority: 'Low',
      semester: 'Fall 2024',
      paymentStatus: 'N/A',
      documents: ['Transcript']
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'In Review': return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    total: registrations.length,
    completed: registrations.filter(r => r.status === 'Completed').length,
    pending: registrations.filter(r => r.status === 'Pending').length,
    inReview: registrations.filter(r => r.status === 'In Review').length,
    rejected: registrations.filter(r => r.status === 'Rejected').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registration Tracking</h2>
          <p className="text-gray-600">Monitor and manage student registration status</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
              <User className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Review</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.inReview}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search registrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Registration List */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Registration Records ({filteredRegistrations.length})</CardTitle>
          <CardDescription>Track and manage student registration applications</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr className="text-left">
                  <th className="p-4 font-medium text-gray-600">Student</th>
                  <th className="p-4 font-medium text-gray-600">Course</th>
                  <th className="p-4 font-medium text-gray-600">Date</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Priority</th>
                  <th className="p-4 font-medium text-gray-600">Payment</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{registration.studentName}</p>
                        <p className="text-sm text-gray-600">{registration.studentId}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-gray-900">{registration.courseName}</p>
                      <p className="text-xs text-gray-600">{registration.semester}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{registration.registrationDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(registration.status)}
                        <Badge className={getStatusColor(registration.status)}>
                          {registration.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getPriorityColor(registration.priority)}>
                        {registration.priority}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={registration.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {registration.paymentStatus}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationTracking;
