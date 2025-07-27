
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Users, Calendar, Clock, Search, Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseEnrollment = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState('all');

  const [courses] = useState([
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Computer Science',
      department: 'Computer Science',
      instructor: 'Dr. Sarah Wilson',
      credits: 3,
      capacity: 30,
      enrolled: 28,
      schedule: 'MWF 9:00-10:00 AM',
      semester: 'Fall 2024',
      description: 'Fundamental concepts of computer science including programming basics and problem-solving techniques.',
      prerequisites: 'None',
      status: 'Open'
    },
    {
      id: 2,
      code: 'BUS201',
      name: 'Business Management Principles',
      department: 'Business',
      instructor: 'Prof. Michael Chen',
      credits: 4,
      capacity: 25,
      enrolled: 25,
      schedule: 'TTh 2:00-3:30 PM',
      semester: 'Fall 2024',
      description: 'Core principles of business management, leadership, and organizational behavior.',
      prerequisites: 'BUS101',
      status: 'Full'
    },
    {
      id: 3,
      code: 'PSY301',
      name: 'Developmental Psychology',
      department: 'Psychology',
      instructor: 'Dr. Emily Rodriguez',
      credits: 3,
      capacity: 20,
      enrolled: 15,
      schedule: 'MW 11:00-12:30 PM',
      semester: 'Fall 2024',
      description: 'Study of human development across the lifespan, from infancy to old age.',
      prerequisites: 'PSY101, PSY201',
      status: 'Open'
    },
    {
      id: 4,
      code: 'MATH205',
      name: 'Calculus II',
      department: 'Mathematics',
      instructor: 'Dr. James Parker',
      credits: 4,
      capacity: 35,
      enrolled: 32,
      schedule: 'MTWF 10:00-11:00 AM',
      semester: 'Fall 2024',
      description: 'Advanced calculus topics including integration techniques and series.',
      prerequisites: 'MATH204',
      status: 'Open'
    }
  ]);

  const [enrolledStudents] = useState([
    { id: 1, name: 'Sarah Johnson', studentId: 'STU001', enrollmentDate: '2024-08-15' },
    { id: 2, name: 'Michael Chen', studentId: 'STU002', enrollmentDate: '2024-08-16' },
    { id: 3, name: 'Emily Rodriguez', studentId: 'STU003', enrollmentDate: '2024-08-17' }
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Full': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleEnrollStudent = () => {
    toast({
      title: "Student Enrolled",
      description: "Student has been successfully enrolled in the course.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Enrollment</h2>
          <p className="text-gray-600">Manage course offerings and student enrollments</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Psychology">Psychology</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Available Courses ({filteredCourses.length})</h3>
          {filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-0 shadow-md bg-white/80 backdrop-blur-sm ${
                selectedCourse?.id === course.id ? 'ring-2 ring-blue-600 shadow-lg' : ''
              }`}
              onClick={() => setSelectedCourse(course)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>{course.code}</span>
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-gray-900 mt-1">
                      {course.name}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {course.credits} Credits
                    </span>
                    <span className="text-xs font-medium">
                      {course.enrolled}/{course.capacity} Enrolled
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Details */}
        <div className="space-y-4">
          {selectedCourse ? (
            <>
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{selectedCourse.code} - {selectedCourse.name}</CardTitle>
                      <CardDescription className="text-base mt-1">{selectedCourse.department}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(selectedCourse.status)} text-sm px-3 py-1`}>
                      {selectedCourse.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Instructor:</span>
                      <p>{selectedCourse.instructor}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Credits:</span>
                      <p>{selectedCourse.credits}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Schedule:</span>
                      <p>{selectedCourse.schedule}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Capacity:</span>
                      <p>{selectedCourse.enrolled}/{selectedCourse.capacity}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-600">Description:</span>
                    <p className="text-sm mt-1">{selectedCourse.description}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-600">Prerequisites:</span>
                    <p className="text-sm mt-1">{selectedCourse.prerequisites}</p>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button 
                      onClick={handleEnrollStudent}
                      disabled={selectedCourse.status === 'Full'}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Enroll Student
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enrolled Students */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Enrolled Students ({enrolledStudents.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-y-auto">
                    {enrolledStudents.map((student) => (
                      <div key={student.id} className="p-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.studentId}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Enrolled</p>
                            <p className="text-xs text-gray-500">{student.enrollmentDate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Course Selected</h3>
                  <p className="text-gray-600">Select a course to view details and manage enrollments</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;
