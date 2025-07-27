
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Users, Clock, Calendar, Plus, Search, Filter, MapPin, User } from 'lucide-react';

const CourseEnrollment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);

  const [courses] = useState([
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Computer Science',
      department: 'Computer Science',
      credits: 3,
      instructor: 'Dr. Sarah Mitchell',
      schedule: 'MWF 9:00-10:00 AM',
      location: 'Tech Building 101',
      enrolledStudents: 28,
      maxCapacity: 30,
      status: 'Open',
      semester: 'Fall 2024',
      description: 'Fundamental concepts of computer science including programming basics, algorithms, and data structures.'
    },
    {
      id: 2,
      code: 'BUS201',
      name: 'Business Management Principles',
      department: 'Business',
      credits: 4,
      instructor: 'Prof. Michael Johnson',
      schedule: 'TTh 2:00-4:00 PM',
      location: 'Business Hall 205',
      enrolledStudents: 25,
      maxCapacity: 25,
      status: 'Full',
      semester: 'Fall 2024',
      description: 'Introduction to fundamental management principles, organizational behavior, and business strategy.'
    },
    {
      id: 3,
      code: 'PSY301',
      name: 'Developmental Psychology',
      department: 'Psychology',
      credits: 3,
      instructor: 'Dr. Emily Chen',
      schedule: 'MW 11:00-12:30 PM',
      location: 'Psychology Building 302',
      enrolledStudents: 22,
      maxCapacity: 35,
      status: 'Open',
      semester: 'Fall 2024',
      description: 'Study of human development across the lifespan, from infancy through old age.'
    },
    {
      id: 4,
      code: 'MATH205',
      name: 'Calculus II',
      department: 'Mathematics',
      credits: 4,
      instructor: 'Dr. Robert Davis',
      schedule: 'MWF 10:00-11:00 AM, T 3:00-4:00 PM',
      location: 'Math Building 150',
      enrolledStudents: 18,
      maxCapacity: 30,
      status: 'Open',
      semester: 'Fall 2024',
      description: 'Continuation of Calculus I covering integration techniques, applications, and series.'
    },
    {
      id: 5,
      code: 'ENG102',
      name: 'English Composition',
      department: 'English',
      credits: 3,
      instructor: 'Prof. Lisa Anderson',
      schedule: 'TTh 9:30-11:00 AM',
      location: 'Liberal Arts 210',
      enrolledStudents: 20,
      maxCapacity: 25,
      status: 'Open',
      semester: 'Fall 2024',
      description: 'Advanced writing skills, research methods, and critical analysis of texts.'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Full': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Waitlist': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityColor = (enrolled: number, max: number) => {
    const percentage = (enrolled / max) * 100;
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(courses.map(course => course.department))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Enrollment</h2>
          <p className="text-gray-600">Manage course offerings and student enrollments</p>
        </div>
        <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Enroll Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Enroll Student in Course</DialogTitle>
              <DialogDescription>
                Select a student and course for enrollment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">
                  Student
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emily">Emily Rodriguez</SelectItem>
                    <SelectItem value="james">James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">
                  Course
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.code}>
                        {course.code} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" className="col-span-3" placeholder="Optional enrollment notes..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Enroll Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
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
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Courses</p>
                <p className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === 'Open').length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Full Courses</p>
                <p className="text-2xl font-bold text-red-600">{courses.filter(c => c.status === 'Full').length}</p>
              </div>
              <Users className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrolled</p>
                <p className="text-2xl font-bold text-purple-600">{courses.reduce((sum, c) => sum + c.enrolledStudents, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{course.code} - {course.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-1">
                    {course.department} • {course.credits} Credits
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(course.status)}>
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{course.schedule}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{course.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{course.semester}</span>
              </div>
              
              {/* Enrollment Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enrollment</span>
                  <span className={getCapacityColor(course.enrolledStudents, course.maxCapacity)}>
                    {course.enrolledStudents}/{course.maxCapacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(course.enrolledStudents / course.maxCapacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={course.status === 'Full'}
                >
                  Enroll Student
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseEnrollment;
