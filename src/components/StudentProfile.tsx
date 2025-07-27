
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, MapPin, Calendar, Edit, Trash2, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentProfile = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [students] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Oak Street, Springfield, IL 62701',
      dateOfBirth: '1998-03-15',
      studentId: 'STU001',
      major: 'Computer Science',
      year: 'Junior',
      gpa: '3.85',
      status: 'Active',
      enrolledCourses: 5,
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      address: '456 Pine Avenue, Springfield, IL 62702',
      dateOfBirth: '1999-07-22',
      studentId: 'STU002',
      major: 'Business Administration',
      year: 'Senior',
      gpa: '3.67',
      status: 'Active',
      enrolledCourses: 4,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      address: '789 Maple Drive, Springfield, IL 62703',
      dateOfBirth: '2000-11-08',
      studentId: 'STU003',
      major: 'Psychology',
      year: 'Sophomore',
      gpa: '3.92',
      status: 'Active',
      enrolledCourses: 6,
      avatar: 'ER'
    }
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    toast({
      title: "Student Added",
      description: "New student profile has been created successfully.",
    });
    setShowAddForm(false);
  };

  const handleUpdateStudent = () => {
    toast({
      title: "Profile Updated",
      description: "Student information has been updated successfully.",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Graduated': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Manage student profiles and information</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <Card className="lg:col-span-1 border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Students ({filteredStudents.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${
                    selectedStudent?.id === student.id ? 'bg-blue-50 border-r-4 border-r-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.studentId}</p>
                      <Badge className={`text-xs mt-1 ${getStatusColor(student.status)}`}>
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Details */}
        <Card className="lg:col-span-2 border-0 shadow-md bg-white/80 backdrop-blur-sm">
          {selectedStudent ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedStudent.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedStudent.name}</CardTitle>
                      <CardDescription>{selectedStudent.studentId} • {selectedStudent.major}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input value={selectedStudent.name} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input value={selectedStudent.dateOfBirth} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Student ID</Label>
                        <Input value={selectedStudent.studentId} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Input value={selectedStudent.status} readOnly />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="academic" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Major</Label>
                        <Input value={selectedStudent.major} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Academic Year</Label>
                        <Input value={selectedStudent.year} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>GPA</Label>
                        <Input value={selectedStudent.gpa} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Enrolled Courses</Label>
                        <Input value={selectedStudent.enrolledCourses} readOnly />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="contact" className="mt-6 space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <Label className="text-sm text-gray-600">Email</Label>
                          <p className="text-sm font-medium">{selectedStudent.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <Label className="text-sm text-gray-600">Phone</Label>
                          <p className="text-sm font-medium">{selectedStudent.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <Label className="text-sm text-gray-600">Address</Label>
                          <p className="text-sm font-medium">{selectedStudent.address}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Student Selected</h3>
                <p className="text-gray-600">Select a student from the list to view their profile</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Add Student Form (Modal would be better, but using card for simplicity) */}
      {showAddForm && (
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
            <CardDescription>Enter student information to create a new profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Major</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select major" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ba">Business Administration</SelectItem>
                    <SelectItem value="psych">Psychology</SelectItem>
                    <SelectItem value="eng">English</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Academic Year</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Add Student
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentProfile;
